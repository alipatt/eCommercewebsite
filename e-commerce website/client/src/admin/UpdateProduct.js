import React, { Component } from "react";
import { FormGroup, Label, Input, Button, Form, Row, Col } from "reactstrap";
import axios from "axios";
export default class UpdateProduct extends Component {
  state = {
    id: 0,
    name: "",
    category: 1,
    img: "",
    price: undefined,
    iprice: 0,
    sizes: undefined,
    sizem: undefined,
    sizel: undefined,
    gender: "",
    prod: false,
    img2: "",
  };

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({ [name]: value });
  };
  handleSumbit = (event) => {
    event.preventDefault();

    const data = {
      id: this.state.id,
      name: this.state.name,
      category: this.state.category,
      img: this.state.img,
      price: this.state.price,
      iprice: this.state.iprice,
      sizes: this.state.sizes,
      sizem: this.state.sizem,
      sizel: this.state.sizel,
      gender: this.state.gender,
    };
    axios
      .post("api/updateProduct", data)
      .then(() => console.log("sending"))
      .catch((err) => {
        console.error(err);
      });
  };

  onHandleSumbit = (event) => {
    event.preventDefault();
    const product = this.props.takeProduct(this.state.id);
    console.log(product)
    if (product) {
      this.setState({
        name: product.name,
        category: product.category,
        img: product.img,
        price: product.price,
        iprice: product.iprice,
        sizes: product.sizes,
        sizem: product.sizem,
        sizel: product.sizel,
        gender: product.gender,
        prod: true,
        img2: product.img,
      });
    }
  };
  bringProduct() {
    return (
      <div>
        <Form onSubmit={this.onHandleSumbit}>
          <FormGroup>
            <Label for="id">ID</Label>
            <Input
              type="text"
              name="id"
              id="id"
              placeholder="ID Girin"
              onChange={this.handleChange}
              required
            ></Input>
          </FormGroup>
          <Button type="submit" onClick={this.onHandleSumbit}>
            Urunu getir
          </Button>
        </Form>
      </div>
    );
  }

  updateData() {
    return (
      <div>
        
        <div className=" col-xs-12 col-sm-12 col-md-12 col-lg-12 py-3">
          <img
            src={this.state.img2}
            alt={this.state.img2}
            style={{ height: "50%", width: "50%" }}
          />
        </div>
        <Form onSubmit={this.handleSumbit}>
          <FormGroup>
            <Label for="isim">Ürün İsmi</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder={this.state.name}
              onChange={this.handleChange}
              required
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="kategori">Kategori</Label>
            <Input
              type="select"
              name="category"
              id="category"
              placeholder={this.state.category}
              onChange={this.handleChange}
              required
            >
              <option value="1">Üst Giyim</option>
              <option value="2">Dış Giyim</option>
              <option value="3">Alt Giyim</option>
              <option value="4">Ev Giyim</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="resim">Resim</Label>
            <Input
              type="textarea"
              name="img"
              id="img"
              placeholder={this.state.img}
              onChange={this.handleChange}
              required
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="city">Boyutlar</Label>
            <Row>
              <Col xs="12" sm="3" md="3" lg="3">
                <Label for="sizes">
                  Small
                  <Input
                    type="number"
                    id="sizes"
                    name="sizes"
                    placeholder={this.state.sizes}
                    onChange={this.handleChange}
                    required
                  />
                </Label>
              </Col>
              <Col xs="12" sm="3" md="3" lg="3">
                <Label for="sizem">
                  Medium
                  <Input
                    type="number"
                    id="sizem"
                    name="sizem"
                    placeholder={this.state.sizem}
                    onChange={this.handleChange}
                    required
                  />
                </Label>
              </Col>
              <Col xs="12" sm="3" md="3" lg="3">
                <Label for="sizel">
                  Large
                  <Input
                    type="number"
                    id="sizel"
                    name="sizel"
                    placeholder={this.state.sizel}
                    onChange={this.handleChange}
                    required
                  />
                </Label>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Label for="fiyatlar">Fiyatlar</Label>
            <Row>
              <Col xs="12" sm="3" md="3" lg="3">
                <Label for="ucret">
                  Ücret
                  <Input
                    type="number"
                    id="price"
                    name="price"
                    placeholder={this.state.price}
                    onChange={this.handleChange}
                    required
                  />
                </Label>
              </Col>
              <Col xs="12" sm="3" md="3" lg="3">
                <Label for="iucret">
                  İndirimli Ücret
                  <Input
                    type="number"
                    id="iprice"
                    name="iprice"
                    placeholder={this.state.iprice}
                    onChange={this.handleChange}
                  />
                </Label>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Label for="cinsiyet">Cinsiyet</Label>
            <Input
              type="select"
              id="gender"
              name="gender"
              placehoder={this.state.gender}
              onChange={this.handleChange}
              required
            >
              <option value="female">Kadın</option>
              <option value="male">Erkek</option>
            </Input>
          </FormGroup>
          <Button type="submit" color="info" onClick={this.handleSumbit}>
            guncelle
          </Button>
        </Form>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.props.Admin}
        {this.state.prod === false ? this.bringProduct() : this.updateData()}
      </div>
    );
  }
}
