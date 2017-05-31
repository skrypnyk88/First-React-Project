import React from 'react';
import { formatPrice } from '../helpers'
import CSSTransitionGroup from 'react-addons-css-transition-group';
class Order extends React.Component {
  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(key) {
    const fish = this.props.fishes[key];
    const order = this.props.order[key];
    const removeButton = <button onClick={() => {this.props.removeOrder(key)}}>&times;</button>

    if(!fish || fish.status === 'unavailable') {
      return (
        <li key={key}>Sorry {fish ? fish.name : 'fish'} is no longer avialable!{removeButton}</li>
      )
    }

    return (
      <li key={key}>
        <span>
          <CSSTransitionGroup
            component="span"
            className="count"
            transitionName="count"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}
          >
            <span key={order}>{order}</span>
          </CSSTransitionGroup>
          lbs {fish.name} {removeButton}
        </span>
        <span className="price">{formatPrice(order * fish.price)}</span>
      </li>
    )
  }

  render() {
    const orderIds = Object.keys(this.props.order);
    let total = orderIds.reduce((total, key) => {
      const fish = this.props.fishes[key];
      const order = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if(isAvailable) {
        return total + (order * fish.price || 0)
      }
      return total;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <CSSTransitionGroup
          className="order"
          component="ul"
          transitionName="order"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </CSSTransitionGroup>
      </div>
    )
  }
}

Order.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  order: React.PropTypes.object.isRequired,
  removeOrder: React.PropTypes.func.isRequired
}

export default Order;
