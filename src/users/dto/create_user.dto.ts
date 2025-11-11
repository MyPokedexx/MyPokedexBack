import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        example: 'john.doe@example.com',
        description: "L'email de l'utilisateur",
    })
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({
        example: 'John',
        description: "Le pseudo de l'utilisateur",
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    firstName: string;

    @ApiProperty({
        example: 'password123',
        description: 'Le mot de passe de lutilisateur',
        minLength: 8,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}