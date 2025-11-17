import { Outlet } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import { Footer } from "./components/shared/Footer";
import ScrollToTop from "./utils/ScrollToTop";
import ScrollToTopButton from "./utils/ScrollToTopButton";

function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <div className="min-h-[calc(100vh-196px)] ">
        <Outlet />
      </div>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}

export default App;
