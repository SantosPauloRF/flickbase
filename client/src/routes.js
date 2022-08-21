import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/home";
import Header from "./components/navigation/header";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
