import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/users', UserController.index);
routes.get('/findUser', UserController.show);
routes.post('/createUser', UserController.store);

export default routes;
