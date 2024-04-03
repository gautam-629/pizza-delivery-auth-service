import { NextFunction, Response } from "express";
import { UserService } from "../services/UserService"
import { RegisterUserRequest } from "../types";
import { Roles } from "../constants";

export class AuthController {
    constructor(private userService: UserService) { }
    async register(req: RegisterUserRequest, res: Response, next: NextFunction) {
        try {
            // Extract user data from request body
            const { firstName, lastName, email, password } = req.body;
            // Create a new user
            const user = await this.userService.create({
                firstName,
                lastName,
                email,
                password,
                role: Roles.CUSTOMER
            }

            );
            // Return success response
            return res.status(201).json({ id: user.id })
        } catch (error) {
            next(error)
        }
    }
}