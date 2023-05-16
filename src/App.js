import React from "react";
import { MailPage } from "./pages/MailPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
