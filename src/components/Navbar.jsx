import React from 'react'
import { Link } from 'react-router-dom'
import {Search} from './Search'

const Navbar = ({ darkTheme, setDarkTheme }) => {
    return (
        <div className="p-5 pb-0 m-0 flex flex-wrap sm:justify-between justify-center items-center border-b dark:border-gray-700 border-gray-200">
            <div className='flex justify-between items-center space-x-5 w-screen'>
                <Link to='/'>
                    <p className='text-5xl p-3 font-bold dark:text-white'>
                        <>
                            <span style={{ color: !darkTheme ? '#4285f4' : 'white' }}>G</span>
                            <span style={{ color: !darkTheme ? '#EA4335' : 'white' }}>o</span>
                            <span style={{ color: !darkTheme ? '#FFBB00' : 'white' }}>o</span>
                            <span style={{ color: !darkTheme ? '#4285f4' : 'white' }}>g</span>
                            <span style={{ color: !darkTheme ? '#84A858' : 'white' }}>l</span>
                            <span style={{ color: !darkTheme ? '#EA4335' : 'white' }}>e</span>
                        </>
                    </p>
                </Link>

                <Search />
                <button type='button' onClick={() => setDarkTheme(!darkTheme)}
                    className='text-xl dark:bg-gray-50 dark:text-gray-900 bg-white border rounded-full px-2 py-1 hover:shadow-lg'
                >
                    {
                        darkTheme ? 'light' : 'dark'
                    }
                </button>
            </div>
        </div>
    )
}

export default Navbar