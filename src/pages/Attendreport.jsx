import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import Select from "../components/ui/Select";

const Attendreport = () => {
  const db = getDatabase();

  const [batchlist, setBatchlist] = useState([]);
  const [batchid, setBatchid] = useState("");
  const [report, setReport] = useState([]);

  useEffect(() => {
    const batchRef = ref(db, "batchlist");
    onValue(batchRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setBatchlist(arr);
    });
  }, []);

  useEffect(() => {
    if (!batchid) return;

    onValue(ref(db, `attendance/${batchid}`), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({
          id: item.key,
          attenddate: item.val().attenddate,
          studentlist: item.val().studentlist,
        });
      });
      setReport(arr);
    });
  }, [batchid]);

  return (
    <section className="mt-10">
      <div className="max-w-6xl m-auto">
        <div className="bg-blue-400 p-5 rounded-xl">
          <h2 className="mb-3">Attendance Report</h2>
          <Select
            options={batchlist}
            onChange={(e) => setBatchid(e.target.value)}
          />
        </div>

        {report.map((day) => (
          <div key={day.id} className="bg-blue-200 p-5 rounded-xl mt-5">
            <h3 className="mb-3 font-bold">Date: {day.attenddate}</h3>

            <table className="w-full">
              <thead>
                <tr>
                  <th className="pb-5 text-start">SL</th>
                  <th className="pb-5 text-start">Student Name</th>
                  <th className="pb-5 text-start">Status</th>
                </tr>
              </thead>
              <tbody>
                {day.studentlist.map((student, i) => (
                  <tr key={student.id}>
                    <td>{i + 1}</td>
                    <td>{student.studentname}</td>
                    <td>
                      {student.attend ? (
                        <p className="text-green-600 font-bold">Present</p>
                      ) : (
                        <p className="text-red-600 font-bold">Absent</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Attendreport;
