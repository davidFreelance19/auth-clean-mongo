import { RegisterUserDto } from "../dtos";
import { MailContent, UserEntity } from "../entities";

export abstract class AuthRepository{
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
    abstract verifyUser(token: string): Promise<UserEntity>;
    abstract login(email: string, password: string): Promise<{user: UserEntity, token: string}>;
    abstract sendEmail(content: MailContent): Promise<void>;
}