import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

import './DialPad.css'

function DialPad(props) {
    const [phoneNumberInput, setPhoneNumber] = useState('')
    let history = useHistory();

    const AddNumber = (e) => {
        if (e.target.innerHTML.includes('*') || e.target.innerHTML.includes('#'))
            setPhoneNumber(phoneNumberInput + e.target.innerHTML);
        else
            setPhoneNumber(phoneNumberInput + e.target.innerHTML.replace(/\D/g, ""));
    }

    const DeleteNumber = () => {
        if (phoneNumberInput !== '')
            setPhoneNumber(phoneNumberInput.slice(0, -1));
    }

    const GoToCallSession = () => {
        if (phoneNumberInput !== '') {
            props.setPhoneNumber(phoneNumberInput);
            history.push('/call-session');
        }
    }

    return (
        <div className="container">
            <input type="text" value={phoneNumberInput} />
            <div className="row" onClick={AddNumber}>
                <div className="digit">1</div>
                <div className="digit">2
                    <div className="sub">ABC</div>
                </div>
                <div className="digit">3
                    <div className="sub">DEF</div>
                </div>
            </div>
            <div className="row" onClick={AddNumber}>
                <div className="digit">4
                    <div className="sub">GHI</div>
                </div>
                <div className="digit">5
                    <div className="sub">JKL</div>
                </div>
                <div className="digit">6
                    <div className="sub">MNO</div>
                </div>
            </div>
            <div className="row" onClick={AddNumber}>
                <div className="digit">7
                    <div className="sub">PQRS</div>
                </div>
                <div className="digit">8
                    <div className="sub">TUV</div>
                </div>
                <div className="digit">9
                    <div className="sub">WXYZ</div>
                </div>
            </div>
            <div className="row" onClick={AddNumber}>
                <div className="digit">*</div>
                <div className="digit">0</div>
                <div className="digit">#</div>
            </div>
            <div className="botrow">
                <div id="button-call" onClick={GoToCallSession}>
                    <i className="fa fa-phone"></i>
                </div>
                <i className="fa fa-times delete" onClick={DeleteNumber}></i>
            </div>
        </div>
    );
}

export default DialPad;