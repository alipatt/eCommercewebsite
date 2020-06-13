import React, { Component } from 'react'
import Navbar from "./Navbar"
class Landing extends Component {
  render() {
    return (
      <div><Navbar/>
      <div className="container">

        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">WELCOME</h1>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default Landing
