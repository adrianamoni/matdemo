import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import FritDashboard from "./components/fritDashboardComps/orderDetail/FritDashboard";
import Home from "./components/Home";
import Charts from "./components/Charts";
import Table from "./components/Table";
import NoMatch from "./components/NoMatch";
import Layout from "./layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useWindowSize from "./components/customHooks/UseWindowsSize";
import { pageSizeContext } from "./context/ContextProvider";
import Test from "./components/Test";
import MonthlyCleaning from "./components/fritdashboardComps/cleaning/MonthlyCleaning";
import Init from "./components/Init";
import OperatorAssignment from "./components/screens/OperatorAssignment/OperatorAssignment";
import OperatorDeAssignment from "./components/screens/OperatorDeAssignment/OperatorDeAssignment";

const AppRouter = () => {
  const { setPageSize } = useContext(pageSizeContext);
  const size = useWindowSize();

  //useEffect for hiding the switch on table layout
  useEffect(() => {
    console.log("size", size);
    setPageSize(size);
  }, [size]);
  useEffect(() => {
    setPageSize(size);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="frit-dashboard" element={<FritDashboard />} />
            <Route path="frit-dashboard/:slug" element={<FritDashboard />} />
            <Route path="limpieza-periodica" element={<MonthlyCleaning />} />
            <Route path="table" element={<Table />} />
            <Route path="charts" element={<Charts />} />
            <Route path="asignacion" element={<OperatorAssignment />} />
            <Route path="desasignacion" element={<OperatorDeAssignment />} />

            <Route path="test" element={<Test />} />
            <Route path="init" element={<Init />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
