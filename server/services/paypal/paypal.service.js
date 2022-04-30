import axios from 'axios';

const create = async (req, res) => {
  
  try {

    /* Order*/
    const order = {
      intent: "CAPTURE",

      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "150.50"
          },
          description: "applicacion de edicion",
        }
      ],

      application_context: {
        brand_name: "drizzy.dev",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${process.env.HOST}/capture-payment`,
        cancel_url: `${process.env.HOST}/cancel-payment`
      }

    };

    /* Format the body */
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    /* Generate an acces token */
    const { data: {access_token}, } = await axios.post(`${process.env.PAYPAL_API}/v1/oauth2/token`,
    params, 
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: process.env.PAYPAL_API_CLIENT,
        password: process.env.PAYPAL_API_SECRET
      }
    });

    /* make a request */
    const response = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders`, 
    order, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });  

    return res.json(response.data);

  } catch (e) {

    console.log(e.message);
    return res.status(500).json('Something goes wrong');

  }

}

const capture = async (req, res) => {

  const { token } = req.query;

  try{

    const response = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`, 
    {}, {
      auth: {
        username: process.env.PAYPAL_API_CLIENT,
        password: process.env.PAYPAL_API_SECRET
      }
    });

    res.redirect('/payed.html');
  }catch(e){

    console.log(e.message);

  }

}

const cancel = async (req, res) => {
  res.redirect('/')
}

export default { create, capture, cancel };