import './Pagination.css';
import {BsArrowRightCircle, BsArrowLeftCircle} from 'react-icons/bs'

const Pagination = ({ page, handlePrevPage, handleNextPage, handleChoosePage, maxPages }) => {
    // enable previous button only if page does not === 1
    const prevBtn = () => {
        if (page === 1) {
            return <BsArrowLeftCircle className="arrow-icon pagination-btn disabled" />
        } else {
            return <BsArrowLeftCircle className="arrow-icon pagination-btn" onClick={handlePrevPage} />
        }
    }

    // enable next button only if page does not === maxPages
    const nextBtn = () => {
        if (page === maxPages) {
            return <BsArrowRightCircle className="arrow-icon pagination-btn disabled" />
        } else {
            return <BsArrowRightCircle className="arrow-icon pagination-btn" onClick={handleNextPage} />
        }
    }

    // iterate to create dots until you reach the number of maxPages
    const paginateDots = () => {
        let dots = [];
        for (let i = 1; i < maxPages + 1; i++) {
            dots.push(<div
                className={page === i ? 'dot active' : 'dot'}
                key={i}
                id={i}
                onClick={() => handleChoosePage(i)}
            >
            </div>)
        }
        return dots;
    }

    return (
        <div className='pagination-container'>
            {prevBtn()}
            <div className='page-dots'>{paginateDots()}</div>
            {nextBtn()}
        </div>

    )
}

export default Pagination;