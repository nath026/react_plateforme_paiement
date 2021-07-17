import './App.css';
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";
import Home from "./Components/Shop/Home";
import Shop from "./Components/Shop/Shop";
import TraderLogin from "./Components/Trader/TraderLogin";
import AdminLogin from "./Components/Admin/AdminLogin";
import TraderDisplayAll from './Components/Trader/TraderDisplayAll';
import TraderRegister from "./Components/Trader/TraderRegister";
import ArticleDisplayAll from './Components/Article/ArticleDisplayAll';
import ArticleRegister from "./Components/Article/ArticleRegister";
import TraderTest from './Components/Trader/TraderTest';


function App() {
    return (
        <div className="App">
            <BrowserRouter>
            <Link to="/trader"> Show All Trader</Link>
            <Link to="/traderlogin"> Login as Trader</Link>
            <Link to="/traderregister"> Register as Trader</Link>
            <br></br>
            <Link to="/article"> Show All Articles</Link>
            <Link to="/article-register"> Add Articles</Link>
                <Switch>
                    <Route exact path="/shop">
                        <Home/>
                        <Shop/>
                    </Route>
                    <Route exact path="/trader">
                        <Home/>
                        <TraderDisplayAll/>
                    </Route>
                    <Route exact path="/traderlogin">
                        <Home/>
                        <TraderLogin />
                    </Route>
                    <Route exact path="/traderregister">
                        <Home/>
                        <TraderRegister />
                    </Route>
                    <Route exact path="/admin">
                        <Home/>
                        <AdminLogin/>
                    </Route>
                    <Route exact path="/article">
                        <Home/>
                        <ArticleDisplayAll/>
                    </Route>
                    <Route exact path="/test">
                        <Home/>
                        <TraderTest/>
                    </Route>
                    <Route exact path="/article-register">
                        <Home/>
                        <ArticleRegister/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>

    );
}

export default App;
