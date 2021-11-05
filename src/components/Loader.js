import React from "react";

function Loader () {
    return (    
        <div className="modal d-block" tabIndex="-1" role="dialog" id="modal-block" >
            <div className="modal-dialog  modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <p>Loading...</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader