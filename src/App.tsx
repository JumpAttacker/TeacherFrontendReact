import React, {Component} from 'react';
import {Layout, Menu} from 'antd';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import AuthView from './Views/Auth';
import NavigationComponent from "./components/Navigation_component";

const {Header, Content, Footer} = Layout;

class App extends Component<any> {
    state = {
        date: null,
    };
    render() {
        return (
            <Router>
                <Layout className="layout">
                    <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                        <NavigationComponent/>
                    </Header>
                    <Content style={{margin: '15px', marginTop: 76}}>
                        <div className="site-layout-content">
                            <Switch>
                                <Route path="/auth" component={AuthView}/>
                                <Route path="/" component={Home}/>
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Router>
        );
    }
}


function Home() {
    return <h2>Home</h2>;
}

export default App;
