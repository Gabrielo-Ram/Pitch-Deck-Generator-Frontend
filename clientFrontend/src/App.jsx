import { useState } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AIGui from "./components/AIGui";
import IntelForm from "./components/IntelForm";
import Home from "./components/Home";
import PrivacyPolicy from "./components/Policy";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<IntelForm />} />
        <Route path="/chat" element={<AIGui />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
    // <div>
    //   <Navbar />
    //   <Chat />
    // </div>
  );
}

export default App;
