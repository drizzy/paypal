import { Router } from 'express';
const routes = Router();
import token from '../../middleware/tokenAuth';
import role from '../../middleware/roleAuth';
import { productValidate } from './products.validation';
import products from './products.controller';

routes.get('/', products.showAll);
routes.post('/', token, role(['ADMIN']), productValidate, products.create);
routes.get('/:id', products.show);
routes.put('/:id', token, role(['ADMIN']), productValidate, products.update);
routes.delete('/:id', token, role(['ADMIN']), products.destroy);

export default routes;