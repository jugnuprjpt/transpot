import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Loading from "@/components/Loading";
import ProtectedRoute from "@/components/ProtectedRoute";

const Dashboard = lazy(() => import("./pages/dashboard"));
const Login = lazy(() => import("./pages/auth/login"));
const Error = lazy(() => import("./pages/404"));
const LoadManagment = lazy(() => import("./pages/loadManagment/LoadManagment"));
const DocumentManagement = lazy(() =>
  import("./pages/documentManagement/DocumentManagement")
);
const LoadAddModifyForm = lazy(() =>
  import("./pages/LoadAddModify/LoadAddModifyForm")
);
const BriefCase = lazy(() => import("./pages/BriefCase/BriefCase"));

function App() {
  return (
    <main className="App relative">
      <Routes>
        {/* Public route */}
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          {" "}
          <Route path="/*" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="loadManagement" element={<LoadManagment />} />
            <Route path="documentManagement" element={<DocumentManagement />} />
            <Route path="loadAddModify" element={<LoadAddModifyForm />} />
            <Route path="briefCase" element={<BriefCase />} />
            {/* <Route path="loadTab" element={<LoadTab />} /> */}
            <Route path="*" element={<Navigate to="/404" />} />
          </Route>
        </Route>

        {/* Error page */}
        <Route
          path="/404"
          element={
            <Suspense fallback={<Loading />}>
              <Error />
            </Suspense>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
