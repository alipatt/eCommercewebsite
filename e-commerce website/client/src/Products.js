import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import "./Cssfile/Product.css";
import "./Cssfile/PCategory.css";
import { Container, Row, Col, Button, ButtonGroup } from "reactstrap";
import ProductCategory from "./ProductCategory";
import Navi from "./NavBar/Navi";
import Chatbot from "./chatbot/Chatbot";
export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dCategory: [],
      is_visible: false,
      help: false,
      name: [],
    };
  }
  componentDidMount() {
    var scrollComponent = this;
    document.addEventListener("scroll", function(e) {
      scrollComponent.toggleVisibility();
    });

    if (localStorage.usertoken) {
      const token = localStorage.usertoken;
      const decoded = jwt_decode(token);
      var name = [decoded.first_name, decoded.last_name];
      this.setState({
        name,
      });
    }
  }

  toggleVisibility() {
    if (window.pageYOffset > 300) {
      this.setState({
        is_visible: true,
      });
    } else {
      this.setState({
        is_visible: false,
      });
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  help = () => {
    var help = this.state.help;
    if (help === true) {
      help = false;
    } else {
      help = true;
    }
    this.setState({ help: help });
  };

  //Selected categories products add in dCategory state
  applyCategory = (prop, datas) => {
    var dCategory = [];
    var dCategory2 = [];

    datas.map((product) => {
      if (prop.ustgiyim === true && product.category === 1) {
        dCategory.push(product);
      } else if (prop.altgiyim === true && product.category === 3) {
        dCategory.push(product);
      } else if (prop.dısgiyim === true && product.category === 2) {
        dCategory.push(product);
      } else if (prop.evgiyim === true && product.category === 4) {
        dCategory.push(product);
      } else if (
        prop.evgiyim === false &&
        prop.dısgiyim === false &&
        prop.altgiyim === false &&
        prop.ustgiyim === false
      ) {
        dCategory.push(product);
      }
    });

    dCategory.map((product) => {
      if (prop.erkek === true && product.gender === "male") {
        dCategory2.push(product);
      } else if (prop.kadin === true && product.gender === "female") {
        dCategory2.push(product);
      } else if (prop.kadin === false && prop.erkek === false) {
        dCategory2.push(product);
      }
    });

    dCategory = dCategory2;
    dCategory2 = [];

    dCategory.map((product) => {
      if (prop.small === true && product.sizes > 0) {
        dCategory2.push(product);
      } else if (prop.medium === true && product.sizem > 0) {
        dCategory2.push(product);
      } else if (prop.large === true && product.sizel > 0) {
        dCategory2.push(product);
      } else if (
        prop.small === false &&
        prop.medium === false &&
        prop.large === false
      ) {
        dCategory2.push(product);
      }
    });

    dCategory = dCategory2;
    dCategory2 = [];

    dCategory.map((product) => {
      if (product.iprice > 0) {
        var price = product.iprice;
      } else {
        price = product.price;
      }
      if (prop.fiyatbir === true && price < 50) {
        dCategory2.push(product);
      } else if (prop.fiyatiki === true && price >= 50 && price < 100) {
        dCategory2.push(product);
      } else if (prop.fiyatuc === true && price >= 100 && price < 150) {
        dCategory2.push(product);
      } else if (prop.fiyatdort === true && price >= 150 && price < 200) {
        dCategory2.push(product);
      } else if (prop.fiyatbes === true && price > 200) {
        dCategory2.push(product);
      } else if (
        prop.fiyatbir === false &&
        prop.fiyatiki === false &&
        prop.fiyatuc === false &&
        prop.fiyatdort === false &&
        prop.fiyatbes === false
      ) {
        dCategory2.push(product);
      }
    });

    dCategory = dCategory2;

    if (dCategory.length === 0) {
      alert("Seçtiğiniz Kategorilerde Ürün Bulunmamaktadır");
    }
    this.setState({ dCategory: dCategory });
  };

  //All Products return
  allData() {
    return (
      <Row>
        {this.props.data.map((product) => (
          <Col xs="12" sm="6" md="6" lg="4" className="py-3" key={product.id}>
            <div>
              <img
                src={product.img}
                alt={product.name}
                title={product.name}
                className="img"
              />
            </div>
            <p className="itemName">{product.name}</p>
            <div className="price">
              {this.props.prices(product)}
              <ButtonGroup>
                <Button
                  className={
                    product.sizes === 0 ? "disabledButton" : "enableButton"
                  }
                  outline={product.sizes === 0 ? false : true}
                  color={product.sizes === 0 ? "danger" : "success"}
                  onClick={() => this.props.AddToCart(product, "s")}
                  disabled={product.sizes === 0 ? true : false}
                >
                  s
                </Button>
                <Button
                  className={
                    product.sizem === 0 ? "disabledButton" : "enableButton"
                  }
                  outline={product.sizem === 0 ? false : true}
                  color={product.sizem === 0 ? "danger" : "success"}
                  onClick={() => this.props.AddToCart(product, "m")}
                  disabled={product.sizem === 0 ? true : false}
                >
                  m
                </Button>
                <Button
                  className={
                    product.sizel === 0 ? "disabledButton" : "enableButton"
                  }
                  outline={product.sizel === 0 ? false : true}
                  color={product.sizel === 0 ? "danger" : "success"}
                  onClick={() => this.props.AddToCart(product, "l")}
                  disabled={product.sizel === 0 ? true : false}
                >
                  l
                </Button>
              </ButtonGroup>
            </div>
          </Col>
        ))}
      </Row>
    );
  }

  //Selected categories products
  sCategory() {
    return (
      <Row>
        {this.state.dCategory.map((product) => (
          <Col xs="12" sm="6" md="6" lg="4" className="py-3" key={product.id}>
            <div>
              <img
                src={product.img}
                alt={product.name}
                title={product.name}
                className="img"
              />
            </div>
            <p className="itemName">{product.name}</p>
            <div className="price">
              {this.props.prices(product)}
              <ButtonGroup>
                <Button
                  className={
                    product.sizes === 0 ? "disabledButton" : "enableButton"
                  }
                  outline={product.sizes === 0 ? false : true}
                  color={product.sizes === 0 ? "danger" : "success"}
                  onClick={() => this.props.AddToCart(product, "s")}
                  disabled={product.sizes === 0 ? true : false}
                >
                  s
                </Button>
                <Button
                  className={
                    product.sizem === 0 ? "disabledButton" : "enableButton"
                  }
                  outline={product.sizem === 0 ? false : true}
                  color={product.sizem === 0 ? "danger" : "success"}
                  onClick={() => this.props.AddToCart(product, "m")}
                  disabled={product.sizem === 0 ? true : false}
                >
                  m
                </Button>
                <Button
                  className={
                    product.sizel === 0 ? "disabledButton" : "enableButton"
                  }
                  outline={product.sizel === 0 ? false : true}
                  color={product.sizel === 0 ? "danger" : "success"}
                  onClick={() => this.props.AddToCart(product, "l")}
                  disabled={product.sizel === 0 ? true : false}
                >
                  l
                </Button>
              </ButtonGroup>
            </div>
          </Col>
        ))}
      </Row>
    );
  }

  render() {
    return (
      <div>
        <Container>
          <Navi
            cart={this.props.cart}
            RemoveFromCart={this.props.RemoveFromCart}
            AddToCart={this.props.AddToCart}
            resetCart={this.props.resetCart}
            total={this.props.total}
            getProducts={this.props.getProducts}
            help={this.help}
            name={this.state.name}
          />
          <Row>
            <Col xs="12" sm="12" md="2" lg="2">
              <ProductCategory
                applyCategory={this.applyCategory}
                data={this.props.data}
              />
            </Col>

            <Col xs="12" sm="12" md="10" lg="10">
              {this.state.dCategory.length > 0
                ? this.sCategory()
                : this.allData()}
            </Col>
          </Row>
        </Container>
        <div>{this.state.help && <Chatbot />}</div>

        <div className="scrollbutton">
          {this.state.is_visible && (
            <button
              type="button"
              className="btn btn-light"
              onClick={() => this.scrollToTop()}
            >
              <svg
                className="bi bi-box-arrow-in-up"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 7.854a.5.5 0 00.708 0L8 5.207l2.646 2.647a.5.5 0 00.708-.708l-3-3a.5.5 0 00-.708 0l-3 3a.5.5 0 000 .708z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M8 15a.5.5 0 00.5-.5v-9a.5.5 0 00-1 0v9a.5.5 0 00.5.5z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M1.5 2.5A1.5 1.5 0 013 1h10a1.5 1.5 0 011.5 1.5v8A1.5 1.5 0 0113 12h-1.5a.5.5 0 010-1H13a.5.5 0 00.5-.5v-8A.5.5 0 0013 2H3a.5.5 0 00-.5.5v8a.5.5 0 00.5.5h1.5a.5.5 0 010 1H3a1.5 1.5 0 01-1.5-1.5v-8z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
}
