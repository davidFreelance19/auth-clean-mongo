import { RegisterUserDto } from "../../dtos";
import { UserEntity } from "../../entities";
import { AuthRepository } from "../../repositories";

export interface RegisterUserUseCase {
    execute(registerUserDto: RegisterUserDto): Promise<UserEntity>
}

export class RegisterUser implements RegisterUserUseCase {
    constructor(
        private repository: AuthRepository
    ) { }
    execute(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.repository.register(registerUserDto)
    }
}