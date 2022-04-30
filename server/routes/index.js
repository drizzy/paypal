import users from '../api/users/users.routes';
import products from '../api/products/products.routes';
import auth from '../services/auth/auth.routes';
import paypal from '../services/paypal/paypal.routes';
import testPaypal from '../tests/paypal/paypal.routes';

export default (app) => {

  app.use('/api/users', users)
  app.use('/api/products', products)
  app.use('/api/paypal', paypal)
  app.use('/api/test-paypal', testPaypal)
  app.use('/api/auth', auth)

}