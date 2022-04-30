import { Router } from 'express';
const routes = Router();
import paypal from './paypal.service';

routes.post('/create-payment', paypal.create);
routes.get('/capture-payment', paypal.capture);
routes.get('/cancel-payment', paypal.cancel);

export default routes;
