import express, { NextFunction, RequestHandler, Response ,Request} from 'express'
import { AuthController } from '../controller/AuthController';
import { UserService } from '../services/UserService';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';
const router = express.Router();

const userRepository= AppDataSource.getRepository(User)
const userService = new UserService(userRepository);
const authController = new AuthController(userService)

router.post("/register", (async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    await authController.register(req, res, next);
}) as RequestHandler);

export default router;
