import './FilterBtn.css';
import { useState } from 'react'

const FilterBtn = ({ filterChange, setSort, setPage }) => {
    const [showChoices, setShowChoices] = useState(false);
    const [title, setTitle] = useState('Popular');

    const handleFilter = (e) => {
        const currentSelectedSort = e.target.value;
        setSort(currentSelectedSort)
        setPage(1);

        switch (currentSelectedSort) {
            case 'popular':
                return setTitle('Popular');
            case 'top_rated':
                return setTitle('Top Rated');
            default:
                return setTitle('Popular');
        }
    }

    return (
        <span className='content-filter'>
            <h1 className='filter-title'>{title}</h1>
            <div className='filter-dropdown' onClick={() => setShowChoices(!showChoices)}>
                <button className='filter-btn'>Filter <i className="fas fa-caret-down"></i></button>
                <div className={showChoices ? 'filter-dropdown-choices active' : 'filter-dropdown-choices'}>
                    <option value="popular" onClick={handleFilter} className='filter-options'>Popular</option>
                    <option value="top_rated" onClick={handleFilter} className='filter-options'>Top Rated</option>
                </div>
            </div>
        </span>
    )
}

export default FilterBtn;
