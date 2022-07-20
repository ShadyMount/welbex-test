import classes from './Spinner.module.css'
import React from 'react'

const Spinner = () => {

return (<div className={classes.BodySpin}>
    <div className={classes.Ring}>Loading<span></span>
    </div>
</div>)
}
export default Spinner