import { Router } from 'express';
const routes = Router();
import token from '../../middleware/tokenAuth';
import role from '../../middleware/roleAuth';
import { usersValidate } from './users.validation';
import users from './users.controller';

routes.get('/', token, role(['ADMIN']), users.showAll);
routes.post('/', token, role(['ADMIN']), usersValidate, users.create);
routes.get('/:email', token, role(['ADMIN']), users.show);
routes.put('/:email', token, role(['ADMIN']), usersValidate, users.update);
routes.delete('/:email', token, role(['ADMIN']), users.destroy);

export default routes;