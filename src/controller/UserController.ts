import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import{validate} from 'class-validator';

export class UserController {
static getAll = async (req: Request,res:Response)=> {
    const userRepository = getRepository(User);
    const users = await userRepository.find();

    if(users.length > 0){
        res.send(users);
    }else{
        res.status(404).json({message: 'Not Result'});
    }
  };


static getById = async (req: Request,res:Response) => {
    
}
}