import React from 'react';
import ReactDOM from 'react-dom';
require ('./test.scss');

function toFixedBit12(str) {
  return parseFloat(str.toString().substr(0,12));
}

function transformFloat(str,sep) {
  let arr = str.split(sep);
  let total = 0;

  let isNeg1 = arr[0].indexOf('±') != -1 ? -1 : 1;
  let isNeg2 = arr[1].indexOf('±') != -1 ? -1 : 1;

  let num1 = parseFloat(arr[0]);
  let num2 = parseFloat(arr[arr.length - 1]);


  let bit1 = num1.toString().split('.')[1] && num1.toString().split('.')[1].length || 0;
  let bit2 = num2.toString().split('.')[1] && num2.toString().split('.')[1].length || 0;

  let bit = Math.max(bit1,bit2);

  num1 = num1.toString().replace('.','') * Math.pow(10,(bit - bit1)) * isNeg1;
  num2 = num2.toString().replace('.','') * Math.pow(10,(bit - bit2)) * isNeg2;

  return {
    num1 : num1,
    num2 : num2,
    bit : bit,
    bit1 : bit1,
    bit2 : bit2
  }
}

function calculator(str,sep) {
  var result = transformFloat(str,sep);
  switch (sep) {
    case '+':
      result.total = result.num1 + result.num2;
      break;
    case '-':
      result.total = result.num1 - result.num2;
      break;
    case '*':
      result.bit = 2 * result.bit;
      result.total = result.num1 * result.num2;
      break;
    case '/':
      result.total = result.num1 / result.num2;
      break;
  }
  if(sep != '/') {
    result.total = result.total.toString();
    result.total = result.total.split('');
    result.total.splice((result.total.length - result.bit),0,'.');
    result.total = result.total.join('')
  }
  return parseFloat(result.total);
}

class NumberButton extends React.Component{
  constructor(props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick(event) {
    this.props.onNumberClick(event.target.value)
  }
  render() {
    return (
      <input type="button" onClick={this.buttonClick} value={this.props.number} />
    )
  }
}

class CreateButtons extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    let list = ['+','-','*','/','=','±','C','.','0','1','2','3','4','5','6','7','8','9'];
    const buttons = list.map((number) =>
      <NumberButton key={number.toString()} number={number} onNumberClick={this.props.clickButton} />
    );
    return (
      <div>{buttons}</div>
    ) 
  }
}
class Calculator extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      show:0,
      value: 0,
      temp : '',
      sep: '',
      hasOperator: false
    }
    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.numberBasicCal = this.numberBasicCal.bind(this);
    this.calResult = this.calResult.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.numberInput = this.numberInput.bind(this);
    this.getNegative = this.getNegative.bind(this);
  }  
  numberBasicCal(n) {
    let tp = this.state.temp.toString();
    let op = tp.charAt(tp.length - 1);
    let rs = '';
    op =  (/[\+,\-,\*,\/]/g).test(op);
    if(op) {
      rs = tp.split('');
      rs.splice(op.length - 1 , 1 , n);
      rs = op.join('');
    } else {
      rs = this.state.temp + n;
    }
    this.setState({
      temp: rs,
      hasOperator: true,
      value: 0,
      sep: n
    });
  }

  calResult(n) {
    if(this.state.sep == '/' && this.state.show == 0) {
      alert('除数不能为0');
      return;
    }
    let tp = calculator(this.state.temp,this.state.sep);
      this.setState({
        value: 0,
        temp: tp,
        hasOperator: false,
        sep: '',
        show: toFixedBit12(tp)
      });
  }

  clearInput() {
    this.setState({
      value: 0,
      show: 0,
      temp: '',
      hasOperator: false
    });
  }

  numberInput(n) {
    let val = this.state.value ? this.state.value + n : n;
      if(this.state.hasOperator) {
        this.setState({
          temp: this.state.temp + n,
          value: val,show:toFixedBit12(val)
        });

      } else {
        this.setState({
          temp: val,
          value: val,
          show: toFixedBit12(val)
        });
      }
  }

  getNegative() {
    var show = this.state.show.toString();
    if(show.indexOf('-') != -1) {
      show = Number(show.replace('-',''));
    } else {
      show = Number('-' + show);
    }
    this.setState({
      temp: this.state.temp + '±',
      show: toFixedBit12(show)
    });
  }

  handleNumberClick(n) {
    if(n == '+' || n == '-' || n == '*' || n == '/') {
      this.numberBasicCal(n);

    } else if(n == '='){
      this.calResult(n);

    } else if(n == 'C'){
      this.clearInput();

    } else if(n == '±'){
      this.getNegative();

    } else {
      this.numberInput(n);
    }

  }

  render() {
    return (
      <div className="wrap">
        <input type="text" value={this.state.show} />
        <CreateButtons clickButton={this.handleNumberClick} />
      </div>

    )
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);
