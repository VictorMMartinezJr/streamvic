import './FilterBtn.css';
import { useState } from 'react'

const FilterBtn = ({ setSort, setPage }) => {
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

    const optionList = [
        {
            name: 'Popular',
            value: 'popular',
        },
        {
            name: 'Top Rated',
            value: 'top_rated',
        },
    ];

    return (
        <section className="content-filter">
            <h2>
                <span>{title}</span>
            </h2>
            <form>
                <select className='filter-btn' name="selectSort" id="selectSort" onChange={handleFilter}>
                    {optionList.map((option, i) => {
                        return (
                            <option className='filter-options' value={option.value} key={i}>
                                {option.name}
                            </option>
                        );
                    })}
                </select>
            </form>
        </section>
    )
}

export default FilterBtn;
