import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/home";
import Header from "./components/navigation/header";
import MainLayout from "./hoc/mainLayout";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default Router;
