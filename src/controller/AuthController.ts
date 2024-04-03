import { NextFunction, Response } from "express";
import { UserService } from "../services/UserService"
import { RegisterUserRequest } from "../types";
import { Roles } from "../constants";

export class AuthController {
    constructor(private userService: UserService) { }
    async register(req: RegisterUserRequest, res: Response, next: NextFunction) {

        const { firstName, lastName, email, password } = req.body;
        
        try {
            const user = await this.userService.create({
                firstName,
                lastName,
                email,
                password,
                role: Roles.CUSTOMER
            }
            );

            res.status(201).json({ id: user.id })

        } catch (error) {
            next(error)
        }



    }
}