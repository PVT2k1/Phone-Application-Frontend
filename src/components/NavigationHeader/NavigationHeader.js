import { Link } from "react-router-dom/cjs/react-router-dom";

import './NavigationHeader.css'

function NavigationHeader () {
    return (
        <header className="header">
            <div>
                <Link style={{'paddingRight': '30px', 'font-size': 'large'}} to='/'>Dial Pad</Link>
                <Link to='/callog-history' style={{'font-size': 'large'}}>Callog History</Link>
            </div>
        </header>
    )
}

export default NavigationHeader;