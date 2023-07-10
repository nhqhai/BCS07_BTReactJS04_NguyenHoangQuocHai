import axios from 'axios';
import React, { Component, PureComponent } from 'react';

// PureComponent được lấy từ react
// PureComponent tự động xác định các props được truyền xuống component có thay đổi hay không để quyết định việc render lại giao diện, nếu có thay đổi sẽ cho component render lại và ngược lại là không render nếu props không thay đổi
// PureComponent có thể sử dụng cho các giao diện tĩnh, không nhận các props: vd như Footer....
export default class Child extends Component {
  constructor(props) {
    super();
    this.state = {
      numberChild: 1,
      product: {},
      id: '',
    };
    console.log('constructor child');
  }

  componentDidMount() {
    console.log('componentDidMount child');
  }

  // shouldComponentUpdate(newProps, newState) {
  //   console.log('props', this.props);
  //   console.log('newProps', newProps);
  //   // Mình sẽ check nếu như người dùng bấm vào nút Lấy sản phẩm để lấy dữ liệu cho arrProduct thì sẽ không render lại vì arrProduct không phải là props được truyền vào nên sẽ không liên quan gì tới component child
  //   if (this.props.number != newProps.number) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  static getDerivedStateFromProps(newProps, currentState) {
    let url = window.location.href.split('/'); // http://localhost:3000/detail/5  ["http:","","localhost3000","detail","5"]
    const id = url[url.length - 1];
    return {
      ...currentState,
      id,
    };
  }

  /** ComponentDidUpdate chạy sau khi component render lại giao diện
   * Ứng dụng của componentDidUpdate giúp check các dữ liệu từ state và props có thay đổi hay không để xử lí tiếp các hành động tiếp theo
   * Ở phiên bản router dom v5, lấy params bằng cách gọi this.props.match.params nên có thể check trong componentDidUpdate và xử lí gọi dữ liệu mới
   * @param {*} prevProps : Props trước
   * @param {*} prevState : State trước
   */
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
    console.log(prevProps);
    console.log(this.props.number);
    console.log(prevState);
    //
    console.log(prevState.id !== this.state.id);
    if (prevState.id !== this.state.id) {
      console.log('Số đã thay đổi');
      // gọi dữ liệu giày ứng với số thay đổi
      this.getProductById(this.state.numberChild);
    }
  }

  getProductById = async (id) => {
    let res = await axios({
      method: 'GET',
      url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
    });
    console.log(res);
    this.setState({
      ...this.state,
      product: res.data.content,
    });
  };

  render() {
    console.log('render child');
    const { name, price, image } = this.state.product;
    return (
      <div>
        <h2>Demo ShouldComponentUpdate</h2>
        <p className="fs-3">{this.props.number}</p>
        <p>{this.props.thongTin.hoTen}</p>
        <div className="container">
          <h3>Demo về componentDidUpdate</h3>
          <p>{this.state.numberChild}</p>
          <button
            onClick={() => {
              this.setState({
                numberChild: this.state.numberChild + 1,
              });
            }}
            className="btn btn-success"
          >
            Tăng 1 điểm
          </button>
          <div className="row">
            <div className="col-4">
              <img src={image} alt="" />
              <p>{name}</p>
              <p>{price}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
