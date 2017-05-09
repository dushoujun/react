import React from 'react';
import ReactDOM from 'react-dom';
require ('./test.scss');
class Item extends React.Component{
  constructor(props) {
    super(props);
    this.itemClick = this.itemClick.bind(this);
    this.handleMouseenter = this.handleMouseenter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.state = {
      className : ''
    }
  }

  itemClick(ev) {
    this.props.onItemSelect(this.props.data[1])
  }

  handleMouseenter() {
    this.setState({
      className : 'hover'
    })
  }

  handleMouseLeave() {
    this.setState({
      className : ''
    })
  }

  render() {
    return (
      <li onClick={this.itemClick} onMouseEnter={this.handleMouseenter} onMouseLeave={this.handleMouseLeave} className={this.state.className}>
        <div className="tip"><strong>{this.props.data[4]}</strong><span>{this.props.data[5]}</span></div>
        {this.props.data[1]}
      </li>
    )
  }
}
module.exports = Item;
