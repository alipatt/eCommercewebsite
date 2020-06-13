import React, { Component } from "react";
import {} from "reactstrap";
import "../Cssfile/Admin.css";
import "../Cssfile/Sidebar.css";
export default class Admin extends Component {
  render() {
    return (
      <div id="mySidenav" className="sidenav ortala">
        <a href="/addProduct" id="add">
          Ürün Ekle
        </a>
        <a href="/updateProduct" id="upgrade">
          Güncelle
        </a>
        <a href="/deleteProduct" id="delete">
          Ürün Sil
        </a>
        <a href="/landing" id="menu">
          Ana menü
        </a>
      </div>
    );
  }
}
