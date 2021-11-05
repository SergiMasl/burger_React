import React, { Component } from 'react';
import MainInner from './MainInner.js'
import Popup from './Popup.js'


class Main extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
        }
    }

    toggle = (arg) => {
        this.setState({
            isOpen: arg,
        })
    }

    onSubmit = () => {
        setTimeout(() => {
            this.setState({
                isOpen: false,
            })
        }, 2000)
    }


    render() {

        return (
            <div>
                <MainInner toggle={this.toggle}/>
                { this.state.isOpen && <Popup toggle={this.toggle} onSubmit={this.onSubmit}/> }          
            </div>
        )
    }
}

export default Main