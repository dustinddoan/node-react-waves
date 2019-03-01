import React, { Component } from 'react';
import PageTop from '../utils/page_top';
import { connect } from 'react-redux'

import { getProductDetail, clearProductDetail } from '../../actions/products_action'
import ProdInfo from './prodInfo'
import ProdImg from './prodImg'

class ProductPage extends Component {

  componentDidMount = () => {
    const id = this.props.match.params.id;
    // console.log(id);
    this.props.dispatch(getProductDetail(id))  
  }

  componentWillUnmount() {
    this.props.dispatch(clearProductDetail())
  }
  
  addToCartHandler = (id) => {
    
  }
  render() {
    return (
      <div>
        <PageTop title="Product detail"/>

        <div className="container">
        {
          this.props.products.prodDetail ?
            <div className="product_detail_wrapper">
              <div className="left">
                <div style={{width: '500px'}}>
                  <ProdImg 
                    detail={this.props.products.prodDetail}
                  />
                </div>
              </div>
              <div className="right">
                <ProdInfo 
                  addToCart={(id) => this.addToCartHandler(id)}
                  detail={this.props.products.prodDetail}
                />
              </div>
            </div>
          : null
        }
        
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(ProductPage);