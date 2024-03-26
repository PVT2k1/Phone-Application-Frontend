function CallogList ({callogList}) {
    return (
        <div>
            {callogList.length === 0 && <p>Have no callog</p>}
            {callogList.length !== 0 &&
            <ul>
                {
                    callogList.map(callog => (
                        <li>
                            <p>{callog.phoneNumber}</p>
                            <p>Start time: {callog.startTime}</p>
                            <p>Duration: {callog.duration} milisecond</p>
                        </li>
                    ))
                }
            </ul>
            }
        </div>
    );
}

export default CallogList;