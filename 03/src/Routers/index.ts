import express from 'express';

import AuthenticationRouter from './AuthenticationRouter';
import UserRouter from './UserRouter';

const router = express.Router();

export default (): express.Router => {
    AuthenticationRouter(router)
    UserRouter(router)
    return router
}

