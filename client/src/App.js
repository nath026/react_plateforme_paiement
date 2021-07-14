import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./Components/Shop/Home";
import Shop from "./Components/Shop/Shop";
// import TraderLogin from "./Components/Trader/TraderLogin";
import AdminLogin from "./Components/Admin/AdminLogin";
import TraderDisplayAll from './Components/Trader/TraderDisplayAll';


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/shop">
                        <Home/>
                        <Shop/>
                    </Route>
                    <Route exact path="/trader">
                        <Home/>
                        {/* <TraderLogin /> */}
                        <TraderDisplayAll/>
                    </Route>
                    <Route exact path="/admin">
                        <Home/>
                        <AdminLogin/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>

    );
}

export default App;
