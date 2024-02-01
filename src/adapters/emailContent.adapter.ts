import { envs } from "./envs.adapter"

export const emailContent = {
    verifyUser: (email: string, token: string) => {
        return {
            from: 'test@gmail.com',
            to: `${email}`,
            subject: 'Verify your account',
            html: ` 
                <p>Verify your account in the following link: 
                    <a href="${envs.BACKEND_URL}/auth/validate-account/${token}">Verify account</a>
                </p>
                <p>If you did not create this account, you can ignore the message.</p>
            `
        }
    }
}