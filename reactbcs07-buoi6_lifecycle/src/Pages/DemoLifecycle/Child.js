import React, { Component } from 'react';

export default class Child extends Component {
  constructor(props) {
    super();
    this.state = {};
    console.log('constructor child');
  }

  componentDidMount() {
    console.log('componentDidMount child');
  }

  shouldComponentUpdate(newProps, newState) {
    console.log('props', this.props);
    console.log('newProps', newProps);
    // Mình sẽ check nếu như người dùng bấm vào nút Lấy sản phẩm để lấy dữ liệu cho arrProduct thì sẽ không render lại vì arrProduct không phải là props được truyền vào nên sẽ không liên quan gì tới component child
    if (this.props.number != newProps.number) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    console.log('render child');
    return (
      <div>
        <h2>Demo ShouldComponentUpdate</h2>
        <p className="fs-3">{this.props.number}</p>
      </div>
    );
  }
}
