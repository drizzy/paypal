import { check } from 'express-validator';
import { validate } from '../../utils/validate';

const productValidate = [

  check('img').exists().isString(),
  check('title').exists().isString().notEmpty(),
  check('slug').exists().isString().notEmpty().isSlug(),
  check('desc').exists().isString().notEmpty(),

  (req, res, next) => {
    validate(req, res, next);
  }
]

export { productValidate };