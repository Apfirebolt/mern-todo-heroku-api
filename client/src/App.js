import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import PrivateRoute from "./components/common/ProtectedRoute";
import HomePage from "./views/Home";
import LoginPage from "./views/LoginView";
import RegisterPage from "./views/RegisterView";
import ToDoPage from "./views/todo/Home";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/todos"
          element={
            <PrivateRoute>
              <ToDoPage />
            </PrivateRoute>
          }
          exact
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
