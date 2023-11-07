import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
	@IsEmail()
	@IsNotEmpty()
	@ApiProperty()
	readonly email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	@ApiProperty()
	readonly password: string;
}
