import { Router } from 'express';
const routes = Router();
import orders from './orders.controller';

routes.post('/', orders.create);
routes.get('/:id', orders.show);
routes.put('/:id', orders.update);
routes.delete('/:id', orders.destroy);

export default routes;