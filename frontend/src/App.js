import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RoutesConfig from "./routes";
import { AuthProvider } from "./utils/auth";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className="container mt-4">
        <RoutesConfig />
      </div>
      <Footer />
    </AuthProvider>
  );
}

export default App;
