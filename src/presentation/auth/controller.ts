import { Request, Response, } from "express";
import { AuthRepositoryImpl } from "../../infrestructure/repositories/auth.repositoryImpl";
import { RegisterUserDto } from "../../domain/dtos";
import { Login, RegisterUser, VerifyUser } from "../../domain/use-cases";

export class AuthController {
    // DI
    constructor(
        private repository: AuthRepositoryImpl
    ) { }

    register = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.register(req.body)
        if (error) return res.status(500).json({ error })

        new RegisterUser(this.repository)
            .execute(registerUserDto!)
            .then((user) => res.status(200).json({ message: "User registered successfully", user: user }))
            .catch((error) => res.status(500).json({ error }))
    }

    verifyUser = (req: Request, res: Response) => {
        const { token } = req.params

        new VerifyUser(this.repository)
            .execute(token)
            .then((user) => res.status(200).json({ message: "User verified successfully", user: user }))
            .catch((error) => res.status(500).json({ error }))
    }

    login = (req: Request, res: Response) => {
        const { email, password } = req.body
        if (!email) return res.status(400).json({ error: "Email is required" })
        if (!password) return res.status(400).json({ error: "Password is required" })

        new Login(this.repository)
            .execute(email, password)
            .then(response => res.status(400).json(response))
            .catch(error => res.status(500).json({ error }))
    }

    auth = (req: Request, res: Response) => {
        const { user } = req.body
        return res.status(200).json({ user })
    }
}