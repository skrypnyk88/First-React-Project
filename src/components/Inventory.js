import React from 'react';
import AddFishForm from './AddFishForm'

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key]
    const updateFish = {
      ...fish,
      [e.target.name]: e.target.value
    }
    this.props.updateFish(key, updateFish);
  }

  renderInventory(key) {
    const data = this.props.fishes[key];
    return (
      <div className="fish-edit">
        <input type="text"
               name="name"
               value={data.name}
               placeholder="Fish Name"
               onChange={(e) => this.handleChange(e, key)}/>
        <input type="text"
               name="price"
               value={data.price}
               placeholder="Fish Price"
               onChange={(e) => this.handleChange(e, key)}/>
        <select name="status" value={data.status} onChange={(e) => this.handleChange(e, key)}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text"
                  name="desc"
                  value={data.desc}
                  placeholder="Fish Desc"
                  onChange={(e) => this.handleChange(e, key)}></textarea>
        <input type="text"
               name="image"
               value={data.image}
               placeholder="Fish Image"
               onChange={(e) => this.handleChange(e, key)}/>
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    )
  }

  render() {
    return(
      <div>
        <h2>Inventory</h2>
          {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.sampleFishes}>Add sample</button>
      </div>

    )
  }
}

export default Inventory;
