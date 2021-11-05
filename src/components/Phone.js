
import React from 'react';

function Phone( props ) {
        
    return(
        <div className='answerText'> 
            <label htmlFor='numberPhone'>Enter yor phone</label>
            <input type="number" className='phone-input' onChange={(e)=> props.checkPhone(e.target.value)} />    
            <div className="totalOrder">
                <span>Your order:</span>
                {props.totalOreder.map((arg) => <p key={arg} >{arg} </p>)} 
                <span>Total: $ {props.totalCost}</span>
            </div>
        </div> 
    )
}

export default Phone