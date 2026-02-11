import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service.js";
import { RegisterDto } from "./dto/register.dto.js";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dto/login.dto.js";

@Injectable()
export class AuthService{
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ){}

    async register(registerDto: RegisterDto){
        const existingUser = await this.userService.findByUsername(registerDto.username);
        if(existingUser){
            throw new BadRequestException('Email already in use');
        }

        const hashedPwd = await bcrypt.hash(registerDto.password, 10);

        const user = await this.userService.create({
            username: registerDto.username,
            password: hashedPwd,
        });

        return this.generateToken(user);
    }

    async login(loginDto: LoginDto){
        const user = await this.userService.findByUsername(loginDto.username);
        if(!user){
            throw new UnauthorizedException('Invalid Credentials');
        }

        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if(!isMatch){
            throw new UnauthorizedException('Invalid Credentials');
        }

        return this.generateToken(user);
    }

    private generateToken(user: any){
        const data = {sub: user.id, username: user.username};
        return {access_token: this.jwtService.sign(data)};
    }
}