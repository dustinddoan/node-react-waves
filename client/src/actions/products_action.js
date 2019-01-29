import axios from 'axios';
import { PRODUCT_SERVER } from '../Components/utils/misc';
import {GET_PRODUCTS_BY_SELL, GET_PRODUCTS_BY_ARRIVAL, GET_BRANDS, GET_WOODS } from './types';

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

export function getWoods() {
  const request = axios.get(`${PRODUCT_SERVER}/woods`)
    .then(res => res.data)

  return {
    type: GET_WOODS,
    payload: request
  }
}