import axios from 'axios';
import { USER_SERVER, PRODUCT_SERVER } from '../Components/utils/misc';
import { 
  LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER,
  ADD_TO_CART_USER, GET_CART_ITEMS_USER, REMOVE_CART_ITEM_USER,
  ON_SUCCESS_BUY_USER
} from './types';

// export const loginUser = (dataToSubmit) => async dispatch =>{
//   const res = await axios.post(`${USER_SERVER}/login`, dataToSubmit)

//   // console.log('login', res.data);

//   dispatch({type: LOGIN_USER, payload: res.data})
// }

export function loginUser(dataToSubmit) {
  const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
    .then(response => response.data)

  return {
    type: LOGIN_USER,
    payload: request
  }
}

export function registerUser(dataToSubmit) {
  const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
    .then(response => response.data)

  return {
    type: REGISTER_USER,
    payload: request
  }
}

export function auth() {
  const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data)
  
    return {
      type: AUTH_USER,
      payload: request
    }
}

export function logoutUser() {
  const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data)
  
    return {
      type: LOGOUT_USER,
      payload: request
    }
}

export function addToCart(_id) {
  const request = axios.post(`${USER_SERVER}/addToCart?productId=${_id}`)
    .then(response => response.data)
    
  return{
    type: ADD_TO_CART_USER,
    payload: request
  }
}

export function getCartItems(cartItems, userCart) {
  const request = axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${cartItems}&type=array`)
    .then(response => {
      // console.log(response.data)
      let cartList = response.data

      userCart.forEach(item => {
        cartList.forEach((cartItem, i) => {
          if(item.id === cartItem._id) {
            cartList[i].quantity = item.quantity
          }
        })
      })

      return cartList
    })

  return {
    type: GET_CART_ITEMS_USER,
    payload: request
  }
}

export function removeCartItem(id) {
  const request = axios.get(`${USER_SERVER}/removeFromCart?_id=${id}`)
    .then(response => {
      response.data.cart.forEach(item =>{
        response.data.cartDetail.forEach((k, i) => {
          if(item.id === k._id) {
            response.data.cartDetail[i].quantity = item.quantity
          }
        })
      })

      return response.data
    })
  
  return {
    type: REMOVE_CART_ITEM_USER,
    payload: request
  }
}

export function onSuccessBuy(data) {
  const request = axios.post(`${USER_SERVER}/successBuy`, data)
    .then(response => {
      console.log(response.data)
      return response.data
    })
  

  return {
    type: ON_SUCCESS_BUY_USER,
    payload: request
  }
}