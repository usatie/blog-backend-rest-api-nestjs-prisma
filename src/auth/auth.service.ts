import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwt: JwtService) {}

	async login(email: string, password: string): Promise<AuthEntity> {
		const user = await this.prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			throw new NotFoundException('User not found');
		}

		if (user.password !== password) {
			throw new UnauthorizedException('Invalid password');
		}

		return { 
			accessToken: this.jwt.sign({ userId: user.id }),
		};
	}
}
