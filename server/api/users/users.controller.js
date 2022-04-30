import Users from './users.model';
import { encrypt, compare } from '../../utils/handleBcrypt';
import { httpError } from '../../utils/handleError';

const show = async(req, res) => 
{
  try {
    const {email } = req.params;
    const user = await Users.findOne({email});
    res.status(200).json(user);
  } catch (e) {
    httpError(res, e);
  }
}

const showAll = async(req, res) => 
{
  try {
    const user = await Users.find();
    res.status(200).json(user);
  } catch (e) {
    httpError(res, e);
  }
}

const create = async(req, res) => 
{
  try {
    const { name, username, email, password, role } = req.body;

    const searchUser = await Users.findOne({email});

    if(searchUser){

      return res.status(400).json({error: 'El Email ya existe!'});

    }else{

      const passwordHash = await encrypt(password);

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

const update = async(req, res) => 
{
  try {

    const { name, username, email, password, role } = req.body;

    let user = await Users.findOne({email});

    const passwordHash = await encrypt(password);

    const data = {
      name: name || user.name,
      username: username || user.username,
      email: email || user.email,
      password: passwordHash || user.password,
      role: role || user.role,
    };

    user = await Users.findOneAndUpdate(email, data, {new: true});
    res.status(200).json(user);

  } catch (e) {
    httpError(res, e);
  }
}

const destroy = async(req, res) => 
{
  try {
    const { email } = req.params;
    
    const user = await Users.findOneAndUpdate(email, {
      $set: {
        status: false
      }
    }, {new: true});

    res.status(200).json(user);

  } catch (e) {
    httpError(res, e);
  }
}

export default { show, showAll, create, update, destroy };