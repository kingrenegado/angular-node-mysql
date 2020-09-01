import {getRepository} from "typeorm";
import {Request, Response} from "express";
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
    const {id} =req.params;
    const userRepository = getRepository(User);
    try{
        const user = await userRepository.findOneOrFail(id);
        res.send(user);
    }catch(e){
        res.status(404).json({message: 'Not result'});
    }
};

static newUser = async (req: Request,res:Response)=> {
    const {username,password,role} = req.body;

    const user =new User();
    user.username =username;
    user.password = password;
    user.role = role;

    //Validates
    const errors = await validate(user);
    if(errors.length > 0){
        return res.status(400).json(errors);
    }

    //todo hash password

    const userRepository = getRepository(User);
    try{
        await userRepository.save(user);
    }catch(e){
        return res.status(400).json({message: 'Username already exist'});
    }
    //all ok
    res.send('User create');
};

static editUser = async (req: Request,res:Response) => {
    let user;
    const {id} = req.params;
    const {username,role} = req.body;

    const userRepository = getRepository(User);
    //try get user

    try{
        user = await userRepository.findOneOrFail(id);
    }catch(e){
        return res.status(400).json({message: 'User not found'});
    }
    user.username = username;
    user.role = role;

    const errors = await validate(user);
    if(errors.length > 0){
        return res.status(400).json(errors);
    }

    //try to save user
    try{
        await userRepository.save(user);
    }catch(e){
        return res.status(409).json({message: 'username already in use'})
    }
    res.status(201).json({message: 'User update'});
};

static deleteUser = async (req: Request,res:Response) => {
    const {id} = req.params;
    const userRepository = getRepository(User);
    let user : User;

    try{
        user = await userRepository.findOneOrFail(id);
    }catch(e){
        return res.status(404).json({message: 'User not found'});
    }

    //Remove User

    userRepository.delete(id);
    res.status(200).json({message: 'User removed'});
}

}