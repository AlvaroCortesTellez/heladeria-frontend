import React from "react";
import AuthProvider from "./components/auth/AuthProvider";
import Login from "./components/auth/Login";
import Home from "./pages/Home";

function App() {
  return (
    <AuthProvider>
      <Login />
      <Home />
    </AuthProvider>
  );
}

export default App;
