import React from 'react';

class AddFishForm extends React.Component {
  createFish(event) {
    event.preventDefault();
    const fish = {
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      desc: this.desc.value,
      image: this.image.value
    }
    this.props.addFish(fish);
    this.fishForm.reset();
  }

  render() {
    return(
      <form ref={(data) => {this.fishForm = data}} className="fish-edit" onSubmit={(e) => {this.createFish(e)}}>
        <input ref={(input) => {this.name = input}} type="text" placeholder="Fish Name"/>
        <input ref={(input) => {this.price = input}} type="text" placeholder="Fish Price"/>
        <select ref={(input) => {this.status = input}}>
          <option value="aviable">Fresh!</option>
          <option value="unaviable">Sold Out!</option>
        </select>
        <textarea ref={(input) => {this.desc = input}} type="text" placeholder="Fish Desc"></textarea>
        <input ref={(input) => {this.image = input}} type="text" placeholder="Fish Image"/>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default AddFishForm;
