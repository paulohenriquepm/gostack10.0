import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.get('/recipients', RecipientController.index);

routes.post('/users', UserController.store);
routes.post('/recipients', RecipientController.store);

routes.put('/users', UserController.update);
routes.put('/recipients', RecipientController.update);

export default routes;
