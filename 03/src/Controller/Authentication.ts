import express from 'express';
import { getUserEmail, createUser } from './UserController';
import { random, authentification } from '../Helpers/index';



export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Bad Request' });
        }
        const existingUser = await getUserEmail(email).select('+authentification.password +authentification.salt');
        if (!(existingUser.length > 0)) {
            return res.status(403).json({ message: "you don't account" })
        }

        const pass = authentification(existingUser[0].authentification.salt, password);
        if (pass !== existingUser[0].authentification.password) {
            return res.status(403).json({ message: "you passwor don't correct" })
        }

        const salt = random();
        existingUser[0].authentification.sessionToken = authentification(salt, existingUser[0]._id.toString());
        await existingUser[0].save();

        res.cookie('sessionToken', existingUser[0].authentification.sessionToken, { domain: 'localhost', path: '/' });

        return res.status(200).json(existingUser[0]).end();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


export const registre = async (req: express.Request, res: express.Response) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Bad Request' });
        }

        const existingUser = await getUserEmail(email);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const salt = random();
        const user = await createUser({ email, username, authentification: { salt, password: authentification(salt, password) } });

        return res.status(200).json(user).end();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}