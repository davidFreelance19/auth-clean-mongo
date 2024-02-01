import { AuthDataSource } from "../../domain/datasources";
import { RegisterUserDto } from "../../domain/dtos";
import { MailContent, UserEntity } from "../../domain/entities";
import { AuthRepository } from "../../domain/repositories";

export class AuthRepositoryImpl implements AuthRepository {
    constructor(
        private datasource: AuthDataSource
    ) { }

    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.datasource.register(registerUserDto)
    }

    verifyUser(token: string): Promise<UserEntity> {
        return this.datasource.verifyUser(token)
    }

    login(email: string, password: string): Promise<{ user: UserEntity; token: string; }> {
        return this.datasource.login(email, password)
    }

    sendEmail(content: MailContent): Promise<void> {
        return this.datasource.sendEmail(content)
    }
}