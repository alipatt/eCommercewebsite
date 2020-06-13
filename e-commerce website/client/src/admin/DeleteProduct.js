import React, { Component } from "react";
import { FormGroup, Label, Input, Form, Button } from "reactstrap";
import axios from "axios";
export default class DeleteProduct extends Component {
  state = {
    id: "",
  };

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({ [name]: value });
  };
  handleSumbit = (event) => {
    event.preventDefault();
    const data = {
      id:this.state.id
    };
    axios
      .post("api/deleteProduct", data)
      .then(() => console.log("sending"))
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    return (
      <div>
        {this.props.Admin}
        <Form onSubmit={this.handleSumbit}>
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
          <Button type="submit" color="info" onClick={this.handleSumbit}>
            Sil
          </Button>
        </Form>
      </div>
    );
  }
}
