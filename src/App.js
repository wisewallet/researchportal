import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      companies: ['']
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSearch(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();

    fetch("https://u9b604czc3.execute-api.us-east-1.amazonaws.com/default/getcompanyinfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: this.state.value})
    }).then(response => response.json()).then(json => this.setState({current: json.name}));
  }

  componentWillMount() {
    fetch("https://u9b604czc3.execute-api.us-east-1.amazonaws.com/default/getallcompanies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json()).then(json => this.setState({companies: json}));
  }

  render() {
    if (!this.state.current) {
      return (<div className="App">
        <form onSubmit={this.handleSearch}>
          <label>
            Select Company:
            <select value={this.state.value} onChange={this.handleChange}>
              <option value=""></option>
              {this.state.companies.map((name) => (<option key={name} value={name}>{name}</option>))}
            </select>
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </div>);
    }
    return (<div className="App">
      <form onSubmit={this.handleSearch}>
        <label>
          Select Company:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value=""></option>
            {this.state.companies.map((name) => (<option key={name} value={name}>{name}</option>))}
          </select>
        </label>
        <input type="submit" value="Submit"/>
      </form>
      <h1>{this.state.current}</h1>
    </div>);
  }
}

export default App;
