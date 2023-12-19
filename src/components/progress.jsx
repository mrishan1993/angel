import { Progress } from "@radix-ui/react-progress"
import React, { useState } from "react"
import PropTypes from 'prop-types';
import "./progress.css"



const ProgressBar = ({currentValue}) => {
    const [value, setValue] = useState(currentValue)
    setTimeout ( () => {
        if (value <=100) {
            setValue(value+1)
        }
    }, 100)
    return (
        <progress className="progressBar" value={value} max={100}>{currentValue}%</progress>
    )
}

ProgressBar.propTypes = {
    currentValue: PropTypes.number
}

export default ProgressBar