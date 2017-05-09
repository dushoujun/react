import React from 'react';
import ReactDOM from 'react-dom';
import Item from './Item';
require ('./test.scss');
class List extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    let data = this.props.data;
    const items = data.map((number,i) =>
      <Item key={number[0].toString()} onItemSelect={this.props.onSelect} data={number} />
    );
    return (
      <ul >
        {items}
      </ul>
    )
  }
}
module.exports = List;
