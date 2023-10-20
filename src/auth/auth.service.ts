import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(dto) {
    const user = await this.usersService.findUserOne(dto.login);
    if (user?.password !== dto.pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
