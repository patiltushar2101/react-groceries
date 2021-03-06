import React, { Component } from 'react';
import './App.css';

import GroceryList from './GroceryList';
import AddGroceryForm from './AddGroceryForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      groceries: [
        { id: 1489863729151, name: 'Rutabagas', quantity: 10, purchased: false, starred: false },
        { id: 1489863740047, name: 'Beef Jerky', quantity: 1000, purchased: false, starred: false },
      ],
      errorStatus: ''
    };

    this.updateGroceryList = this.updateGroceryList.bind(this);
  }

  componentDidMount() {
    fetch('/api/v1/groceries')
      .then((response) => {
        if (response.status >= 400) {
          this.setState({
            errorStatus: 'Error fetching groceries',
          });
        }
        else {
          response.json().then((data) => {
            this.setState({ groceries: data.groceries });
          });
        }
      });
  }

  updateGroceryList(groceries) {
    this.setState({ groceries });
  }

  render() {
    const { errorStatus, groceries } = this.state;

    return (
      <div id="app">
        <AddGroceryForm updateGroceryList={this.updateGroceryList} />
        <h2>Groceries:</h2>
        { errorStatus && <p className="error">{errorStatus}</p> }
        <GroceryList groceries={groceries} />
      </div>
    );
  }
}

export default App;
