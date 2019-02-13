import axios from 'axios';
import { PRODUCT_SERVER } from '../Components/utils/misc';
import { 
  GET_PRODUCTS_BY_SELL, GET_PRODUCTS_BY_ARRIVAL, 
  GET_BRANDS, GET_WOODS,
  ADD_BRAND,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT, CLEAR_PRODUCT
  } from './types';

export function getProductsBySell() {
  const res = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
    .then(response => response.data)

  return {
    type: GET_PRODUCTS_BY_SELL,
    payload: res
  }
}

export function getProductsByArrival() {
  const res = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(response => response.data)

  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: res
  }
}

export function getBrands() {
  const request = axios.get(`${PRODUCT_SERVER}/brands`)
    .then(res => res.data)

  return {
    type: GET_BRANDS,
    payload: request
  }
}

export function addBrand(dataToSubmit, existingBrands) {
  const request = axios.post(`${PRODUCT_SERVER}/brand`, dataToSubmit)
    .then(response => {
      let brands = [...existingBrands, response.data.brand]

      return {
        success: response.data.success,
        brands
      }
    })

  return {
    type: ADD_BRAND,
    payload: request
  }
}

export function getWoods() {
  const request = axios.get(`${PRODUCT_SERVER}/woods`)
    .then(res => res.data)

  return {
    type: GET_WOODS,
    payload: request
  }
}

export function getProductsToShop(skip, limit, filters = [], previousState = []) {
  const data = {
      limit,
      skip, 
      filters
  }

  const request = axios.post(`${PRODUCT_SERVER}/shop`, data)
      .then(response => {
        let newState = [
          ...previousState,
          ...response.data.articles
        ]

        return {
          size: response.data.size,
          articles: newState
        }
      })
  
  return {
      type: GET_PRODUCTS_TO_SHOP,
      payload: request
  }
}

export function addProduct(dataToSubmit) {
  const request = axios.post(`${PRODUCT_SERVER}/article`, dataToSubmit)
    .then(response => response.data)
  
  return {
    type: ADD_PRODUCT,
    payload: request
  }

}



export function clearProduct() {
  return {
    type: CLEAR_PRODUCT,
    payload: ''
  }
}