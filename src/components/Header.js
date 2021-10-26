import React from "react";

function Header () {
    return (
        <header>
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="d-flex justify-content-between p-1 p-sm-2 p-md-3">
                        <div className="logo d-flex">
                            <div className="logo-img"></div>
                            <span className="logo-text h1">BURGER-QUIZ</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    )
}

export default Header