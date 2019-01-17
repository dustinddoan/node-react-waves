import React, { Component } from 'react'
import HomeSilder from './home_slider'
import HomePromotion from './home_promotion'

export default class Home extends Component {
  render() {
    return (
      <div>
        <HomeSilder />
        <HomePromotion />
      </div>
    )
  }
}
