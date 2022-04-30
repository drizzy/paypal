import { Schema, model } from 'mongoose';

const Orders = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  },

  orderItems: [
    {
      name: {type: String, required: true},
      img:  {type: String, required: true},
      price: {type: Number, required: true},
      product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Products'
      }
    }
  ],

  shippinAddress: {
    address: {type: String, required: true},
    city: {type: String, required: true},
    zipCode: {type: String, required: true},
    country: {type: String, required: true}
  },

  paymentMethod: {
    type: String,
    required: true,
  },

  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },

  taxPrice: { 
    type: Numbre, 
    required: true, 
    default: 0.0
  },

  shipinPrice: {
     type: Numbre,
     required: true,
     default: 0.0
  },
  
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },

  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },

  paidAt: {
    type: Date,
  },

  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },

  deliveredAt: {
    type: Date,
  },

}, { timestamps: true, });

export default model('orders', Orders);