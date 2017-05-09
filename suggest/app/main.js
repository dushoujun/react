import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';
require ('./test.scss');
var citys = require('./data.json');
function filter(str) {
    let data = [];
    citys.map(function(number,i) {
      str = str.toLowerCase();
      let reg = new RegExp("^" + str);
      let rs = false;
      let match = '';
      let arr = number.concat();
      outerloop:
      for(var j = 0; j < 4; j++) {
        if(reg.test(number[j].toLowerCase())) {
          rs = true;
          match = number[j].substr(str.length);
          break outerloop;
        }
      }
      arr.push(str,match)
      rs && data.push(arr)
    });
    return data;
}
class Suggest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show : '北京',
      isOpen : false,
      value : '',
      data : citys
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.titleClick = this.titleClick.bind(this);
  }
  titleClick() {
    this.setState({
      isOpen: !this.state.isOpen,
      data: citys
    })
  }

  handleInput(ev) {
    let val = ev.target.value;
    this.setState({
      value : val,
      isOpen : true,
      data : filter(val)
    });
    
  }

  handleSelect(val){
    this.setState({
      show : val,
      isOpen : false,
      value: ''
    });
  }

  render(){
    let list = null;
    if(this.state.isOpen) {
      var dd = (<dd>
        <input type="text" onChange={this.handleInput} value={this.state.value} />
        <List data={this.state.data} onSelect={this.handleSelect} />
      </dd>);
    }
    return (
      <dl>
        <dt onClick={this.titleClick}><b></b>{this.state.show}</dt>
        {dd}
      </dl>
    )
  }
    
}
ReactDOM.render(
  <Suggest />,
  document.getElementById('root')
)