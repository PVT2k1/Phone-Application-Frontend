import { useEffect, useRef, useState } from "react";
import JsSIP from 'jssip'

import './CallSession.css';

function CallSession(props) {
    const [callStatus, setCallStatus] = useState('');
    const ua = useRef(null);
    const startTime = useRef('');

    useEffect(() => {
        const socket = new JsSIP.WebSocketInterface('wss://gc03-pbx.tel4vn.com:7444');
        const configuration = {
            sockets: [socket],
            uri: '101@2-test1.gcalls.vn:50061',
            password: 'test1101'
        };
        const options = {
            'mediaConstraints': {
                'audio': true,
                'video': false  // Because I have not added video stream to HTML element, so set this field to false
            }
        };

        ua.current = new JsSIP.UA(configuration);
        ua.current.start();

        ua.current.on("registered", function () {
            ua.current.call(props.phoneNumber, options);
        });

        ua.current.on("newRTCSession", function (data) {
            var session = data.session;

            session.on("confirmed", function () {
                //the call has connected, and audio is playing
                var localStream = session.connection.getLocalStreams()[0];
                session.connection.createDTMFSender(localStream.getAudioTracks()[0])
                setCallStatus('call connected');

                startTime.current = session._start_time;
            });

            session.on("progress", function () {
                setCallStatus('call is in progress');
            });

            session.on("ended", function (e) {
                SendCallogDataToServer();
                setCallStatus('call ended with cause: ' + e.cause);
            });

            session.on("failed", function (e) {
                setCallStatus('call failed with cause: ' + e.cause);
            });
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const HangUp = () => {
        ua.current.terminateSessions();
    }

    const SendCallogDataToServer = async () => {
        try {
            const newCallog = {
                phoneNumber: props.phoneNumber,
                startTime: startTime.current,
                duration: (new Date()).getTime() - Date.parse(startTime.current)
            };

            const response = await fetch('http://localhost:5000/callogHistory', {
                method: 'POST',
                body: JSON.stringify(newCallog),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message);
            }
        } catch (error) {
            alert(error.message || 'Something went wrong!');
        }
    }

    return (
        <div className="container-call-session">
            <h2>{props.phoneNumber}</h2>
            <div className="call-status">
                <h3>{callStatus}</h3>
            </div>
            <div id="hangup" onClick={HangUp}>
                <i className="fa fa-phone"></i>
            </div>
        </div>
    )
}

export default CallSession;