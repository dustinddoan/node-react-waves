import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {
  render() {

    const onSuccess = (payment) => {
      // console.log(JSON.stringify(payment));
      this.props.transactionSuccess(payment)

      // { 
      //   "paid": true, 
      //   "cancelled": false, 
      //   "payerID": "6EMMKZZ7N4GPU", 
      //   "paymentID": "PAYID-LR6Y32A74D040661B858570W", "paymentToken": "EC-6PR00819BW031892L", 
      //   "returnUrl": "https://www.paypal.com/checkoutnow/error?paymentId=PAYID-LR6Y32A74D040661B858570W&token=EC-6PR00819BW031892L&PayerID=6EMMKZZ7N4GPU", "address": { 
      //     "recipient_name": "test buyer", "line1": "1 Main St", "city": "San Jose", "state": "CA", "postal_code": "95131", "country_code": "US" }, 
      //   "email": "ddoan.us-buyer@gmail.com" 
      // }
      
    }

    const onCancel = (data) => {
      console.log(JSON.stringify(data));

    }

    const onError = (err) => {
      console.log(JSON.stringify(err));

    }

    const client = {
      sandbox: 'AXVxo4Y3kCV46J6QE8hmBIcluin98YzpWFh9YOCRAU-fGJvkj8cxin-5cjqcFhI26VaEL7iVDVz5wY0E',
      production: ''
    }

    let env = 'sandbox';
    let currency = 'USD';
    let total = this.props.toPay

    

    return (
      <div>
        <PaypalExpressBtn 
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onCancel={onCancel}
          onSuccess={onSuccess}
          style={{
            size: 'large',
            // color: 'blue',
            // shape: 'rect',
            label: 'checkout'
          }}
        />
      </div>
    );
  }
}

export default Paypal;