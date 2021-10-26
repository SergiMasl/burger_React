import React, { Component } from 'react';
import MainInner from './MainInner.js'
import Toggole from './Toggole.js'


class Main extends Component {
    constructor() {
        super();
        this.state = {
            status: false,
        }
    }

    toggle = (arg) => {
        arg ? this.setState({
            status: true,
        }) : this.setState({
            status: false,
        }) 
    }

    render() {
      
        return (
            <div>
                <MainInner toggle={this.toggle}/>
                { this.state.status && <Toggole toggle={this.toggle}/> }          
            </div>
        )
    }
}

export default Main