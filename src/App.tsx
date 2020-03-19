import React, {Component} from 'react';
import {Layout} from 'antd';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AuthView from './Views/Auth';
import NavigationComponent from "./components/Navigation_component";

import {thunkLoadSubjects, thunkLogin, thunkLogout, thunkSendMessage} from "./thunks";
import {connect} from "react-redux";
import {updateSession} from "./store/system/actions";
import {AppState} from "./store";
import {SystemState} from "./store/system/types";
import axios from 'axios';

const {Header, Content, Footer} = Layout;

interface IAppProps {
    updateSession: typeof updateSession;
    system: SystemState;
    thunkSendMessage: any;
    thunkLogout: any;
}

class App extends Component<IAppProps> {
    state = {
        date: null,
    };

    componentDidMount(): void {
        if (this.props.system.session) {
            axios.defaults.headers.common.Authorization =
                "Bearer " + this.props.system.session;
        }

        axios.interceptors.response.use(undefined, function (err) {
            return new Promise(function (resolve, reject) {
                console.log(`axios error:`, err);
                //dat.$store.dispatch("Logout");
                if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                    // if you ever get an unauthorized, logout the user
                    // this.$store.dispatch("Logout");
                    // you can also redirect to /login if needed !
                }
                throw err;
            });
        });
    }

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

const mapStateToProps = (state: AppState) => ({
    system: state.system,
});

export default connect(
    mapStateToProps,
    {updateSession, thunkSendMessage, thunkLogin, thunkLogout,thunkLoadSubjects}
)(App);
