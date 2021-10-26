import React, { Component } from 'react';

function MainInner ( props ) {

    

    return (
        <section className="main">
            <div className="container">

                <div className="row">
                    <div className="col">
                        <div className="d-flex justify-content-center p-1 p-sm-2 p-md-3">
                            <div className="content"></div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="d-flex flex-column align-items-center p-1 p-sm-2 p-md-3">
                            <h2 className="main-title text-center h1">Take the test and</h2>
                            <h2 className="main-title text-center h1">build your dream burger</h2>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="d-flex justify-content-center p-1 p-sm-2 p-md-3">
                            <div className="arrow display-4">&dArr;</div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="d-flex justify-content-center p-1 p-sm-2 p-md-3">
                            <button 
                                className="button" 
                                className="btn btn-outline-danger" 
                                id="btnOpenModal"
                                onClick={() => props.toggle(true)}>
                                <span className="btnText h1">Start</span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
export default MainInner