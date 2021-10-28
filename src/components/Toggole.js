import React, { Component } from 'react';
import questions from '../questions.json';
import QuestionBlock from './QuestionBlock.js';



class Toggole extends Component {
    constructor() {
        super();
        this.state = {
            status: false,
            finalAnswers: [],
            numberQuestion: 0,
            title: '',
            finishLable: false,
        }
    }   
    

    btmNext = () => {
        const nextIndex = this.state.numberQuestion + 1
        
        this.setState({
            numberQuestion: nextIndex, 
        })
    }

    btmPrev = () => {
        const prevIndex = this.state.numberQuestion - 1
        this.setState({
            numberQuestion: prevIndex,
        })
    }

    send = () => {
        this.btmNext();

        this.setState({
            finishLable: true,
        })
    }

    render() {

        const title = questions[this.state.numberQuestion].question;
        let type = questions[this.state.numberQuestion].type;
        let phone = false;
        let btnPrev = null; 
        let btnSend = null; 
        let btnNext = <button type="button" className="btn btn-secondary" data-dismiss="modal" id="next" onClick={this.btmNext}>Next</button>;
        const answers = questions[this.state.numberQuestion].answers;           
        
        if (this.state.numberQuestion > 0) {
            btnPrev = <button type="button" className="btn btn-secondary" data-dismiss="modal" id="prev" onClick={this.btmPrev}>Prev</button>
        } else {
            btnPrev = null
        }
        
        if (this.state.numberQuestion === questions.length - 2) {
            btnPrev = null;
            btnNext = null;
            phone = true;
            btnSend = <button type="button" className="btn btn-primary sendBtn" id="send" onClick={this.send}>Send</button>
        }
        
        if (this.state.numberQuestion === questions.length - 1) {
            phone = null;
            btnSend = null;
            btnPrev = null;
            btnNext = null;
        }

        const renderQuestions = this.state.numberQuestion >= 0 
            && this.state.numberQuestion <= questions.length 
            && <QuestionBlock 
                    title={title} 
                    answers={answers} 
                    phone={phone} 
                    finishLable={this.state.finishLable} 
                    toggleStatus={this.props.toggleStatus}
                    type={type}
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