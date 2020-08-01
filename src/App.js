import React from 'react';
import './App.css';

let url = "http://en.wikipedia.org/w/api.php";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

 async handleClick (val) {
    const params = {
      action: "query",
      list: "search",
      srsearch: val,
      format: "json"
    };
    
    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    try {
      const response = await fetch(url);
      const json = await response.json();
      this.setState({datas: json.query.search});
    } catch (error) {
      console.log(error);
    }
   
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  keyPress(e){
    if(e.keyCode === 13){
      this.handleClick(this.state.value)
    }
  }

  renderData() {
    return (
      <div>
          {
            this.state.datas.map(function(item){      
            return <div key={item.pageid} className='item'>
              <h2 className='title'>{item.title}</h2>
              <p dangerouslySetInnerHTML={{__html: item.snippet}} ></p>  
            </div>
          })
        }
      </div>
    );  
  }

  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <h1>Wikipedia Search</h1>
          <input type="text" className="searchTerm" data-value={this.state.value} onKeyDown={this.keyPress} onChange={this.handleChange} />
          <a className='search' data-value={this.state.value} onClick={() => this.handleClick(this.state.value)}>Submit</a>
          <div className="output">
            {this.renderData()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
