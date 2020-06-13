import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  NavLink,
  NavItem,
} from "reactstrap";
import axios from "axios";
export default class NaviCart extends Component {
  //buy it
  buyIt = () => {
    

    var cartItems = [];
    this.props.cart.forEach((cartItem) => {
      console.log(cartItem);
      var sizes = cartItem.product.sizes - cartItem.s;
      var sizem = cartItem.product.sizem - cartItem.m;
      var sizel = cartItem.product.sizel - cartItem.l;
      var data = {
        id: cartItem.product.id,
        name: cartItem.product.name,
        category: cartItem.product.category,
        img: cartItem.product.img,
        price: cartItem.product.price,
        iprice: cartItem.product.iprice,
        sizes: sizes,
        sizem: sizem,
        sizel: sizel,
        gender: cartItem.product.gender,
      };
      cartItems.push(data);
    });
    
    if(this.props.name[0] !== undefined){
      this.reduceFromData(cartItems);
    }
    else{
      alert("Satın almanız için giriş yapmanız gereklidir")
    }

  };


  reduceFromData=(cartItems)=>{
    axios
    .post("api/buy", cartItems)
    .then(() => console.log("sending"))
    .catch((err) => {
      console.error(err);
    });

    alert(
      "Toplam fiyat = " +
        this.props.total +
        `\n Satın alımınız için teşekkürler ${this.props.name[0] +" "+  this.props.name[1]}`
    );

  window.location.reload();
  }

  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Your Cart
        </DropdownToggle>
        <DropdownMenu>
          {this.props.cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}>
              <Badge
                color="danger"
                onClick={() => this.props.RemoveFromCart(cartItem.product)}
                className="px-2"
              >
                X
              </Badge>
              {cartItem.product.name}
              <Badge color="info">s*{cartItem.s}</Badge>
              <Badge color="info">m*{cartItem.m}</Badge>
              <Badge color="info">l*{cartItem.l}</Badge>
              {" = "}
              {Number((cartItem.price * cartItem.quantity).toFixed(2))}
            </DropdownItem>
          ))}
          <DropdownItem divider />
          <DropdownItem onClick={this.props.resetCart}>Reset Cart</DropdownItem>
          <DropdownItem onClick={() => this.buyIt()}>
            Satın al = {this.props.total}
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  emptySummary() {
    return (
      <NavItem>
        <NavLink>Empty Cart</NavLink>
      </NavItem>
    );
  }

  render() {
    return (
      <div>
        {this.props.cart.length > 0
          ? this.renderSummary()
          : this.emptySummary()}
      </div>
    );
  }
}
