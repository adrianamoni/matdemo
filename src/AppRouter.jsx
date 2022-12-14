import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import FritDashboard from "./components/fritDashboardComps/orderDetail/FritDashboard";

import Table from "./components/Table";
import NoMatch from "./components/NoMatch";
import Layout from "./layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useWindowSize from "./components/customHooks/UseWindowsSize";
import { pageSizeContext } from "./context/ContextProvider";
import Test from "./components/Test";
import MonthlyCleaning from "./components/fritdashboardComps/cleaning/MonthlyCleaning";
import OperatorAssignment from "./components/screens/OperatorAssignment/OperatorAssignment";
import OperatorDeAssignment from "./components/screens/OperatorDeAssignment/OperatorDeAssignment";
import OrderManager from "./components/fritDashboardComps/OrderManagement/OrderManager";
import InterruptionManager from "./components/fritdashboardComps/interruptionManagement/InterruptionManager";
import SequencingGateway from "./components/fritdashboardComps/sequencing/SequencingGateway";
import Init from "./components/Init";
import TimelineTest from "./components/fritdashboardComps/sequencing/TimelineTest";

const AppRouter = () => {
  const pageSizeCtxt = useContext(pageSizeContext);
  const size = useWindowSize();
  /*   const history = useContext(HistoryContext); */
  //useEffect for hiding the switch on table layout
  useEffect(() => {
    size && pageSizeCtxt && pageSizeCtxt.setPageSize(size);
  }, [size]);
  useEffect(() => {
    size && pageSizeCtxt && pageSizeCtxt.setPageSize(size);
  }, []);

  return (
    <>
      <HashRouter history={history}>
        {/*  <BrowserRouter> */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="about" element={<About />} />
            {/*        <Route path="dashboard" element={<Dashboard />} /> */}
            <Route path="detalle-orden" element={<FritDashboard />} />
            <Route path="detalle-orden/:slug" element={<FritDashboard />} />
            <Route path="limpieza-periodica" element={<MonthlyCleaning />} />
            <Route path="table" element={<Table />} />
            <Route path="asignacion" element={<OperatorAssignment />} />
            <Route path="ordenes" element={<OrderManager />} />
            <Route path="gestor-paros" element={<InterruptionManager />} />
            <Route path="secuenciacion" element={<SequencingGateway />} />
            <Route path="desasignacion" element={<OperatorDeAssignment />} />

            <Route path="test" element={<Test />} />
            <Route path="timeline-test" element={<TimelineTest />} />

            <Route path="init" element={<Init />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
        <ToastContainer />
        {/* </BrowserRouter> */}
      </HashRouter>
    </>
  );
};

export default AppRouter;
