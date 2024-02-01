import { UserEntity } from "../../entities";
import { AuthRepository } from "../../repositories";

interface LoginUseCase {
    execute(email: string, password: string): Promise<{ user: UserEntity, token: string }>
}

export class Login implements LoginUseCase {

    constructor(
        private repository: AuthRepository
    ) { }

    execute(email: string, password: string): Promise<{ user: UserEntity; token: string; }> {
        return this.repository.login(email, password)
    }

}