import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create_user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update_user.dto';
import type { AuthenticatedRequest } from 'src/shared/interface/authenticated-request.interface';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiResponse({
    status: 201,
    description: 'Utilisateur créé avec succès',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Requête invalide' })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  @ApiResponse({
    status: 200,
    description: 'Liste de tous les utilisateurs',
    type: User,
    isArray: true,
  })
  @ApiResponse({ status: 404, description: 'Aucun utilisateur trouvé' })
  async getAllUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: "Récupérer l'utilisateur connecté" })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur connecté',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async getMe(@Request() req: AuthenticatedRequest): Promise<User> {
    const user =  await this.userService.findById(req.user.sub);
    if (!user) throw new NotFoundException('Utilisateur non trouvé');
    return user as unknown as User;
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Récupérer un utilisateur par son ID' })
  @ApiParam({ name: 'id', description: "ID de l'utilisateur" })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur trouvé',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async getUserById(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findById(id);
    if (!user) throw new NotFoundException('Utilisateur non trouvé');
    return user as unknown as User;
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur par son ID' })
  @ApiParam({ name: 'id', description: "ID de l'utilisateur" })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur mis à jour avec succès',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  @ApiBody({ type: UpdateUserDto })
  async update(
    @Param('id')
    id: string,
    @Body()
    user: UpdateUserDto,
  ): Promise<User> {
    const updated = await this.userService.update(id, user);
    if (!updated) throw new NotFoundException('Utilisateur non trouvé');
    return updated as unknown as User;
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Supprimer un utilisateur par son ID' })
  @ApiParam({ name: 'id', description: "ID de l'utilisateur" })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur supprimé avec succès',
  })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async remove(
    @Param('id')
    id: string,
  ): Promise<User> {
    const deleted = await this.userService.delete(id);
    if (!deleted) throw new NotFoundException('Utilisateur non trouvé');
    return deleted as unknown as User;
  }
}