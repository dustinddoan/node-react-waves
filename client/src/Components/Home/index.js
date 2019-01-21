import React, { Component } from 'react'
import HomeSilder from './home_slider'
import HomePromotion from './home_promotion'
import CardBlock from '../utils/card_blocks'
import { connect } from 'react-redux'
import { getProductsBySell, getProductsByArrival } from '../../actions/products_action'


class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getProductsBySell());
    this.props.dispatch(getProductsByArrival());
  }

  render() {
    return (
      <div>
        <HomeSilder />
        <CardBlock 
          list={this.props.products.bySell}
          title={'Best Selling Guitars'}
        />
        <HomePromotion />
        <CardBlock 
          list={this.props.products.byArrival}
          title={'New Arrivals'}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Home);
