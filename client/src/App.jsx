import React from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/SignUp";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import UpdateProduct from "./components/UpdateProduct";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Navbar */}
        <Nav />
        {/* Page Content */}
        <div className="flex-grow p-6">
          <Routes>
            <Route element={<PrivateComponent />}>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-gray-100 px-4 py-6">
                      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Product List
                      </h1>

                      <ProductList />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route path="/add" element={<h1 className="text-3xl font-bold">{<AddProduct />}</h1>} />
              <Route path="/update" element={<h1 className="text-3xl font-bold">{<UpdateProduct />}</h1>} />
              <Route path="/update/:id" element={<h1 className="text-3xl font-bold">{<UpdateProduct />}</h1>} />
              <Route path="/logout" element={<h1 className="text-3xl font-bold">Logout</h1>} />
              <Route path="/profile" element={<h1 className="text-3xl font-bold">{<Profile />}</h1>} />
            </Route>
            <Route path="/signup" element={<h1 className="text-3xl font-bold"><Signup /></h1>} />
            <Route path="/login" element={<h1 className="text-3xl font-bold"><Login /></h1>} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />

      </div>
    </BrowserRouter>
  );
};

export default App;
