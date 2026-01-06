import React from 'react'
import Select from '../components/ui/Select'
import Input from '../components/ui/input'
import Switch from '../components/ui/Switch'
import Button from '../components/ui/button'

const Attendance = () => {
  return (
    <section className='mt-10'>
      <div className='max-w-5xl m-auto'>
        <div className='bg-blue-400 p-5 rounded-2xl shadow'>
          <h2 className='border-b pb-3'>Select Batch & Time</h2>
          <div className='flex items-center mt-5 gap-5'>
            <Select/>
            <Input type='date' className='py-4'/>
          </div>
        </div>
        <div className='bg-blue-300 p-5 rounded-2xl shadow mt-5 border-1'>
          <table className='w-full'>
            <thead>
              <tr>
                <th className='pb-5'>SL.no</th>
                <th className='pb-5'>Student Name</th>
                <th className='pb-5 w-[15%]'>Attendance</th>
              </tr>
            </thead>
            <tbody className='table_bdy'>
            <tr>
              <td>1</td>
              <td>Peter Karly</td>
              <td>
                <Switch/>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Peter Karly</td>
              <td>
                <Switch/>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Peter Karly</td>
              <td>
                <Switch/>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Peter Karly</td>
              <td>
                <Switch/>
              </td>
            </tr>
          </tbody>
          </table>
        <div className='flex justify-end mt-5'>
          <Button>Submit</Button>
        </div>
        </div>
      </div>
    </section>
  )
}

export default Attendance
