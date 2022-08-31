//REACT
import { useState, useEffect } from "react";
//REACT DOM
import { BrowserRouter, Routes, Route } from "react-router-dom"
//STORE
import { useDispatch, useSelector } from "react-redux"
import { isAuth } from "./store/actions/users"
//UTILS
import { Loader } from "./utils/tools"
//PAGES
import Home from "./components/home";
import Header from "./components/navigation/header";
import MainLayout from "./hoc/mainLayout";
import Auth from "./components/auth";
import Article from "./components/articles/article";
import AccountVerify from "./components/auth/verification";
//DASHBOARD PAGES
import Dashboard from "./components/dashboard";
import AdminProfile from "./components/dashboard/profile";
import AdminArticles from "./components/dashboard/articles";
import DashboardMain from "./components/dashboard/main";
import AddArticle from "./components/dashboard/articles/edit_add/add";
import EditArticle from "./components/dashboard/articles/edit_add/edit";
//GUARDS
import AuthGuard from "./hoc/authGuard";

function Router() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  useEffect(() => {
    dispatch(isAuth())
  },[])
  
  useEffect(() => {
    if(users.auth !== null){
      setLoading(false)
    }
  },[users])

  return (
    <BrowserRouter>
      {loading ?
        <Loader /> 
        :
        <>
        <Header />
        <MainLayout>
          <Routes>

            <Route path="/dashboard" element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }>
              <Route index element={<DashboardMain />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="articles" element={<AdminArticles />} />
              <Route path="articles/add" element={<AddArticle />} />
              <Route path="articles/edit/:articleId" element={<EditArticle />} />
            </Route>

            <Route path="/verification" element={<AccountVerify />} />
            <Route path="/articles/article/:id" element={<Article />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </MainLayout>
        </>
      }
    </BrowserRouter>
  );
};

export default Router;
