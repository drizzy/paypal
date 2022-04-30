import Orders from './orders.model';
import { httpError } from '../../utils/handleError';

const show = async(req, res) => {

  try {

    const order = await Orders.findById(req.params.id).populate('user', 'name email');

    if(!order){


      res.status(404).json({message: 'Order not found'});

    }else{

      res.status(200).json(order);

    }

  } catch (e) {
    httpError(e);
  }

}

const create = async(req, res) => {

  try {

   const {orderItems, shippinAddress, paymentMethod, itemsPrice, taxPrice, shipinPrice, totalPrice}
    = req.body;
   
   if(orderItems && orderItems.length == 0){

    res.status(404).json({message: 'Not order items'});

   }else{

    const order = new Orders({
      user: req.user._id,
      orderItems,
      shippinAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shipinPrice,
      totalPrice
    });

    const createOrder = await order.save();
    res.status(200).json(createOrder);

   }

  } catch (e) {
    httpError(e);
  }

}

const update = async(req, res) => {

  try {
   
  } catch (e) {
    httpError(e);
  }

}

const destroy = async(req, res) => {

  try {
   
  } catch (e) {
    httpError(e);
  }

}

export default {show, create, update, destroy};