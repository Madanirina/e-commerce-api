import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from 'src/user/service/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser({ username });
    console.log('ty User', user);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    console.log('password', password);
    console.log('username', username);
    const passwordValid = await bcrypt.compare(password, user.password);
    console.log('passworssd', passwordValid);
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async valideUserFromJwt(username: string, id: string): Promise<any> {
    const user = await this.usersService.getUser({ username });
    console.log('ty User', user, id);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
