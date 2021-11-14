import { BrowserRouter as Router ,Route,Routes } from "react-router-dom";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import City from "./components/city/city";
import './App.css';
import PrivateRoute from './private-route/private-route';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route
              path="/city"
              element={
                <PrivateRoute>
                  <City />
                </PrivateRoute>
              }
            />
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
          </Routes >
        </div>
      </Router>
    </div>
  );
}

export default App;
