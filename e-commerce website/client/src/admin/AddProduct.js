import React, { Component } from "react";
import { FormGroup, Label, Input, Button, Form, Row, Col } from "reactstrap";

import axios from "axios";
export default class AddProduct extends Component {
  state = {
    name: "",
    category: 1,
    img: "",
    price: undefined,
    iprice: 0,
    sizes: undefined,
    sizem: undefined,
    sizel: undefined,
    gender: "female",
  };

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({ [name]: value });
  };
  handleSumbit = (event) => {
    event.preventDefault();
    const data = {
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
    if(data.price > data.iprice){
    this.postData(data);
    }
    else{
      alert("normal ucret daha buyuk olmalıdır")
    }
  };

  postData=(data)=>{
    axios
    .post("api/addProduct", data)
    .then(() => console.log("sending"))
    .catch((err) => {
      console.error(err);
    });
  }

  render() {
    return (
      <div>
        {this.props.Admin}
        <Form onSubmit={this.handleSumbit}>
          <FormGroup>
            <Label for="isim">Ürün İsmi</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Ürün İsmi Girin"
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
              placeholder="Kategori Girin"
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
              placeholder="Resim için Url Girin"
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
                    placeholder="Adet Girin"
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
                    placeholder="Adet Girin"
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
                    placeholder="Adet Girin"
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
                    placeholder="Ücret Girin"
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
                    placeholder="Ücret Girin"
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
              placehoder="Cinsiyet seçin"
              onChange={this.handleChange}
              required
            >
              <option value="female">Kadın</option>
              <option value="male">Erkek</option>
            </Input>
          </FormGroup>
          <Button type="submit" color="info" onClick={this.handleSumbit}>
            ekle
          </Button>
        </Form>
      </div>
    );
  }
}
