import './Pagination.css'

const Pagination = ({ page, handlePrevPage, handleNextPage, handleChoosePage, maxPages }) => {
    // show previous button only if page does not === 1
    const prevBtn = () => {
        if (page === 1) {
            return <i className="fas fa-chevron-circle-left pagination-btn disabled"></i>
        } else {
            return <i className="fas fa-chevron-circle-left pagination-btn" onClick={handlePrevPage}></i>
        }
    }

    // show next button only if page does not === maxPages
    const nextBtn = () => {
        if (page === maxPages - 1) {
            return <i className="fas fa-chevron-circle-right pagination-btn disabled"></i>
        } else {
            return <i className="fas fa-chevron-circle-right pagination-btn" onClick={handleNextPage}></i>
        }
    }

    // iterate to create dots until you reach the number of maxPages
    const paginateDots = () => {
        let dots = [];
        for (let i = 1; i < maxPages; i++) {
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
