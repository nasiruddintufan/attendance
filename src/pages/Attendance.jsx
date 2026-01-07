import React, { useEffect, useState } from "react";
import Select from "../components/ui/Select";
import Input from "../components/ui/input";
import Switch from "../components/ui/Switch";
import Button from "../components/ui/button";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { toast, ToastContainer } from "react-toastify";

const Attendance = () => {
  const db = getDatabase();
  const [batchlist, setbatchlist] = useState([]);
  const [studentlist, setstudentlist] = useState([]);
    const [batchid, setbatchid] = useState("");
    const [attenddate,setattenddate] =useState("")
  useEffect(() => {
    onValue(ref(db, "batchlist/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setbatchlist(arr);
    });
  }, []);
  useEffect(() => {
    if (!batchid) return;
    onValue(ref(db, "studentlist/" + batchid), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key, attend: false });
      });
      setstudentlist(arr);
    });
  }, [batchid]);
  const handleattendswitch = (id,attend)=>{
    const attendupdate = studentlist.map((item)=>{
      if(item.id == id){
        item.attend =attend
      }
      return item;
    })
    setstudentlist(attendupdate)
  }
  const handleattendance=()=>{
    if(!batchid) return toast.error("Please select a Batch !")
    if(!attenddate) return toast.error("Please select a date !")
      set(push(ref(db, "studentlist/" + batchid)), {
            attenddate,
            studentlist,
          });
  }
  return (
    <section className="mt-10">
      <ToastContainer />
      <div className="max-w-5xl m-auto">
        <div className="bg-blue-400 p-5 rounded-2xl shadow">
          <h2 className="border-b pb-3">Select Batch & Time</h2>
          <div className="flex items-center mt-5 gap-5">
            <Select
              onChange={(e) => setbatchid(e.target.value)}
              options={batchlist}
            />
            <Input
              onChange={(e) => setattenddate(e.target.value)}
              type="date"
              className="py-4"
            />
          </div>
        </div>
        <div className="bg-blue-300 p-5 rounded-2xl shadow mt-5 border-1">
          <table className="w-full">
            <thead>
              <tr>
                <th className="pb-5">SL.no</th>
                <th className="pb-5">Student Name</th>
                <th className="pb-5 w-[15%]">Attendance</th>
              </tr>
            </thead>
            <tbody className="table_bdy">
              {studentlist.map((item, i) => (
                <tr key={item.id}>
                  <td>{i + 1}</td>
                  <td>{item?.studentname}</td>
                  <td>
                    <Switch
                      attend={item.attend}
                      onChange={(e) =>
                        handleattendswitch(item.id, e.target.checked)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-5">
            <Button onClick={handleattendance}>Submit</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Attendance;
