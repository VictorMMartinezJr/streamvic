import { useState } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';
import popcorn from '../../../assets/nav-logo.png'

const Navbar = ({ backgroundColor, position }) => {
    const [navActive, setNavActive] = useState(false);
    const [navBackground, setNavBackground] = useState(false);

    const addNavBackground = () => {
        if (window.scrollY >= 80) {
            setNavBackground(true)
        } else {
            setNavBackground(false)
        }
    }

    window.addEventListener('scroll', addNavBackground);

    return (
        <div className={navBackground ? 'navbar active' : 'navbar'} style={{ position: position }}>
            <span className='title'>
                <h1 className='name'>StreamVic</h1>
                <img className='navbar-img' src={popcorn} alt="popcorn" />
            </span>

            <div className="burger" onClick={() => setNavActive(!navActive)}>
                <div className={navActive ? "line-1 toggle" : 'line-1'}></div>
                <div className={navActive ? "line-2 toggle" : 'line-2'}></div>
                <div className={navActive ? "line-3 toggle" : 'line-3'}></div>
            </div>
            <ul className={navActive ? 'nav-links active' : 'nav-links'}>
                <Link to='/' style={{ color: '#fff', textDecoration: "none" }}>
                    <li className='nav-link'>Home</li>
                </Link>
                <Link to='/movies' style={{ color: '#fff', textDecoration: "none" }}>
                    <li className='nav-link'>Movies</li>
                </Link>
                <Link to='/tv' style={{ color: '#fff', textDecoration: "none" }}>
                    <li className='nav-link'>TV Shows</li>
                </Link>
                <Link to='/favorites' style={{ color: '#fff', textDecoration: "none" }}>
                    <li className='nav-link'>Favorites</li>
                </Link>
                <Link to='/search' style={{ color: '#fff', textDecoration: "none" }}>
                    <i className="fas fa-search"></i>
                </Link>
            </ul>
        </div>
    )
}

export default Navbar
