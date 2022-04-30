import { check } from 'express-validator';
import { validate } from '../../utils/validate';

const authValidation = [

  check('name').exists().isString().notEmpty(),
  check('username').exists().isString().notEmpty(),
  check('email').exists().isString().notEmpty().isEmail(),
  check('password').exists().isString().notEmpty(),
  (req, res, next) => {
    validate(req, res, next);
  }
]

export { authValidation };