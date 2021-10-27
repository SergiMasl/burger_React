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
        let  toggleStatus = false;

        if (toggleStatus) {
            setTimeout(() => {
                this.setStatus({
                    status: false,
                })
            }, 5000)
        }


      
        return (
            <div>
                <MainInner toggle={this.toggle}/>
                { this.state.status && <Toggole toggle={this.toggle} toggleStatus={toggleStatus}/> }          
            </div>
        )
    }
}

export default Main