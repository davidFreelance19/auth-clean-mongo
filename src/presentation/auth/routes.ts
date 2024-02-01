import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl } from "../../infrestructure/datasources/";
import { AuthRepositoryImpl } from "../../infrestructure/repositories";
import { AuthMiddleware } from "../middleware";

export class AuthRoutes {

    static get routes(): Router {
        const router = Router();
        const authDatasource = new AuthDatasourceImpl()
        const authRepository = new AuthRepositoryImpl(authDatasource)
        const controller = new AuthController(authRepository)

        router.get("/", [AuthMiddleware.ValidateJWT], controller.auth)
        router.post("/register", controller.register);
        router.get("/validate-account/:token", controller.verifyUser)
        router.post("/login", controller.login);
        return router;
    }
}