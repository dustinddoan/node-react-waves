import { combineReducers } from 'redux';
import user from './user_reducers';
import products from './product_reducers'

const rootReducer = combineReducers({
  user,
  products
})

export default rootReducer;