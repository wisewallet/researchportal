import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      companies: ['hi']
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  componentWillMount() {
    fetch("https://u9b604czc3.execute-api.us-east-1.amazonaws.com/default/getallcompanies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json()).then(json => this.setState({companies: body}));
  }

  render() {
    return (<div className="App">
      <form onSubmit={this.handleSubmit}>
        <label>
          Select Company:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            {this.state.companies.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    </div>);
  }
}

export default App;
