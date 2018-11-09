import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: '',
      companies: [''],
      currentTransactionNames: '',
      currentEScore: 0,
      currentSScore: 0,
      currentGScore: 0,
      currentPScore: '',
      creatingNew: false,
      current: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(event) {
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSearch(event) {
    event.preventDefault();

    fetch("https://u9b604czc3.execute-api.us-east-1.amazonaws.com/default/getcompanyinfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: this.state.selection})
    }).then(response => response.json()).then(json => this.setState({
      current: json.name,
      currentCategory: json.category,
      currentEScore: json.eScore,
      currentSScore: json.sScore,
      currentGScore: json.gScore,
      currentPScore: json.pScore,
      currentTransactionNames: json.transactionString.toString()
    }));
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({
      current: null,
      currentTransactionNames: '',
      currentEScore: 0,
      currentSScore: 0,
      currentGScore: 0,
      currentCategory: '',
      currentPScore: '',
      creatingNew: false
    })
  }

  handleSave(event) {
    alert('Saved Data For: ' + this.state.current);
    event.preventDefault();
    console.log(this.state.currentTransactionNames);
    fetch("https://u9b604czc3.execute-api.us-east-1.amazonaws.com/default/updatecompany", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.current,
        eScore: parseInt(this.state.currentEScore),
        gScore: parseInt(this.state.currentGScore),
        sScore: parseInt(this.state.currentSScore),
        transactionString: this.state.currentTransactionNames,
        pScore: this.state.currentPScore.toLowerCase(),
        category: this.state.currentCategory.toLowerCase()
      })
    }).then(this.setState({
      creatingNew: false,
      current: null,
      currentEScore: undefined,
      currentGScore: undefined,
      currentSScore: undefined,
      currentTransactionNames: undefined,
      currentPScore: '',
      currentCategory: ''
    })).then(fetch("https://u9b604czc3.execute-api.us-east-1.amazonaws.com/default/getallcompanies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json()).then(json => this.setState({companies: json})));
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
    if (this.state.current == null) {
      return (<div className="App">
        <form onSubmit={this.handleSearch}>
          <label>
            Select Company:
            <select name="selection" value={this.state.selection} onChange={this.handleChange}>
              <option value=""></option>
              {this.state.companies.map((name) => (<option key={name} value={name}>{name}</option>))}
            </select>
          </label>
          <input type="submit" value="Submit"/>
        </form>
        <button onClick={() => {
            this.setState({creatingNew: true, current: ''});
            console.log("creating new company");
          }}>Create New Company</button>
      </div>);
    }
    return (<div className="App">
      <form onSubmit={this.handleSearch}>
        <label>
          Select Company:
          <select name="selection" value={this.state.selection} onChange={this.handleChange}>
            <option value=""></option>
            {this.state.companies.map((name) => (<option key={name} value={name}>{name}</option>))}
          </select>
        </label>
        <input type="submit" value="Submit"/>
      </form>
      <form onSubmit={this.handleSave}>
        <label>Name:
        </label><input name="current" type="text" value={this.state.current} onChange={this.handleChange}/>
        <hr/>
        <label>Category:
        </label><input name="currentCategory" type="text" value={this.state.currentCategory} onChange={this.handleChange}/>
        <hr/>
        <label>Environmental:
        </label><input name="currentEScore" type="text" value={this.state.currentEScore} onChange={this.handleChange}/>
        <hr/>
        <label>Social:
        </label><input name="currentSScore" type="text" value={this.state.currentSScore} onChange={this.handleChange}/>
        <hr/>
        <label>Governance:
        </label><input name="currentSScore" type="text" value={this.state.currentGScore} onChange={this.handleChange}/>
        <hr/>
        <label>Politics:
        </label><input name="currentPScore" type="text" value={this.state.currentPScore} onChange={this.handleChange}/>
        <hr/>
        <label>Possible Transaction Names:
        </label><input name="currentTransactionNames" type="text" value={this.state.currentTransactionNames} onChange={this.handleChange}/>
        <hr/>
        <input type="submit" value="Save"/>
      </form>

      <button onClick={this.handleCancel}>Cancel</button>
    </div>);
  }
}

export default App;
