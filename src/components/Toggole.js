import React, { Component } from 'react';
import QuestionBlock from './QuestionBlock.js';
import Phone from './Phone.js'
import FinalBlock from './FinalBlock.js'



class Toggole extends Component {
    constructor() {
        super();
        this.state = {
            questions: [],
            status: false,
            finalAnswers: [],
            currentIndex: 0,
            title: '',
            phone: '',
            values: {},
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
            this.setState({
                questions: data,
                values: valuesForState,
            })
        })
        .catch((error)=> {
            console.dir(error)
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
        const ingr = this.checkOrder()
        order.push({client: [this.state.phone]}, 
            {ingredients: ingr}, 
            {cost: this.totalCost(ingr)},
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
        this.props.toggleStatus()
        
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

        return results;
    }

    totalCost = (totalOreder) => {
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
        if (this.state.questions.length === 0) {
            return null
        }
        console.log(this.state)
        let propIndex = this.state.currentIndex
        let currentQuestion = this.state.questions[propIndex];

        const answers = currentQuestion.answers;           
        const title = currentQuestion.question;
        let type = currentQuestion.type;

        let phone = false;
        let btnPrev = null; 
        let btnSend = null; 
        let btnNext = null;
        let finishLable = null;

        propIndex === 0 || propIndex < this.state.questions.length - 2 ?
            btnNext = <button type="button" className="btn btn-secondary" data-dismiss="modal" id="next" onClick={this.btmNext}>Next</button>
            : btnNext = null

            propIndex > 0 && propIndex < this.state.questions.length - 2 ?
            btnPrev = <button type="button" className="btn btn-secondary" data-dismiss="modal" id="prev" onClick={this.btmPrev}>Prev</button>
            : btnPrev = null
        


        let totalOreder = [];
        let totalCost = null;

        if (propIndex === this.state.questions.length - 2) {
            phone = true;
            totalOreder = this.checkOrder();
            totalCost = this.totalCost(totalOreder);
            btnSend = <button type="button" className="btn btn-primary sendBtn" id="send" onClick={this.send}>Send</button>
        }
        
        if (propIndex === this.state.questions.length - 1) {
            phone = null;
            btnSend = null;
            finishLable = true;
        }

        const renderQuestions = propIndex >= 0 
            && propIndex <= this.state.questions.length 
            && <QuestionBlock 
                    currentQuestion={currentQuestion} 
                    type={type}
                    handleOrder={this.handleOrder}
                    values={this.state.values}
                    checkOrder={this.checkOrder}
                    totalCost={this.totalCost}
                    /> 
        
        console.log()
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
                       
                        {renderQuestions}
                        {phone && <Phone 
                            phone={phone} 
                            checkPhone={this.checkPhone}
                            /> }
                        {finishLable && <FinalBlock />}
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