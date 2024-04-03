import { Request } from "express";
export interface IUserData{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    role:string;
    tenandId?:string;
}

export interface RegisterUserRequest extends Request{
    body:IUserData
}
