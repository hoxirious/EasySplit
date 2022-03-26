import React, { useRef, useEffect, useState } from "react"

function RecentActivity(props) {

    const recentActivityDiv = useRef();

    function populateAllExpenses() {

    }

    useEffect(() => {
        if (props.isOpen === true) {
            recentActivityDiv.current.style.display = 'block'
            populateAllExpenses();
        }
        else {
            recentActivityDiv.current.style.display = 'none'
            console.log("should be hidden")
        }
    }, [props.isOpen]);

    return (

        <div className="recent-activity-div" ref={recentActivityDiv} >
            Recent activities appear here.
        </div>
    )
}

export default RecentActivity