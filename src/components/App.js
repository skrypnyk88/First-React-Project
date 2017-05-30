import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish'
import SampleFishes from '../sample-fishes';

class App extends React.Component {
  constructor() {
    super();
    this.addFish = this.addFish.bind(this);
    this.loadSampleFishes = this.loadSampleFishes.bind(this);
    this.state = {
      fishes: {},
      order: {}
    };
  }

  addFish(fish) {
    const fishes = {...this.state.fishes};
    const timeStamp = Date.now();
    fishes[`fish-${timeStamp}`] = fish;
    this.setState({ fishes });
  }

  loadSampleFishes() {
    this.setState({
      fishes: SampleFishes
    })
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
                .map(key => <Fish key={key} details={this.state.fishes[key]}/>)
            }
          </ul>
        </div>
        <Order/>
        <Inventory addFish={this.addFish} sampleFishes={this.loadSampleFishes}/>
      </div>
    )
  }
}

export default App;
