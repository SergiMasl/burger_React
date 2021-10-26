import React from 'react';


function QuestionBlock( props ) {

    
   
    const result = props.answers.map((arg) => {
        return(
            <div>
                <input type="${questions[arg].type}" id="${answer.title}" name="answer" class="d-none" value='${answer.title}' />
                <label for="{answer.title}" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src={arg.url} alt="burger" />
                    <span>{arg.title}</span>
                </label>
            </div>
        )
    })
    
    console.log(result)
    return (
        <div className="modal-body  d-flex flex-column align-items-center" id="modalBody">
            <h5 className="question p-1 p-sm-2 p-md-3 text-center" id="question">{props.title}</h5>
            <div className="answers w-100 p-1 p-sm-2 p-md-3" id="answers">
                
                <form action="#" id="formAnswers" class="formAnswers d-flex flex-wrap justify-content-around">
                    { result }
               
                </form>
            </div>
        </div>

    )
}

export default QuestionBlock 