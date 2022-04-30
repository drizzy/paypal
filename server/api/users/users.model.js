import { Schema, model } from 'mongoose';

let roles = {
  values: ["ADMIN", "USER"],
  message: '{VALUE} no es un rol valido '
}

const Users = new Schema({
  
  name: { 
    type: String,
    unique: false,
    required: [false]
  },

  username: { 
    type: String,
    unique: true,
    required: [true]
  },

  email: { 
    type: String,
    unique: true,
    required: [true]
  },

  password: { 
    type: String,
    unique: false,
    required: [true]
  },

  role: {
    type: String,
    required: [true],
    default: 'USER',
    enum: roles,
  },

  status: {
    type: Boolean,
    default: true,
  }

}, {versionKey: false});

Users.methods.toJSON = function(){
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject;
}

export default model('users', Users);