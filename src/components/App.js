import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish'
import SampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();
    this.addFish = this.addFish.bind(this);
    this.loadSampleFishes = this.loadSampleFishes.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.removeOrder = this.removeOrder.bind(this);
    this.state = {
      fishes: {},
      order: {}
    };
  }

  componentWillMount() {
    let url = `${this.props.params.storeId}/fishes`;
    let obj = { context: this, state: 'fishes' }
    this.ref = base.syncState(url, obj);

    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if(localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
  }

  addFish(fish) {
    const fishes = {...this.state.fishes};
    const timeStamp = Date.now();
    fishes[`fish-${timeStamp}`] = fish;
    this.setState({ fishes });
  }

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({fishes})
  }

  removeFish(key){
    const fishes = {...this.state.fishes};
    fishes[key] = null
    this.setState({ fishes })
  }


  loadSampleFishes() {
    this.setState({
      fishes: SampleFishes
    })
  }

  addToOrder(key){
    const order = {...this.state.order};
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  }

  removeOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order })
  }

  render(){
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Frash sea-food market"/>
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key}
                                  index={key}
                                  details={this.state.fishes[key]}
                                  addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order order={this.state.order}
               fishes={this.state.fishes}
               params={this.props.params}
               removeOrder={this.removeOrder}/>
        <Inventory addFish={this.addFish}
                   sampleFishes={this.loadSampleFishes}
                   fishes={this.state.fishes}
                   updateFish={this.updateFish}
                   removeFish={this.removeFish}/>
      </div>
    )
  }
}

App.propTypes = { params: React.PropTypes.object.isRequired }

export default App;
