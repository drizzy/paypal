import Users from '../../api/users/users.model';
import { tokenSign } from '../../utils/generateToken';
import { compare, encrypt } from '../../utils/handleBcrypt';
import { httpError } from '../../utils/handleError';

const login = async (req, res) => {

  try {

    const { email , password } = req.body;

    const user = await Users.findOne({email});

    if(!user){
      return res.status(404).json({error: 'El usuario no existe'});
    }

    const checkPassword = await compare(password, user.password);

    const tokenSession =  tokenSign(user);

    if(checkPassword){
      res.json({
        data: user,
        tokenSession
      })
      return
    }

    if(!checkPassword){
      res.status(409).json({error: 'Email o password incorrectos'});
      return
    }

  } catch (e) {
    httpError(res, e);
  }

}

const register = async (req, res) => {

  try {
    const { name, username, email, password } = req.body;

    const searchUser = await Users.findOne({email});

    if(searchUser){

      return res.status(400).json({error: 'El Email ya existe!'});

    }else{

      const passwordHash = await encrypt(password);

      let role;
      if(email == 'admin@drizzy.dev'){
        role = 'ADMIN';
      }

      const user = await Users.create({
        name: name,
        username: username,
        email: email,
        password: passwordHash,
        role: role,
      });

      res.status(200).json(user);
    }

  } catch (e) {
    httpError(res, e);
  }
}

export {login, register};