import React from 'react';

function SpacenowSplashScreen()
{
    return (
        <div id="spacenow-splash-screen">

            <div className="center">

                <div className="logo">
                    <img width="128" src="assets/images/logos/spacenow.svg" alt="logo"/>
                </div>
                <div className="spinner-wrapper">
                    <div className="spinner">
                        <div className="inner">
                            <div className="gap"/>
                            <div className="left">
                                <div className="half-circle"/>
                            </div>
                            <div className="right">
                                <div className="half-circle"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(SpacenowSplashScreen);
