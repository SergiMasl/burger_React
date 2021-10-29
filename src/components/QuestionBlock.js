import React from 'react';




function QuestionBlock( props ) {
    
    
    const onChange = (name, checked, type) => {
        if (type === 'radio')
            {
                const resultValues = {};
                props.currentQuestion.answers.forEach((item) => {
                if (item.name === name) {
                    resultValues[item.name] = checked
                } else {
                    resultValues[item.name] = !checked
                } 
            })
            console.log(resultValues)
            return props.handleOrder(resultValues)
        } else {

            props.handleOrder({[name]: checked})
            
        }

    }

    let phoneBlock = null;
    let finishBlock = null;
    
    if (props.phone ) {    
        props.checkOrder()
        props.totalCost()
    phoneBlock = 
        <div> 
            <lable for='numberPhone'>Enter yor phone</lable>
            <input type="number" class='phone-input' onChange={(e)=> props.checkPhone(e.target.value)}/>    
            <div className="totalOrder">
                <span>Your order:</span>
                {props.totalNames.map((arg) => <p>{arg}</p>)} 
                <span>Total: $ {props.finalCost}</span>
            </div>
        </div> 
    }

    let result = props.currentQuestion.answers.map((arg) => {
       // console.log(this.props.value)
        return(
            <div className='answerText' key={arg.title}>
                <input 
                    type={props.currentQuestion.type} 
                    id={arg.title} name="answer" 
                    className='d-none' 
                    checked={props.values[arg.name]} 
                    id={arg.title} 
                    onChange={ (e) => {onChange(arg.name, e.target.checked, props.currentQuestion.type)} }/>
                <label htmlFor={arg.title} class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src={arg.url} alt="burger" />
                    <span>{arg.title}</span>
                    <span>{arg.price}</span>
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