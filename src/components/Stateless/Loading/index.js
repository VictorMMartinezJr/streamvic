import './Loading.css';

const LoadingDiv = () => {
    return (
        <div className="loading-div">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
        </div>
    );
}
 
export default LoadingDiv;