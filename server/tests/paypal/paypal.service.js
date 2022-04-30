import paypal from '../../config/paypal';
/* import product from '../../api/products/products.model';
 */
const checkout = (req, res) => {

  try {

  const create_payment_json = {

      "intent": "sale",
      "payer": {
        "payment_method": "paypal",

      },

      "redirect_urls": {
        "return_url": "http://localhost:4000/api/test-paypal/sucess",
        "cancel_url": "http://localhost:4000/api/test-paypal/cancel"
      },

      "transactions":[ {
        "item_list": {
          "items": [
            {
              "name": "Redhock Bar Soap",
              "sku": "001",
              "price": "25.00",
              "currency": "USD",
              "quantity": 1,
            }
          ]
        },
        
        "amount": {
          "currency": "USD",
          "total": "25.00",
        },
        
        "description": "Washing bar soap",

      }]


    }
    
    paypal.payment.create(create_payment_json, function(error, payment){

      if(error){
          res.json({status: false, info: error});
      }else{

        let url = '';
        payment.links.forEach(link => {
          if(link.rel === 'approval_url'){
            url = link.href;
          }
        });
        console.log(url);
        res.json({ url })
      }
    })

  } catch (e) {
    console.log(e);
  }

}

const sucess = (req, res)=> {

  try {
    
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
        "amount": {
          "currency": "USD",
          "total": "25.00"

        }
      }]
    }


    paypal.payment.execute(paymentId, execute_payment_json, function(error, payment){

      if(error){
        res.redirect('/?status=error');
        throw error;
      }else{
        console.log(JSON.stringify(payment));
        res.redirect('/?status=success');
      }

    })

  } catch (e) {
    console.log(e);
  }

}

const cancel = (req, res)=> {

  try {
    res.send('Cancelled');
  } catch (e) {
    console.log(e);
  }

}

export default { checkout, sucess, cancel };