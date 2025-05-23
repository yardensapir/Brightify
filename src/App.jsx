import BrightifyLanding from "./components/BrightifyLanding";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="App">
      <>
      <Navbar/>
        <BrightifyLanding />
        <Footer />
      </>
    </div>
  );
}

export default App;
