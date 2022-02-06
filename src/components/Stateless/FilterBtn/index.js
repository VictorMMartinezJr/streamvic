import './FilterBtn.css';
import { useState } from 'react';
import {IoMdArrowDropdown} from 'react-icons/io'

const FilterBtn = ({ setSort, setPage }) => {
    const [title, setTitle] = useState('Popular');
    const [filterActive, setFilterActive] = useState(false);

    // Close filter list if page is scrolled
    window.addEventListener('scroll', () => setFilterActive(false))

    const handleFilter = (e) => {
        const currentSelectedSort = e.target.outerText;
        if (currentSelectedSort === 'Top Rated') {
            setSort('top_rated')
        } else {
            setSort('popular')
        }
        setPage(1);

        switch (currentSelectedSort) {
            case 'popular':
                return setTitle('Popular');
            case 'Top Rated':
                return setTitle('Top Rated');
            default:
                return setTitle('Popular');
        }
    }

    const optionList = [
        {
            name: 'Popular',
        },
        {
            name: 'Top Rated',
        },
    ];

    return (
        <section className="content-filter">
                <h2 className='filter-title'>{title}</h2>
                <div className='filter-btn' onClick={() => {
                    setFilterActive(!filterActive) 
                    console.log('clicked')
                }
                }>
                    <p>Filter</p>
                    <IoMdArrowDropdown />
                    <ul className={filterActive ? 'filter-list active-filter-list' : 'filter-list'}>
                    {optionList.map((option, i) => {
                        return (
                            <li onClick={handleFilter} className='filter-options' key={i} label='hello'>
                                {option.name}
                            </li>
                        );
                    })}
                    </ul>
                </div>
        </section>
    )
}

export default FilterBtn;
