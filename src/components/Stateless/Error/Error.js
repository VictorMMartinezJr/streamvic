import './Error.css'
import errorPopcorn from '../../../assets/popcorn.svg';

const ErrorDiv = ({message}) => {
    return (
        <div className='error-div'>
            <img src={errorPopcorn} alt="error-popcorn" />
            <p>{message}</p>
        </div>
    );
}
 
export default ErrorDiv;