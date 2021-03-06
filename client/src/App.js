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
import ListProvider from "./Contexts/ListContext";
import Page from "./Components/Page";
import Header from "./Components/Header";
import ShowItem from "./Components/Cart/ShowItem";
import TraderTest from './Components/Trader/TraderTest';
import AdminDisplayAllCredentials from './Components/Admin/AdminDisplayAllCredentials';
import Credentials from './Components/Admin/Credentials';
import CredentialProvider from "./Contexts/CredentialContext";



function App() {
    return (
        <div className="App">
            <BrowserRouter>
            <Link to="/trader"> Show All Trader</Link>
            <Link to="/traderlogin"> Login as Trader</Link>
            <Link to="/traderregister"> Register as Trader</Link>
            <br></br>
            <Link to="/credentials/all"> Show All Credentials</Link>
            <Link to="/credentials"> Show my Credentials</Link>
            <CredentialProvider>
                <Switch>
                <Route exact path="/credentials/all">
                    <AdminDisplayAllCredentials/>
                </Route>
                <Route exact path="/credentials">
                    <Credentials/>
                </Route>
                </Switch>
            </CredentialProvider>
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
                    <Route exact path="/test">
                        <Home/>
                        <TraderTest/>
                    </Route>
                    <Route exact path="/transactions">
                        <Home/>
                        <Transactions />
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
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
