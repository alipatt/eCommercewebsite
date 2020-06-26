import React, { Component } from "react";
import { Form, Input, FormGroup, Label, Row, Col, Button } from "reactstrap";
import "./Cssfile/PCategory.css";
export default class ProductCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ustgiyim: false,
      altgiyim: false,
      dısgiyim: false,
      evgiyim: false,
      erkek: false,
      kadin: false,
      small: false,
      medium: false,
      large: false,
      fiyatbir: false,
      fiyatiki: false,
      fiyatuc: false,
      fiyatdort: false,
      fiyatbes: false,
    };

    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSumbit = this.onHandleSumbit.bind(this);
  }

  onHandleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  onHandleSumbit = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="py-4 ">
        <Form onSubmit={this.onHandleSumbit}>
          <Row>
          <Col xs="12" sm="3" md="12" lg="12">
              <FormGroup>
                <Label for="cinsiyet" className="cName">
                  Cinsiyet
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    id="erkek"
                    name="erkek"
                    value="false"
                    type="checkbox"
                    onChange={this.onHandleChange}
                  />{" "}
                  Erkek
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    id="kadin"
                    name="kadin"
                    value="kadin"
                    type="checkbox"
                    onChange={this.onHandleChange}
                  />{" "}
                  Kadın
                </Label>
                {/* <Button onClick={this.click}>sad</Button>  */}
              </FormGroup>
            </Col>
            <Col xs="12" sm="3" md="12" lg="12">
              <FormGroup>
                <Label for="kategori" className="cName">
                  Kategori
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    id="ustgiyim"
                    name="ustgiyim"
                    value="false"
                    type="checkbox"
                    onChange={this.onHandleChange}
                  />{" "}
                  Üst Giyim
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    id="altgiyim"
                    name="altgiyim"
                    value="false"
                    type="checkbox"
                    onChange={this.onHandleChange}
                  />{" "}
                  Alt Giyim
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    id="dısgiyim"
                    name="dısgiyim"
                    value="false"
                    type="checkbox"
                    onChange={this.onHandleChange}
                  />{" "}
                  Dış Giyim
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    id="evgiyim"
                    name="evgiyim"
                    value="false"
                    type="checkbox"
                    onChange={this.onHandleChange}
                  />{" "}
                  Ev Giyim
                </Label>
              </FormGroup>
            </Col>
            
            <Col xs="12" sm="3" md="12" lg="12">
              <FormGroup>
                <Label for="beden" className="cName" check>
                  Beden
                </Label>
              </FormGroup>

              <FormGroup>
                <Label check>
                  <Input
                    value="small"
                    name="small"
                    id="small"
                    type="checkbox"
                    onChange={this.onHandleChange}
                  />{" "}
                  Small
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    value="medium"
                    name="medium"
                    id="medium"
                    type="checkbox"
                    onChange={this.onHandleChange}
                  />{" "}
                  Medium
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    value="large"
                    name="large"
                    id="large"
                    type="checkbox"
                    onChange={this.onHandleChange}
                  />{" "}
                  Large
                </Label>
              </FormGroup>
            </Col>
            <Col xs="12" sm="3" md="12" lg="12">
              <FormGroup>
                <Label for="fiyat" className="cName">
                  Fiyat
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    name="fiyatbir"
                    id="fiyatbir"
                    type="checkbox"
                    value="fiyatbir"
                    onChange={this.onHandleChange}
                  />{" "}
                  0-49.99
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    name="fiyatiki"
                    id="fiyatiki"
                    type="checkbox"
                    value="fiyatiki"
                    onChange={this.onHandleChange}
                  />{" "}
                  50-99.9
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    name="fiyatuc"
                    id="fiyatuc"
                    type="checkbox"
                    value="fiyatuc"
                    onChange={this.onHandleChange}
                  />{" "}
                  100-149.99
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    name="fiyatdort"
                    id="fiyatdort"
                    type="checkbox"
                    value="fiyatdort"
                    onChange={this.onHandleChange}
                  />{" "}
                  150-199.99
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    name="fiyatbes"
                    id="fiyatbes"
                    type="checkbox"
                    value="fiyatbes"
                    onChange={this.onHandleChange}
                  />{" "}
                  200+
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Button
              type="submit"
              onClick={() =>
                this.props.applyCategory(this.state, this.props.data)
              }
              color="info"
            >
              Filtrele
            </Button>
          </Row>
        </Form>
      </div>
    );
  }
}
