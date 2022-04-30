import { tokenVerify } from '../utils/generateToken';

const tokenAuth = async(req, res, next) => {

  try {

    const token = req.headers.authorization.split(' ').pop();
    const tokenData = tokenVerify(token);

    if(tokenData._id){
      next();
    }else{
      res.status(409).json({error: 'No tienes permisos para estar aqui!'});
    }

  } catch (e) {
    console.log(e);
    res.status(409).json({error: 'No tienes permisos para estar aqui!'});
  }
  

}

export default tokenAuth;