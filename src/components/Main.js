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

    toggleStatus = () => {
        setTimeout(() => {
            this.setStatus({
                status: false,
            })
        }, 3000)
    }


    render() {


      
        return (
            <div>
                <MainInner toggle={this.toggle}/>
                { this.state.status && <Toggole toggle={this.toggle} toggleStatus={this.toggleStatus}/> }          
            </div>
        )
    }
}

export default Main