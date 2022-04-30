import { Router } from 'express';
const routes = Router();
import paypal from './paypal.service';

routes.post('/checkout', paypal.checkout);
routes.get('/sucess', paypal.sucess);
routes.get('/cancel', paypal.cancel);


export default routes;