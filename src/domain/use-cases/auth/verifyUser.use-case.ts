import { UserEntity } from "../../entities";
import { AuthRepository } from "../../repositories";

interface VerifyUserUseCase {
    execute(token: string): Promise<UserEntity>
}

export class VerifyUser implements VerifyUserUseCase {
    constructor(
        private repository: AuthRepository
    ) { }
    execute(token: string): Promise<UserEntity> {
        return this.repository.verifyUser(token)
    }
}