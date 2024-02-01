import jwt from "jsonwebtoken"
import { envs } from "./envs.adapter"

const JWT_SEED = envs.JWT_SEED

export const JwtAdapter = {
    generateToken: (payload: any, duration: string = "5m") => {
        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
                if (err) return resolve(null)
                return resolve(token)
            })
        })
    },
    validateToken: <T>(token: string): Promise<T | null> => {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SEED, (err, decoded) => {
                if (err) return resolve(null);
                resolve(decoded as T);
            })
        })
    }
}
