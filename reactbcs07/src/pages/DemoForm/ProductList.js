import React, { Component, createRef } from 'react';
import FormProduct from './FormProduct';

export default class ProductList extends Component {
  constructor() {
    super();
    // tạo ra một thuộc tính ref
    this.ref = createRef();
  }

  state = {
    arrProduct: [],
  };

  // phương thức thêm sản phẩm vào arrProduct
  themSanPham = (sanPham) => {
    let newArrrProduct = [...this.state.arrProduct];
    newArrrProduct.push(sanPham);
    // setState để thay đổi giá trị bên trong state
    console.log(newArrrProduct);
    this.setState({
      arrProduct: newArrrProduct,
    });
  };

  xoaSanPham = (id) => {
    // dùng findIndex để tìm kiếm vị trí index của sản phẩm trong mảng
    let index = this.state.arrProduct.findIndex((item) => item.id == id);
    // index = -1, index = vị trí
    if (index != -1) {
      let newArrProduct = [...this.state.arrProduct];
      newArrProduct.splice(index, 1);
      this.setState({
        arrProduct: newArrProduct,
      });
    }
  };

  layThongTinSanPham = (id) => {
    // dùng find để tìm ra sản phẩm
    let sanPham = this.state.arrProduct.find((item) => item.id == id);
    // find tìm được thì sẽ trả về phần tử cần tìm, find không tìm được thì find sẽ trả về undifined

    // sử dụng this.ref.current giúp gọi ra các thuộc tính phương thức nằm trong component đang được gán ref, cụ thể là component FormProduct
    // console.log(this.ref.current.state);
    this.ref.current.setState({
      ...this.ref.current.state,
      values: sanPham,
    });
    // this.ref.current.focus()
    // gọi tới setState của component con và set sanPham vào
    // TH1: dùng this.ref.current gọi tới setState của component con và gán sanPham vào
  };

  capNhatSanPham = (sanPham) => {
    let index = this.state.arrProduct.findIndex(
      (item) => item.id == sanPham.id
    );
    if (index !== -1) {
      let newArr = [...this.state.arrProduct];
      console.log(index);
      newArr[index] = sanPham;
      this.setState({
        arrProduct: newArr,
      });
    }
  };

  render() {
    return (
      <div>
        <h1>Create Product</h1>
        {/* bs5-card-background  */}
        <div className="container">
          <FormProduct
            ref={this.ref}
            themSanPham={this.themSanPham}
            // truyền sản phẩm tìm được theo props
            sanPham={this.state.sanPham}
            capNhatSanPham={this.capNhatSanPham}
          />
          <div>
            <table className="table" cellPadding={20}>
              <thead className="bg-dark text-white">
                <th>Id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Type</th>
                <th>Action</th>
              </thead>
              <tbody>
                {this.state.arrProduct.map((item, index) => {
                  const { id, image, name, productType, price, descript } =
                    item;
                  return (
                    <tr key={index}>
                      <td>{id}</td>
                      <td>
                        <img src={image} alt="" />
                      </td>
                      <td>{name}</td>
                      <td>{price}</td>
                      <td>{descript}</td>
                      <td>{productType}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            this.xoaSanPham(id);
                          }}
                        >
                          Xoá
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            this.layThongTinSanPham(id);
                          }}
                        >
                          Sửa
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
