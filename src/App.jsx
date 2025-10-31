import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminPage from "./components/AdminPage";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};
// How this works
// If user exists → allow access to that page.
// If not logged in → redirect to /login.




// ✅ Navbar hide logic
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/admin";
  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};


export default function App() {
  return (
    <>

      <AuthProvider>
        <BrowserRouter>
          {/* ✅ Wrap routes inside Layout to control Navbar visibility */}
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />

              {/* ✅ Admin route added */}
              <Route
                path="/admin"
                element={
                  // <AdminRoute>
                  <AdminPage />
                  // </AdminRoute>
                }
              />


            </Routes>
          </Layout>

        </BrowserRouter>

      </AuthProvider>

      <footer style={{ textAlign: "center", padding: "20px", marginTop: "40px", color: "#888" }}>
        © {new Date().getFullYear()} Created by <strong>Gokul Selvan</strong>
      </footer>

    </>
  );
}
