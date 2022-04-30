import { check } from 'express-validator';
import { validate } from '../../utils/validate';

const usersValidate = [
  check('name').exists().isString().notEmpty(),
  check('username').exists().isString().notEmpty(),
  check('email').exists().isString().notEmpty().isEmail(),
  check('password').exists().isString().notEmpty(),
  check('role').exists().not().isEmpty(),

  (req, res, next) => {
    validate(req, res, next);
  }
]

export { usersValidate };