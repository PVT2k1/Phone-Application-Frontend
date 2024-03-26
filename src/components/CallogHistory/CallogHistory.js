import { useEffect, useState } from 'react';

import CallogList from './CallogList';
import './CallogHistory.css'

function CallogHistory () {
    const [callogList, setCallogList] = useState([]);

    useEffect(() => {
        const fetchCallogHistory = async () => {
            const response = await fetch('http://localhost:5000/callogHistory');
            const responseData = await response.json();

            setCallogList(responseData);
        }

        fetchCallogHistory();
    }, []);

    return (
        <div className="container-callog-history">
            <CallogList callogList={callogList}></CallogList>
        </div>
    );
}

export default CallogHistory;