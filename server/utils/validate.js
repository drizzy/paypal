import { validationResult } from 'express-validator';

const validate = (req, res, next) => {

  try {
    validationResult(req).throw();
    next();
  } catch (e) {
    res.status(400).json({errors: e.array() });
  }
  
}

export { validate };