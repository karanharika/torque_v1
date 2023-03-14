import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import Inventory from "./components/Inventory/Inventory";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PartFinder from "./components/PartFinder/PartFinder";

import { Toaster } from "react-hot-toast";
import Menu from "./components/nav/Menu";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/admin/Dashboard";
import AdminCategory from "./pages/admin/Category";
import AdminPart from "./pages/admin/Part";
import Search from "./pages/Search";
import AdminMake from "./pages/admin/AddMake";
import AdminModel from "./pages/admin/Model";
import AdminParts from "./pages/admin/Parts";
import AdminPartUpdate from "./pages/admin/PartUpdate";
// import Inventory from "./pages/Inventory";
import PartView from "./pages/PartView";
import CategoriesList from "./pages/CategoriesList";
import CategoryView from "./pages/CategoryView";
import AdminRoute from "./components/routes/AdminRoute";

class App extends Component {
  render() {
    return (
      <Router>
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/partfinder" element={<PartFinder />} />
          <Route path="/contact" element={<Contact />} />














          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/categories" element={<CategoriesList />} />
          <Route path="/category/:slug" element={<CategoryView />} />
          <Route path="/search" element={<Search />} />
          <Route path="/part/:slug" element={<PartView />} />
          <Route path="/dashboard" element={<AdminRoute />} >
            <Route path="admin" element={<Dashboard />} />
            <Route path="admin/category" element={<AdminCategory />} />
            <Route path="admin/part" element={<AdminPart />} />
            <Route path="admin/part/update/:slug" element={<AdminPartUpdate />} />
            <Route path="admin/parts" element={<AdminParts />} />
            <Route path="admin/make" element={<AdminMake />} />
            <Route path="admin/model" element={<AdminModel />} />
          </Route>











        </Routes>

        <Footer />
      </Router>
    );
  }
}

export default App;
