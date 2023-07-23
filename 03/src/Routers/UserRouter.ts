import { Router } from 'express';
import { delateUserById, getAllUsers, updateUSerById } from '../Controller/UserController';
import { isAuthenticated, isMe, isOwner } from '../middlewares/index';

export default (router: Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/delete/:id', isAuthenticated, isOwner, delateUserById)
    router.put('/users/update/:id',isAuthenticated, isMe,updateUSerById)
}