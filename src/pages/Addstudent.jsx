import React, { useEffect, useState } from 'react'
import Input from '../components/ui/input'
import Button from '../components/ui/button'
import Select from '../components/ui/Select'
import { getDatabase, onValue, ref } from 'firebase/database'

const Addstudent = () => {
  const db = getDatabase();
  const [batchlist,setbatchlist] = useState([])
  const [studentname,setstudentname]=useState([])
  const [batchid,setbatchid] = useState("")
  useEffect(()=>{
      onValue(ref(db, "batchlist/"), (snapshot) => {
        let arr=[];
        snapshot.forEach((item)=>{
        arr.push({ ...item.val(), id: item.key });
        console.log(item.val());
        })
        setbatchlist(arr)
        
      });
    },[])
    const handleaddstudent=()=>{
      console.log(batchid,studentname)
    }
    
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='bg-slate-200 w-xl p-10 rounded-2xl shadow-2xl'>
        <h1 className='text-2xl text-primary pb-2 border-b-3 font-bold border-primary'>Add New Student</h1>
        <div className="relative w-full group mt-5">
      <span className="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-gradient-to-b from-indigo-500 to-purple-500 opacity-70 transition-all duration-300 group-focus-within:opacity-100" />
      <Select value={batchlist} onChange={(e)=>setbatchid(e.target.value)} options={batchlist}/>
    </div>
        <div className='mt-5 flex items-center gap-3'>
        <Input onChange={(e)=>setstudentname(e.target.value)} label="Student Name"/>
        <Button onClick={handleaddstudent} size="lg">Add</Button>
        </div>
        <div>
        <h2 className='text-2xl text-primary py-2 mt-10 border-b font-bold border-slate-400'>Student List</h2>
        </div>
        <div className='batchlist'>
            <div className='flex items-center justify-between mt-3 p-2 hover:bg-slate-400 hover:rounded-2xl'>
                <p className='text-xl font-semibold text-primary p-2 '>Marathone 2026</p>
                <Button variant="danger" size="sm">Delete</Button>
            </div>
            <div className='flex items-center justify-between mt-3 p-2'>
                <p className='text-xl font-semibold text-primary p-2'>Marathone 2026</p>
                <Button variant="danger" size="sm">Delete</Button>
            </div>
            <div className='flex items-center justify-between mt-3 p-2 hover:bg-slate-400 hover:rounded-2xl'>
                <p className='text-xl font-semibold text-primary p-2'>Marathone 2026</p>
                <Button variant="danger" size="sm">Delete</Button>
            </div>
            <div className='flex items-center justify-between mt-3 p-2'>
                <p className='text-xl font-semibold text-primary p-2'>Marathone 2026</p>
                <Button variant="danger" size="sm">Delete</Button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Addstudent
