import React from 'react';


function QuestionBlock( props ) {

    const checkPhoneTrue = () => {
        console.log('ss')
    }

    let phoneBlock = null;
    let finishBlock = null;
    
    if (props.phone ) {    
    phoneBlock = 
        <div> 
            <lable for='numberPhone'>Enter yor phone</lable>
            <input type='phone' class='phone-input' onClick={checkPhoneTrue}/>
        </div> 
    }

    let result = props.currentQuestion.answers.map((arg) => {
        return(
            <div className='answerText' key={arg.title}>
                <input 
                    type={props.currentQuestion.type} 
                    id={arg.title} name="answer" 
                    className='d-none' 
                    checked={arg.isSelected} 
                    id={arg.title} 
                    onChange={ (e) => {props.saveOrder(props.currentQuestion.ingredientType, e.target.value)} }/>
                <label htmlFor={arg.title} class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src={arg.url} alt="burger" />
                    <span>{arg.title}</span>
                </label>
            </div>
        )
    })

    if (props.finishLable) {
        phoneBlock = null
        result = null
        finishBlock = <p>"Thank You! We will contact you."</p>
        
        props.toggleStatus()
        
    } 

    return (
        <div className="modal-body  d-flex flex-column align-items-center" id="modalBody">
            <h5 className="question p-1 p-sm-2 p-md-3 text-center" id="question">{props.title}</h5>
            <div className="answers w-100 p-1 p-sm-2 p-md-3" id="answers">
                
                <form action="#" id="formAnswers" class="formAnswers d-flex flex-wrap justify-content-around">
                    { result }
                    { phoneBlock }
                    { finishBlock }
                </form>
            </div>
        </div>

    )
}

export default QuestionBlock 