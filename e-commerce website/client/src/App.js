import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "reactstrap";

import Landing from "./auth/Landing";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Profile from "./auth/Profile";
import AddProduct from "./admin/AddProduct";
import DeleteProduct from "./admin/DeleteProduct";
import UpdateProduct from "./admin/UpdateProduct";
import Admin from "./admin/Admin";
import Products from "./Products";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cart: [],
      prodCategory: [],
      dataCategory: [],
      total: 0,
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  componentWillUnmount() {
    this.getProducts();
  }

  getProducts = (props = []) => {
    let list = [];
    axios.post("api/products").then((res) => {
      const data = res.data;

      data.forEach((el) => {
        if (el.sizes !== 0 || el.sizem !== 0 || el.sizel !== 0) {
          list.push({
            id: el.id,
            name: el.name,
            category: el.category,
            img: el.img,
            price: el.price,
            iprice: el.iprice,
            sizes: el.sizes,
            sizem: el.sizem,
            sizel: el.sizel,
            gender: el.gender,
          });
        }
      });
      this.setState({ data: list });
    });
  };

  //Add to Cart
  AddToCart = (product, size) => {
    let newCart = this.state.cart;
    var price = 0;
    var total = this.state.total;

    var s = 0;
    var l = 0;
    var m = 0;

    if (size === "s") {
      s = 1;
    } else if (size === "m") {
      m = 1;
    } else {
      l = 1;
    }

    if (product.iprice > 0) {
      price = product.iprice;
    } else {
      price = product.price;
    }

    let addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      if (
        product.sizes - (addedItem.s + s) < 0 ||
        product.sizem - (addedItem.m + m) < 0 ||
        product.sizel - (addedItem.l + l) < 0
      ) {
        alert("stoklarda daha bulunmamaktadır");
      } else {
        addedItem.quantity += 1;
        addedItem.s += s;
        addedItem.m += m;
        addedItem.l += l;
        total += price;
        total = Number(total.toFixed(2));
      }
    } else {
      if (
        (product.sizes === 0 && s === 1) ||
        (product.sizem === 0 && m === 1) ||
        (product.sizel === 0 && l === 1)
      ) {
        alert("stoklarda daha bulunmamaktadır");
      } else {
        newCart.push({
          product: product,
          s: s,
          m: m,
          l: l,
          price: price,
          quantity: 1,
        });
      }
      total += price;
      total = Number(total.toFixed(2));
    }

    this.setState({ cart: newCart, total: total });
  };

  //Delete from cart
  RemoveFromCart = (product) => {
    let newCart = this.state.cart;
    var total = this.state.total;

    let addedItem = newCart.find((c) => c.product.id === product.id);
    if (product.iprice > 0) {
      total -= product.iprice * addedItem.quantity;
    } else {
      total -= product.price * addedItem.quantity;
    }
    newCart = this.state.cart.filter((c) => c.product.id !== product.id);

    total = Number(total.toFixed(2));
    this.setState({ cart: newCart, total: total });
  };

  //reset current cart
  resetCart = () => {
    var resetCart = [];
    var total = 0;
    this.setState({ cart: resetCart, total: total });
  };

  //search for iprice
  prices = (product) => {
    if (product.iprice > 0) {
      return (
        <div className="prices">
          <h6 className="fiyat">{product.price}TL</h6>
          <h6 className="ifiyat">{product.iprice}TL</h6>
        </div>
      );
    } else {
      return (
        <div>
          <h6>{product.price}TL</h6>
        </div>
      );
    }
  };

  takeProduct = (id) => {
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].id == id) {
        return this.state.data[i];
      }
    }
    alert("Gecersiz ID");
  };

  render() {
    return (
      <div>
        <Router>
          <Container>
            <div className="App">
              <Route path="/landing" component={Landing} />
              <div className="container">
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/profile" component={Profile} />
              </div>
            </div>

            <Route
              path="/addProduct"
              render={(props) => <AddProduct {...props} Admin={<Admin />} />}
            />
            <Route
              path="/deleteProduct"
              render={(props) => <DeleteProduct {...props} Admin={<Admin />} />}
            />
            <Route
              path="/updateProduct"
              render={(props) => (
                <UpdateProduct
                  {...props}
                  takeProduct={this.takeProduct}
                  Admin={<Admin />}
                />
              )}
            />

            <Route
              path="/products"
              render={(props) => (
                <Products
                  {...props}
                  AddToCart={this.AddToCart}
                  prices={this.prices}
                  RemoveFromCart={this.RemoveFromCart}
                  data={this.state.data}
                  resetCart={this.resetCart}
                  cart={this.state.cart}
                  total={this.state.total}
                  getProducts={this.getProducts}
                />
              )}
            />
          </Container>
        </Router>
      </div>
    );
  }
}

export default App;
