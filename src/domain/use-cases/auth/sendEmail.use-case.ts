import { MailContent } from "../../entities";
import { AuthRepository } from "../../repositories";

export interface SendEmailUseCase {
    execute(content: MailContent): Promise<void>;
}

export class SendEmail implements SendEmailUseCase {
    constructor(
        private repository: AuthRepository
    ) { }
    execute(content: MailContent): Promise<void> {
        return this.repository.sendEmail(content)
    }
}