import { tokenVerify } from '../utils/generateToken';
import Users from '../api/users/users.model';

const roleAuth = (roles) => async(req, res, next) => {

  try {
    
    const token = req.headers.authorization.split(' ').pop();
    const tokenData = tokenVerify(token);
    const userData = await Users.findById(tokenData._id);

    if([].concat(roles).includes(userData.role)){
      next();
    }else{

      res.status(409).json({error: 'No tienes permisos para estar aqui!'});

    }

  } catch (e) {
    console.log(e);
    res.status(409).json({error: 'No tienes permisos para estar aqui!'});
  }
}

export default roleAuth;