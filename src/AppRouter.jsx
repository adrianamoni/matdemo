import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import FritDashboard from "./components/FritDashboard";
import Home from "./components/Home";
import Charts from "./components/Charts";
import Table from "./components/Table";
import NoMatch from "./components/NoMatch";
import Layout from "./layout/Layout";
import FetchData from "./components/FetchData";
import useWindowSize from "./components/customHooks/UseWindowsSize";
import { pageSizeContext } from "./context/ContextProvider";

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
            <Route path="table" element={<Table />} />
            <Route path="charts" element={<Charts />} />
            <Route path="fetch-data" element={<FetchData />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
