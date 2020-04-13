import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import OrderController from './app/controllers/OrderController';
import DeliverieController from './app/controllers/DeliverieController';
import DeliveredOrderController from './app/controllers/DeliveredOrderController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import OrderWithProblemController from './app/controllers/OrderWithProblemController';

import authMiddleware from './app/middlewares/auth';
import adminAuthMiddleware from './app/middlewares/adminAuth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.put('/users', UserController.update);

routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.get('/deliverymans/:id/deliveries', DeliverieController.index);
routes.get('/deliverymans/:id/deliveredOrders', DeliveredOrderController.index);
routes.put(
  '/deliverymans/:deliveryman_id/deliveries/:order_id',
  DeliverieController.update
);

routes.use(adminAuthMiddleware);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/deliverymans', DeliverymanController.index);
routes.get('/deliverymans/:id', DeliverymanController.show);
routes.post('/deliverymans', DeliverymanController.store);
routes.delete('/deliverymans/:id', DeliverymanController.delete);
routes.put('/deliverymans/:id', DeliverymanController.update);

routes.get('/orders', OrderController.index);
routes.get('/orders/:id', OrderController.show);
routes.get('/orders-problems', OrderWithProblemController.index);
routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.delete);

routes.get('/delivery/problems', DeliveryProblemController.index);
routes.post('/delivery/:id/problems', DeliveryProblemController.store);
routes.delete('/problem/:id/cancel-delivery', DeliveryProblemController.delete);

export default routes;
