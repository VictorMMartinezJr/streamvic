import './Error.css'
import errorPopcorn from '../../../assets/error.svg';

const ErrorDiv = ({message, custom}) => {
    const toUpper = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <div className='error-div' style={{height: custom}}>
            <img className='error-svg' src={errorPopcorn} alt="error-popcorn" />
            <p>{toUpper(message)}</p>
        </div>
    );
}
 
export default ErrorDiv;