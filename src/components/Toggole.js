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
        }
    }    

    componentDidMount() {
        this.setState(
            {
                finalAnswers: [],
                numberQuestion: 0,
            }
        )
    }

/*
    playTest = () => {

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    playTest = () => {

        const renderAnswers = (arg) => {
            questions[arg].answers.forEach((answer) => {
                
                const item = document.createElement('div');
                item.classList.add('answers-item', 'd-flex', 'justify-content-between');
                item.innerHTML =
                    `
                        <input type="${questions[arg].type}" id="${answer.title}" name="answer" class="d-none" value='${answer.title}'>
                        <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                            <img class="answerImg" src="${answer.url}" alt="burger">
                            <span>${answer.title}</span>
                        </label>
                    `
                formAnswers.appendChild(item)
            })
        }

        const renderQuestions = (arg) => {
            formAnswers.innerHTML = ''

            if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                questionsTitle.textContent = `${questions[arg].question}`;
                renderAnswers(arg);

                nextBtm.classList.remove('d-none');
                prevBtm.classList.remove('d-none');
                send.classList.add('d-none');

            }
            if (numberQuestion === 0) {
                prevBtm.classList.add('d-none');
            }


            if (numberQuestion === questions.length) {
                nextBtm.classList.add('d-none');
                prevBtm.classList.add('d-none');
                send.classList.remove('d-none');
                formAnswers.innerHTML = `
                    <div class='form-group'>
                        <lable for='numberPhone'>Enter yor phone</lable>
                        <input type='phone' class='form-control' id='numberPhone'>
                    </div>
                `
            }

            if (numberQuestion === questions.length + 1) {
                formAnswers.textContent = "Thank You! We will contact you.";
                setTimeout(() => {
                    modal.classList.remove('d-block')
                }, 5000)
            }

        }

        renderQuestions(numberQuestion);


        const checkAnswer = () => {
            const obj = {};
            const inputs = [...formAnswers.elements].filter((elem) => elem.checked || elem.id === 'numberPhone')
            inputs.forEach((elem, index) => {
                if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                    obj[`${index}_${questions[numberQuestion].question}`] = elem.value;
                }
                if (numberQuestion === questions.length) {
                    obj['Phone number'] = elem.value;
                }
            })

            finalAnswers.push(obj)
            console.log(finalAnswers)
        }

        prevBtm.onclick = () => {
            numberQuestion--;
            renderQuestions(numberQuestion);
        };
        nextBtm.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);
        };
        send.addEventListener('click', () => {
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion)
            console.log(finalAnswers)
        })
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////

   */
    render() {

        // const renderAnswers = (arg) => {
        //     questions[arg].answers.forEach((answer) => {
                
                const item = document.createElement('div');
                item.classList.add('answers-item', 'd-flex', 'justify-content-between');
                item.innerHTML =
                    `
                        <input type="${questions[1].type}" id="${answer.title}" name="answer" class="d-none" value='${answer.title}'>
                        <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                            <img class="answerImg" src="${answer.url}" alt="burger">
                            <span>${answer.title}</span>
                        </label>
                    `
                formAnswers.appendChild(item)
        //     })
        // }
        // renderAnswers(1)
        
        return (
            <div class="modal d-block" tabindex="-1" role="dialog" id="modal-block" >
                <div class="modal-dialog  modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Choose your burger:</h5>
                            <button 
                                type="button" 
                                class="close"   
                                data-dismiss="modal" 
                                aria-label="Close" 
                                id="closeModal" 
                                onClick={() => this.props.toggle(false)}>
                                <span aria-hidden="true">x</span>
                            </button>
                        </div>
                       
                        {/* {item} */}
                        <QuestionBlock item={item}/>

                        <div class="modal-footer" id="modalFooter">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="prev">Prev</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="next">Next</button>
                            <button type="button" class="btn btn-primary sendBtn d-none" id="send">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Toggole