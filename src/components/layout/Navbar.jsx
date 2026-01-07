import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <nav className='py-5 bg-brand '>
        <div className="container flex justify-center gap-30 text-white text-2xl">
            <Link to="/">Batch List</Link>
            <Link to="/addstudent">Add Student</Link>
            <Link to="/attendance">Take Attendance</Link>
            <Link to="/attendance-report">Report</Link>
        </div>
    </nav>
  )
}

export default Navbar
