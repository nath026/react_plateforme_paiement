import './App.css';
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";
import Home from "./Components/Shop/Home";
import Shop from "./Components/Shop/Shop";
import TraderLogin from "./Components/Trader/TraderLogin";
import AdminLogin from "./Components/Admin/AdminLogin";
import TraderDisplayAll from './Components/Trader/TraderDisplayAll';
import TraderRegister from "./Components/Trader/TraderRegister";
import Transactions from "./Components/Transactions";
// import ArticleDisplayAll from './Components/Article/ArticleDisplayAll';
// import ArticleRegister from "./Components/Article/ArticleRegister";
// import TraderTest from './Components/Trader/TraderTest';
import Page from "./Components/Page";
import Header from "./Components/Header";
import ShowItem from "./Components/Cart/ShowItem";
import Credentials from "./Components/Admin/Credentials";
import CredentialProvider from "./Contexts/CredentialContext";
import ListProvider from "./Contexts/ListContext";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <CredentialProvider>
                {/* <Link to="/trader"> Show All Trader</Link> */}
                <Link to="/traderlogin"> Login as Trader</Link>
                <Link to="/traderregister"> Register as Trader</Link>
                <br></br>
                {/* <Link to="/article"> Show All Articles</Link>
                <Link to="/article-register"> Add Articles</Link> */}
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
                        <Route exact path="/account">
                            <Header />
                            <Credentials />
                        </Route>
                        <ListProvider>
                            <Route exact path="/">
                                <Page />
                            </Route>
                            <Route exact path="/items/:id">
                                <Header />
                                <ShowItem />
                            </Route>
                            <Route exact path="/transactions">
                                <Home/>
                                <Transactions />
                            </Route>
                        </ListProvider>
                        {/* <Route exact path="/article">
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
                        </Route> */}
                    </Switch>
                </CredentialProvider>
            </BrowserRouter>
        </div>

    );
}

export default App;
