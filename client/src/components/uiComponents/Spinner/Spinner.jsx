import classes from './Spinner.module.css'

export const Spinner = () => {

return (<div className={classes.BodySpin}>
    <div className={classes.Ring}>Loading<span></span>
    </div>
</div>)
}