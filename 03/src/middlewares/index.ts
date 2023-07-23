import express, { NextFunction } from 'express';
import { get, merge } from 'lodash';
import { getUserBySession } from '../Controller/UserController';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessiontToken: string = req.cookies.sessionToken;
        if (!sessiontToken) {
            return res.status(401).json({ message: 'not authorization' });
        }

        const user = await getUserBySession(sessiontToken);
        if (!(user.length > 0)) {
            return res.status(401).json({ message: 'not authorization' });
        }
        merge(req, { identity: user[0] });
        return next();

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'not authorization' });
    }
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const idCurrent = get(req, 'identity._id') as string | undefined;
        if (!idCurrent) {
            return res.status(403).json({ message: 'not authorization' });
        }
        if (id == idCurrent.toString()) {
            return res.status(403).json({ message: 'you can remove your self' });
        }
        return next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'not authorization' });
    }

}

export const isMe = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const idCurrent = get(req, 'identity._id') as string | undefined;
        if (!idCurrent) {
            return res.status(403).json({ message: 'not authorization' });
        }
        if (id !== idCurrent.toString()) {
            return res.status(403).json({ message: 'you can\'t remove your self' });
        }
        return next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'not authorization' });
    }

}