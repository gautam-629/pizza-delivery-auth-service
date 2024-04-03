import { Repository } from "typeorm";
import { IUserData } from "../types";
import { User } from "../entity/User";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs"

export class UserService {
    constructor(private userRepository: Repository<User>) { }
    async create({ firstName, lastName, email, password, role }: IUserData) {
        try {
            //check if the user with the given email already exists
            const user = await this.userRepository.findOne({ where: { email: email } })
            if (user) {
                const err = createHttpError(400, "Email is ready exists!");
                throw err;
            }
            //hash the password using bcrypt.js
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            //create a new user record and save it to the database
            const newUser = this.userRepository.save({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role
            })
            return newUser;
        } catch (error) {
            throw createHttpError(500, "Fail to store in the database")
        }

    }
}