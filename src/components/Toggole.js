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
            typeOfBurg: '',
            meat: '',
            veg: '',
            sauce: '',
            questins: [...questions]
        }
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

    send = () => {
        
        this.btmNext();

        this.setState({
            finishLable: true,
        })
    }

    saveOrder = (type, value) => {

        // this.setState({
        //     [type]: value,
        // })
        // console.log(this.state)
    }

    render() {

        let propIndex = this.state.currentIndex
        let currentQuestion = questions[propIndex];

        const answers = currentQuestion.answers;           
        let ingredientType = currentQuestion.ingredientType;;
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
                    saveOrder={this.saveOrder}
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