import { Router } from 'express';
import { login, registre } from '../Controller/Authentication';

export default (router: Router) => {
    router.post('/auth/registre',registre)
    router.post('/auth/login',login );
}