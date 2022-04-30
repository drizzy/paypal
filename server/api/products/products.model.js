import { Schema, model } from 'mongoose';

const Products = new Schema({

  img: {
    type: String,
    require: true,
  },

  title: {
    type: String,
    required: true,
  },

  desc: {
    type: String,
    required: true,
  },

  price: { 
    type: Number, 
    required: true,
  }, 

  cloudinary_id: {
    type: String,
  }

}, {timestamps: true, versionkey: false });

export default model('products', Products);