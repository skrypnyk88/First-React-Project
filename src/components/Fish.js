import React from'react';
import { formatPrice } from '../helpers'

class Fish extends React.Component {
  render() {
    const {details, index} = this.props
    const isAviable = details.status === 'available';
    const buttonText = isAviable ? "Add to order" : "Sold out"
    return (
      <li className="menu-fish">
      <img src={details.image} alt="Exist"/>
      <h3 className="fish-name">
        {details.name}
        <span className="price">{formatPrice(details.price)}</span>
      </h3>
      <p>{details.desc}</p>
      <button onClick={() => {this.props.addToOrder(index)}} disabled={!isAviable}>{buttonText}</button>
      </li>
    )
  }
}

export default Fish;
