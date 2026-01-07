import React, { useEffect, useState } from "react";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import Select from "../components/ui/Select";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { toast, ToastContainer } from "react-toastify";

const Addstudent = () => {
  const db = getDatabase();
  const [batchlist, setbatchlist] = useState([]);
  const [studentname, setstudentname] = useState("");
  const [batchid, setbatchid] = useState("");
  const [studentlist, setstudentlist] = useState([]);

  useEffect(() => {
    onValue(ref(db, "batchlist/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setbatchlist(arr);
    });
  }, []);
  const handleaddstudent = () => {
    if (!batchid) return toast.error("Please Select a Batch !");
    if (!studentname) return toast.error("Enter a NAme !");
    set(push(ref(db, "studentlist/" + batchid)), {
      studentname,
    });
  };

  useEffect(() => {
    if (!batchid) return;
    onValue(ref(db, "studentlist/" + batchid), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setstudentlist(arr);
    });
  }, [batchid]);

  const handledelet=(id)=>{
    remove(ref(db, `studentlist/${batchid}/${id}`));
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="bg-slate-200 w-xl p-10 rounded-2xl shadow-2xl">
        <h1 className="text-2xl text-primary pb-2 border-b-3 font-bold border-primary">
          Add New Student
        </h1>
        <div className="relative w-full group mt-5">
          <span className="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-gradient-to-b from-indigo-500 to-purple-500 opacity-70 transition-all duration-300 group-focus-within:opacity-100" />
          <Select
            value={batchid}
            onChange={(e) => setbatchid(e.target.value)}
            options={batchlist}
          />
        </div>
        <div className="mt-5 flex items-center gap-3">
          <Input
            onChange={(e) => setstudentname(e.target.value)}
            label="Student Name"
          />
          <Button onClick={handleaddstudent} size="lg">
            Add
          </Button>
        </div>
        <div>
          <h2 className="text-2xl text-primary py-2 mt-10 border-b font-bold border-slate-400">
            Student List
          </h2>
        </div>
        <div className="batchlist">
          {!studentlist.length ? (
            <p className="text-center font-semibold text-gray-600 mt-5">
              No student here !
            </p>
          ) : (
            studentlist.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mt-3 p-2 hover:bg-slate-400 hover:rounded-2xl"
              >
                <p className="text-xl font-semibold text-primary p-2 ">
                  {item.studentname}
                </p>
                <Button onClick={()=> handledelet(item.id)} variant="danger" size="sm">
                  Delete
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Addstudent;
