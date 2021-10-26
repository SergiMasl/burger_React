import React from 'react';


function QuestionBlock() {

    return (
        <div class="modal-body  d-flex flex-column align-items-center" id="modalBody">
            <h5 class="question p-1 p-sm-2 p-md-3 text-center" id="question"></h5>
            <div class="answers w-100 p-1 p-sm-2 p-md-3" id="answers">
                <form action="#" id="formAnswers" class="formAnswers d-flex flex-wrap justify-content-around">
                </form>
            </div>
        </div>
    )
}

export default QuestionBlock 