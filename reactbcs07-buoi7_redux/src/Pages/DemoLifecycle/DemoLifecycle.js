import React, { Component } from 'react';
import Child from './Child';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
export default class DemoLifecycle extends Component {
  constructor(props) {
    super();
    this.state = {
      login: '',
      arrProduct: [],
      number: 1,
      thongTinNguoiDung: {
        hoTen: 'Khanh',
      },
    };
    console.log('constructor');
  }

  getAllProduct = async () => {
    // gọi dữ liệu từ server
    let res = await axios({
      method: 'Get',
      url: 'https://shop.cyberlearn.vn/api/Product',
    });
    console.log(res.data.content);
    this.setState({
      ...this.state,
      arrProduct: res.data.content,
    });
  };

  /** getDerivedStateFromProps giúp can thiệp vào state và props trước quá trình render lên giao diện
   *
   * @param {*} newProps : props trước khi render
   * @param {*} currentState : là state ngay trước thời điểm render
   * @returns
   */
  static getDerivedStateFromProps(newProps, currentState) {
    // console.log(this);
    console.log('getDerivedStateFromProps');
    // console.log(currentState);
    // this.getAllProduct();
    // let res = await axios({
    //   method: 'Get',
    //   url: 'https://shop.cyberlearn.vn/api/Product',
    // });
    // return (currentState = {
    //   ...currentState,
    //   arrProduct: res.data.content,
    // });

    // Đó là check nếu như dưới local store có dữ liệu userLogin thì sẽ hiển thị lên giao diện cho người dùng
    console.log(localStorage.getItem('userLogin'));
    if (localStorage.getItem('userLogin')) {
      let userLogin = localStorage.getItem('userLogin');
      return (currentState = {
        ...currentState,
        login: userLogin,
      });
    }
  }

  componentDidMount() {
    // ComponentDidMount sẽ chạy sau khi phương thức render chạy xong
    // Trong componentDidMount thường sẽ chạy phương thức gọi dữ liệu từ server để hiển thị lên giao diện cho người dùng
    console.log('componentDidMount');
    this.getAllProduct();

    // chạy setInterval
    this.capNhatTinTuc();
  }

  // tôi có nên update lại k ?
  // shouldComponentUpdate sẽ chạy khi updating nghĩa là khi có state hoặc props(nhận vào state) thay đổi, shouldComponentUpdate sẽ nhận vào giá trị true hoặc false tuỳ thuộc vào việc chúng ta có muốn render lại giao diện hay không
  shouldComponentUpdate(newProps, newState) {
    // khi xử lí trả về 2 giá trị : true (component được phép update lại), false (ngăn component update)
    console.log('shouldComponentUpdate');
    return true;
  }

  capNhatTinTuc = () => {
    // con trỏ this
    this.demoInterval = setInterval(() => {
      console.log('Cập nhật mới');
    }, [3000]);
  };

  // ComponentWillUnmount chạy sau khi component bị xoá bỏ, ở đây có nghĩa là component không hiển thị trên giao diện
  componentWillUnmount() {
    console.log('componentWillUnmount');
    // alert('Tôi đi nhé chào tạm biệt');

    // clearInterval giúp xoá đi setInterval đang hoạt động, khi xoá truyền id của setInterval có thể dùng một biến để gán setInterval và gọi tên biến đó trong hàm clear
    clearInterval(this.demoInterval);
  }

  render() {
    console.log('render');
    console.log(this.state);
    return (
      <div>
        <h2>Demo LifeCycle</h2>
        <p>{this.state.login}</p>
        <Child
          number={this.state.number}
          // object
          thongTin={this.state.thongTinNguoiDung}
        />
        <button
          onClick={() => {
            //shalow compare
            // ở đây khi gọi tới state để thay đổi dữ liệu nhưng state của chúng ta là một Object, nếu không clone ra trước sẽ gặp một vấn đề liên quan về tham chiếu, lúc này PureComponent sẽ không xác định được props đó đã thay đổi hay chưa nên sẽ bị lỗi cập nhật
            // let newThongTin =this.state.thongTinNguoiDung;
            // đây là một object mới
            let newThongTin = { ...this.state.thongTinNguoiDung };
            newThongTin.hoTen = 'Long';
            this.setState({
              // ...this.state,
              thongTinNguoiDung: newThongTin,
            });
          }}
          className="btn btn-warning"
        >
          Đổi tên
        </button>
        <button
          onClick={() => {
            this.setState({
              ...this.state,
              number: this.state.number + 1,
            });
          }}
          className="btn btn-dark"
        >
          Nhấn em đi
        </button>
        <div className="container">
          <button onClick={this.getAllProduct} className="btn btn-dark">
            Lấy sản phẩm
          </button>
          <div className="row">
            {this.state.arrProduct.map((item, index) => {
              // console.log(item);
              const { image, name, price, id } = item;
              return (
                <div className="col-4" key={index}>
                  <div className="card">
                    <img src={image} alt="" />
                    <div className="card-body">
                      {/* // name , gia tien  */}
                      <h3>{name}</h3>
                      <p>{price}</p>
                      <NavLink
                        to={`/lifecycle/${id}`}
                        className="btn btn-danger"
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            number: this.state.number + 1,
                          });
                        }}
                      >
                        Get Detail
                      </NavLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
