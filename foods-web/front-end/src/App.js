import './App.css';
import  CustomRouter  from './router.js';
import { BrowserRouter as Router } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <CustomRouter />
      </Router>
    </div>
  );
}

export default App;
