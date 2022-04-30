import Products from './products.model';
import cloudinary from '../../config/cloudinary';
import { httpError } from '../../utils/handleError';

const show = async(req, res) => {

  try {

    const { id } = req.params;

    const product = await Products.findById(id);

    res.status(200).json(product);

  } catch (e) {
    httpError(e);
  }

}

const showAll = async(req, res) => {

  try {
    
    const product = await Products.find();

    res.status(200).json(product);
    
  } catch (e) {
     httpError(e);
  }

}

const create = async(req, res) => {

  try {
    
    let result;
    if(req.file){
      result = await cloudinary.uploader.upload(req.file.path);
    }

    const product = await Products.create({
      img:    result?.url,
      title:  req.body.title,
      desc:   req.body.desc,
      cloudinary_id: result?.public_id,

    });

    res.status(200).json(product);

  } catch (e) {
     httpError(e);
  }

}

const update = async(req, res) => {

  try {

    let product = await Products.findOne(req.params.id);

    if(product.cloudinary_id){
      await cloudinary.uploader.destroy(product.cloudinary_id);
    }

    let result;
    if(req.file){
      result = await cloudinary.uploader.upload(req.file.path);
    }

    const data = {
      img:    result?.url || product.img,
      title:  req.body.title  || product.title,
      slug:   req.body.slug || product.slug,
      desc:   req.body.desc || product.desc,
      cloudinary_id: result?.public_id  || product.cloudinary_id,
    }

    product = await Products.findOneAndUpdate(req.params.id, data, {new: true});

    res.status(200).json(products);

  } catch (e) {
     httpError(e);
  }

}

const destroy = async(req, res) => {

  try {
    const { id } = req.params;

    const product = await Products.findOneAndDelete(id);

    res.status(200).json(product);

  } catch (e) {
    httpError(e);
  }

}

export default {show, showAll, create, update, destroy};