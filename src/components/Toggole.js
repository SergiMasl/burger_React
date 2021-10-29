import React, { Component } from 'react';
import questions from '../questions.json';
import QuestionBlock from './QuestionBlock.js';


class Toggole extends Component {
    constructor() {
        super();
        this.state = {
            status: false,
            finalAnswers: [],
            currentIndex: 0,
            title: '',
            finishLable: false,
            phone: '',
            values: {},
            totalNames: ["Standert", "Chicken", "Tomato", "Salad", "Garlic_sauce"],  //нужно получить из checkOrder
            finalCost: 0,  //нужно получить из totalCost
        }
    }  
    
    componentDidMount() {
        let valuesForState = {}
        questions.forEach((item) => { 
            item.answers.map((arg) => {
                valuesForState[arg.name] = false
            })    
        })
        this.setState({
            values: valuesForState,
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
        order.push({client: [this.state.phone]}, {ingredients: [this.state.totalNames]}, {cost: [this.state.finalCost]})
        //console.log(order)
        console.log('dd')
        fetch("http://localhost:5000/ ", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then((response) => {
            if (response.ok) {
                alert('success', 'Your order is in work')
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
        this.setState({
            finishLable: true,
        })
    }

    handleOrder = (newValues) => {
        this.setState({
            values: {
                ...this.state.values, 
                ...newValues
            } 
        })
    }

    checkOrder = () => {
        let results = []
        for (let elem in this.state.values) {
            this.state.values[elem] === true && results.push(elem)     
        }
        // this.setState({
        //     totalNames: results,
        // }) 
    }

    totalCost = () => {
        let preCost = 0
        this.state.totalNames.map((arg) => {
             questions.map((arg2) =>{
                arg2.answers.map((arg3) => {
                    if (arg === arg3.name){
                        preCost = preCost + +arg3.price
                    }
                })
             })
        })
        console.log(preCost.toFixed(2))
        // this.setState({
        //     finalCost: preCostto.Fixed(2),
        // })
    }

    render() {
        console.log(this.state);
        let propIndex = this.state.currentIndex
        let currentQuestion = questions[propIndex];

        const answers = currentQuestion.answers;           
        const title = currentQuestion.question;
        let type = currentQuestion.type;

        let phone = false;
        let btnPrev = null; 
        let btnSend = null; 
        let btnNext = null;

        propIndex === 0 || propIndex < questions.length - 2 ?
            btnNext = <button type="button" className="btn btn-secondary" data-dismiss="modal" id="next" onClick={this.btmNext}>Next</button>
            : btnNext = null

            propIndex > 0 && propIndex < questions.length - 2 ?
            btnPrev = <button type="button" className="btn btn-secondary" data-dismiss="modal" id="prev" onClick={this.btmPrev}>Prev</button>
            : btnPrev = null
        
        if (propIndex === questions.length - 2) {
            phone = true;
            btnSend = <button type="button" className="btn btn-primary sendBtn" id="send" onClick={this.send}>Send</button>
        }
        
        if (propIndex === questions.length - 1) {
            phone = null;
            btnSend = null;
        }

        const renderQuestions = propIndex >= 0 
            && propIndex <= questions.length 
            && <QuestionBlock 
                    currentQuestion={currentQuestion} 
                    phone={phone} 
                    finishLable={this.state.finishLable} 
                    toggleStatus={this.props.toggleStatus}
                    type={type}
                    handleOrder={this.handleOrder}
                    checkPhone={this.checkPhone}
                    values={this.state.values}
                    checkOrder={this.checkOrder}
                    totalNames={this.state.totalNames}
                    totalCost={this.totalCost}
                    finalCost={this.state.finalCost}
                    /> 
                    
        return (
            <div className="modal d-block" tabindex="-1" role="dialog" id="modal-block" >
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
                       
                        {renderQuestions}

                        <div className="modal-footer" id="modalFooter">
                            {btnPrev}
                            {btnNext}
                            {btnSend}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Toggole