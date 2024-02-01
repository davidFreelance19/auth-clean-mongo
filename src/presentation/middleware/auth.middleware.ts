import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../adapters/jwt.adapter";
import { UserEntity } from "../../domain/entities";
import { UserModel } from "../../data/mongo/models";

export class AuthMiddleware {
    static async ValidateJWT(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header("Authorization");
        if (!authorization) return res.status(401).json({ message: "Invalid Token" });
        if (!authorization.startsWith("Bearer ")) return res.status(401).json({ message: "Invalid Token" });

        const token = authorization.split(" ").at(1) || '';
        
        try {
            const payload = await JwtAdapter.validateToken<{ email: string }>(token)
            if (!payload) return res.status(401).json({ message: "Invalid Token" });

            const user = await UserModel.findOne({ email: payload.email })
            if (!user) return res.status(500).json({ message: "Internal Server Error" })

            req.body.user = UserEntity.fromObject(user);
            next();
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" })
        }
    }
}