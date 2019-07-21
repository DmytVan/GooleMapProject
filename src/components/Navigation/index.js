import React from 'react';
import {Link} from 'react-router-dom'
import './index.css'

export default function () {
    return (
        <nav>
            <ul className='nav'>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/aboutAuthor/'>About Author</Link>
                </li>
                <li>
                    <Link to='/authorization/'>Authorization</Link>
                </li>
            </ul>
        </nav>
    )
};