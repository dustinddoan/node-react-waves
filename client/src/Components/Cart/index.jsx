import React, { Component } from 'react'
import UserLayout from '../../HOC/user'
import UserProductBlock from '../utils/User/product_block'
import Paypal from '../utils/paypal'
import {connect} from 'react-redux';
import { getCartItems, removeCartItem, onSuccessBuy } from '../../actions/user_actions'

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown'
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile'

// AXVxo4Y3kCV46J6QE8hmBIcluin98YzpWFh9YOCRAU-fGJvkj8cxin-5cjqcFhI26VaEL7iVDVz5wY0E

class Cart extends Component {

  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false
  }

  componentDidMount() {
    let cartItem = []
    let user = this.props.user;
    
    if(user.userData.cart) {
      if(user.userData.cart.length > 0) {
        user.userData.cart.forEach(item => {
          cartItem.push(item.id)
        })

        this.props.dispatch(getCartItems(cartItem, user.userData.cart)).then(response => {
          if(this.props.user.cartDetail.length > 0) {
            this.calculateTotal(this.props.user.cartDetail)
          }
        })
      }
    }
  }

  calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.forEach(item => {
      total += parseInt(item.price, 10) * item.quantity;
    })

    this.setState({
      total,
      showTotal: true
    })
  }

  removeFromCart = (id) => {
    this.props.dispatch(removeCartItem(id))
      .then(() => {
        if(this.props.user.cartDetail.length <= 0) {
          this.setState({
            showTotal: false
          })
        } else {
          this.calculateTotal(this.props.user.cartDetail)
        }
      })
  }

  transactionError = () => {

  }

  transactionCanceled = () => {

  }

  transactionSuccess = (data) => {
    // console.log('cartdetail:', this.props.user.cartDetail)
    // console.log('data:', data)
    this.props.dispatch(onSuccessBuy({
      cartDetail: this.props.user.cartDetail,
      paymentData: data
    })).then(() => {
      if(this.props.user.successBuy) {
        this.setState({
          showTotal: false,
          showSuccess: true
        })
      }
    })
    
  }

  render() {
    return (
      <UserLayout>
        <div>
          <h1>My cart</h1>
          <div className="user_cart">
            
            <UserProductBlock 
              products={this.props.user}
              type="cart"
              removeItem={(id) => this.removeFromCart(id)}
            />

            { this.state.showTotal ?
              <div>
                <div className="user_cart_sum">
                  <div>
                    Total amount: $ {this.state.total}
                  </div>
                </div>
              </div>
              : 
                this.state.showSuccess ?
                  <div className="cart_success">
                    <FontAwesomeIcon icon={faSmile}/>
                    <div>Thank you</div>
                    <div>You will receive the confirmation email when the order is processed</div>
                  </div>
                :
                  <div>
                    <div className="cart_no_items">
                      <FontAwesomeIcon icon={faFrown}/>
                      <div> Cart empty</div>
                    </div>
                  </div>
            }
          </div>
          
          {
            this.state.showTotal ?
              <div className="paypal_button_container">
                <Paypal 
                  toPay={this.state.total}
                  transactionError={data => this.transactionError(data)}
                  transactionCanceled={data => this.transactionCanceled(data)}
                  transactionSuccess={data => this.transactionSuccess(data)}
                />
              </div>
            : null
          }

        </div>
      </UserLayout>
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Cart);