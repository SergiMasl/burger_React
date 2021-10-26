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

        

    render() {
        const title = questions[this.state.numberQuestion].question;
        const answers = questions[this.state.numberQuestion].answers;
        const renderQuestions = this.state.numberQuestion >= 0 && this.state.numberQuestion <= questions.length - 1 && <QuestionBlock title={title} answers={answers}/>    
       
        
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
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" id="prev" onClick={this.btmPrev}>Prev</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" id="next" onClick={this.btmNext}>Next</button>
                            <button type="button" className="btn btn-primary sendBtn d-none" id="send">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Toggole