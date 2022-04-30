import jwt from 'jsonwebtoken';

const tokenSign = (user) => {

  try {

    return jwt.sign({
      _id: user._id,
      role: user.role
    },
      process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
    )

  } catch (e) {

    console.log(e);
    
  }
}

const tokenVerify = (token) => {

  try {

    return jwt.verify(token, process.env.JWT_SECRET);

  } catch (e) {

    return null;

  }

}

const tokenDecode = (token) => {
  try {

    return jwt.decode(token, null);

  } catch (e) {

    console.log(e);

  }
}

export { tokenSign, tokenVerify, tokenDecode };