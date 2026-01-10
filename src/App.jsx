import React from "react";
import Layout from "./components/layout";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Addstudent from "./pages/Addstudent";
import Attendance from "./pages/Attendance";
import Attendreport from "./pages/Attendreport";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/addstudent" element={<Addstudent />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/attendancereport" element={<Attendreport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
