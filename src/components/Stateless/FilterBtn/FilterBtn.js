import './FilterBtn.css';
import { useState } from 'react'

const FilterBtn = () => {
    const [showChoices, setShowChoices] = useState(false);
    const [title, setTitle] = useState('Popular');
    const filterList = [
        {
            name: 'Popular',
            value: 'popular',
        },
        {
            name: 'Top Rated',
            value: 'top_rated',
        },
        {
            name: 'Latest',
            value: 'latest',
        },
    ];

    return (
        <span className='content-filter'>
            <h1 className='filter-title'>{title}</h1>
            <div className='filter-dropdown' onClick={() => setShowChoices(!showChoices)}>
                <button className='filter-btn'>Filter <i className="fas fa-caret-down"></i></button>
                <div className={showChoices ? 'filter-dropdown-choices active' : 'filter-dropdown-choices'}>
                    {filterList.map((item, i) => <span onClick={(e) => setTitle(item.name)} className='filter-span' key={i}>{item.name}</span>)}
                </div>
            </div>
        </span>
    )
}

export default FilterBtn
