import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/Login.dto';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    /**
     * Enregistre un nouvel utilisateur (hash du mot de passe).
     * Lance ConflictException si email déjà utilisé.
     */
    async register(registerDto: RegisterDto) {
        const { email, password, name } = registerDto;
        const existing = await this.usersService.findByEmail(email);
        if (existing) {
            throw new ConflictException('Email already in use');
        }
        const hashed = await bcrypt.hash(password, 10);
        // cast as any to avoid "name does not exist on CreateUserDto" error
        const created = await this.usersService.create({
            email,
            password: hashed,
            ...(name ? { name } : {}),
        } as any);

        // usersService.create already retourne un objet sans password
        return created;
    }

    /**
     * Valide les credentials et renvoie l'utilisateur sans mot de passe ou null.
     */
    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        console.log('User found:', user ? 'YES' : 'NO');
        if (user) {
            console.log('Password from DB:', user.password);
            console.log('Password provided:', password);
            const isMatch = await bcrypt.compare(password, user.password);
            console.log('Password match:', isMatch);

            if (isMatch) {
                const { password, ...result } = user.toObject();
                return result;
            }
        }
        return null;
    }

    /**
     * Génère un token JWT pour l'utilisateur fourni (user object or payload with id/email).
     */
    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user._id ?? user.id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
