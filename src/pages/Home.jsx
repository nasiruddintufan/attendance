import React, { useEffect, useState } from "react";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import ListLoading from "../components/ui/ListLoading";
import { toast, ToastContainer } from "react-toastify";

const Home = () => {
  const db = getDatabase();
  const [loding, setloading] = useState(true);
  const [batchname, setbatchname] = useState("");
  const [batchlist, setbatchlist] = useState([]);
  const handleadd = () => {
    if (!batchname) {
      toast.error("Batch Name is Required !");
    }
    set(push(ref(db, "batchlist/")), {
      batchname,
    }).then(() => {
      setbatchname("");
    });
  };
  useEffect(() => {
    onValue(ref(db, "batchlist/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setbatchlist(arr);
      setloading(false);
    });
  }, []);

  const handledelet = (id) => {
    remove(ref(db, "batchlist/" + id));
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="bg-slate-200 w-xl p-10 rounded-2xl shadow-2xl">
        <h1 className="text-2xl text-primary pb-2 border-b-3 font-bold border-primary">
          Create a New Batch
        </h1>
        <div className="mt-5 flex items-center gap-3">
          <Input
            onChange={(e) => setbatchname(e.target.value)}
            label="Batch Name"
            value={batchname}
          />
          <Button onClick={handleadd} size="lg">
            Add
          </Button>
        </div>
        <div>
          <h2 className="text-2xl text-primary py-2 mt-10 border-b font-bold border-slate-400">
            Batch List
          </h2>
        </div>
        {loding ? (
          <ListLoading />
        ) : batchlist.length > 0 ? (
          batchlist.map((item) => (
            <div className="batchlist">
              {
                <div
                  key={item.id}
                  className="flex items-center justify-between mt-3 p-2 hover:bg-slate-400 hover:rounded-2xl"
                >
                  <p className="text-xl font-semibold text-primary p-2 ">
                    {item.batchname}
                  </p>
                  <Button
                    onClick={() => handledelet(item.id)}
                    variant="danger"
                    size="sm"
                  >
                    Delete
                  </Button>
                </div>
              }
            </div>
          ))
        ) : (
          <p className="text-center font-bold mt-5 ">No Batch Created !</p>
        )}
      </div>
    </div>
  );
};

export default Home;
