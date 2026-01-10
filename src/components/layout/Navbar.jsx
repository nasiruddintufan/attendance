import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <nav className="py-5 bg-brand ">
      <div className="container flex justify-center gap-30 text-white text-2xl">
        <Link to="/" className="font-serif">
          Batch List
        </Link>
        <Link to="/addstudent" className="font-serif">
          Add Student
        </Link>
        <Link to="/attendance" className="font-serif">
          Take Attendance
        </Link>
        <Link to="/attendancereport" className="font-serif">
          Report
        </Link>
      </div>
    </nav>
  );
}

export default Navbar
