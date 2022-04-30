import { Router } from 'express';
const routes = Router();;
import { authValidation } from './auth.validation';
import { login, register } from './auth.service';

routes.post('/login', login);
routes.post('/register', authValidation, register);

export default routes;