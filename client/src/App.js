import './App.css';
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";
import Home from "./Components/Shop/Home";
import Shop from "./Components/Shop/Shop";
import TraderLogin from "./Components/Trader/TraderLogin";
import AdminLogin from "./Components/Admin/AdminLogin";
import TraderDisplayAll from './Components/Trader/TraderDisplayAll';
import TraderRegister from "./Components/Trader/TraderRegister";
import TraderProvider from "./Contexts/TraderContext";
import {ArticleContext} from "./Contexts/ArticleContext";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
            <Link to="/trader"> Show All Trader</Link>
            <Link to="/traderlogin"> Login as Trader</Link>
            <Link to="/traderregister"> Register as Trader</Link>
                <Switch>
                    <Route exact path="/">
                        <TraderProvider>
                            <Home/>
                        </TraderProvider>
                    </Route>
                    <Route exact path="*/shop">
                        <ArticleContext>
                            <Shop/>
                        </ArticleContext>

                    </Route>
                    <Route exact path="/trader">
                        <TraderDisplayAll/>
                    </Route>
                    <Route exact path="/traderlogin">
                        <TraderLogin />
                    </Route>
                    <Route exact path="/traderregister">
                        <TraderRegister />
                    </Route>
                    <Route exact path="/admin">
                        <AdminLogin/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>

    );
}

export default App;
