import React, { Component } from 'react';
import QuestionBlock from './QuestionBlock.js';
import Phone from './Phone.js'
import FinalBlock from './FinalBlock.js'
import Loader from './Loader.js'

class Popup extends Component {
    constructor() {
        super();
        this.state = {
            questions: [],
            currentIndex: 0,
            phone: '',
            values: {},
            isLoading: true
        }
    }  
    
    componentDidMount() {

        fetch('http://localhost:5000/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            if (response.ok) { 
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then((data)=>{
            let valuesForState = {}
            data.forEach((item) => { 
                item.answers.forEach((arg) => {
                    valuesForState[arg.name] = false
                })    
            })
            // this.setState({
            //     isLoading: false,
            // })
        })
        .catch((error)=> {
            console.dir(error)
            this.setState({
                isLoading: false,
            })
            alert('error', error)
        })
        
    }
    

    btmNext = () => {
        const nextIndex = this.state.currentIndex + 1
        
        this.setState({
            currentIndex: nextIndex, 
        })
    }

    btmPrev = () => {
        const prevIndex = this.state.currentIndex - 1
        this.setState({
            currentIndex: prevIndex,
        })
    }

    checkPhone = (e) => {
        this.setState({
            phone: e
        })
    }

    sendOrder = () => {
        const order = [];
        const ingr = this.getOrder()
        order.push({client: [this.state.phone]}, 
            {ingredients: ingr}, 
            {cost: this.getCostOfOrder(ingr)},
        );

        fetch("http://localhost:5000/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then((response) => {
            if (response.ok) {
                console.log('success', 'Your order is complite')
                return response.json();
            } else {
                alert('error', `${response.status}: ${response.statusText}`)
            }
        })
        .catch(error => {

            console.dir(error)
        })

   }

    send = () => {
        this.sendOrder()
        this.btmNext();
        this.props.onSubmit()
        
    }

    handleOrder = (newValues) => {
        this.setState({
            values: {
                ...this.state.values, 
                ...newValues
            } 
        })
    }

    getOrder = () => {
        let results = []
        for (let elem in this.state.values) {
            this.state.values[elem] === true && results.push(elem)     
        }

        return results;
    }

    getCostOfOrder = (totalOreder) => {
        let preCost = 0
        totalOreder.forEach((arg) => {
            this.state.questions.forEach((arg2) =>{
                arg2.answers.forEach((arg3) => {
                    if (arg === arg3.name){
                        preCost = preCost + +arg3.price
                    }
                })
             })
        })
        return preCost.toFixed(2)
    }

    render() {
        if (this.state.isLoading) {
            return <Loader />
        }
        
        const {currentIndex} = this.state
        let currentQuestion = this.state.questions[currentIndex];
   
        let totalOreder = [];
        let totalCost = 0;
        
        if (currentIndex === this.state.questions.length - 2) {
            totalOreder = this.getOrder();
            totalCost = this.getCostOfOrder(totalOreder);        
        }

        return (
            <div className="modal d-block" tabIndex="-1" role="dialog" id="modal-block" >
                <div className="modal-dialog  modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Choose your burger:</h5>
                            <button 
                                type="button" 
                                className="close"   
                                data-dismiss="modal" 
                                aria-label="Close" 
                                id="closeModal" 
                                onClick={() => this.props.toggle(false)}>
                                <span aria-hidden="true">x</span>
                            </button>
                        </div>                  
                       
                        {currentQuestion.component === "question"
                            && <QuestionBlock 
                                    currentQuestion={currentQuestion} 
                                    handleOrder={this.handleOrder}
                                    values={this.state.values}
                        /> }

                        {currentQuestion.component === "phone"
                            && <Phone 
                                totalOreder={totalOreder} 
                                checkPhone={this.checkPhone}
                                totalCost={totalCost}
                             /> 
                        }
                        {currentQuestion.component === "final" && <FinalBlock title={currentQuestion.title}/> }
                          
                        <div className="modal-footer" id="modalFooter">
                            {(currentIndex > 0 && currentIndex < this.state.questions.length - 2 )
                                && <button type="button" className="btn btn-secondary" data-dismiss="modal" id="prev" onClick={this.btmPrev}>Prev</button>
                            }
                            {(currentIndex === 0 || currentIndex < this.state.questions.length - 2 )
                                && <button type="button" className="btn btn-secondary" data-dismiss="modal" id="next" onClick={this.btmNext}>Next</button>
                            }
                            {(currentQuestion.component === "phone") 
                                && <button type="button" className="btn btn-primary sendBtn" id="send" onClick={this.send}>Send</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Popup