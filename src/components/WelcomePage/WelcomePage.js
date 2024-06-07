import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {

    return (
        <div>
            <p>Welcome to ExpenseTracker... !</p>
            <p> Your profile is incomplete. <Link to='/Profile'>Complete Now</Link></p>
        </div>

    );
};

export default WelcomePage;