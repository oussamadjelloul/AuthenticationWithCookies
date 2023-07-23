import { get } from "lodash";
import { UserModel } from "../models/Users"
import express from "express";


const getUser = () => UserModel.find();
export const getUserEmail = (email: string) => UserModel.find({ email: email });
export const getUserBySession = (sessionToken: string) => UserModel.find({ 'authentification.sessionToken': sessionToken });

export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save()
    .then((user: any) => user.toObject());

export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });

export const updateUSer = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)



export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUser();
        return res.status(200).json(users).end();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const delateUserById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Bad Request' });
        }
        await deleteUserById(id);
        return res.status(200).json({ message: 'user delete' }).end();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const updateUSerById = async (req: express.Request, res: express.Response) => {
    try {
        const { username } = req.body;
        const { id } = req.params;
        console.log(username);
        if (!username&& !id) {
            return res.status(400).json({ message: 'Bad Request' });
        }
        const user = await getUserById(id);
        if (!user) {
            return res.status(400).json({ message: 'Bad Request' });
        }
        user.username = username;
        await user.save();
        return res.status(200).json(user).end();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
