import React, {Component} from "react";
import {Col, Row, Tabs} from "antd";
import Login from "../components/login_component";
import './Auth.css'
import LoginProp from "./LoginProp";
import {AppState} from "../store";
import {connect} from "react-redux";
import {updateSession} from "../store/system/actions";
import {thunkLoadSubjects, thunkLogin, thunkSendMessage} from "../thunks";
import Registration from "../components/registration_component";

const {TabPane} = Tabs;

interface ITab {
    activeKey: string
}

class AuthView extends Component<LoginProp, ITab> {
    state = {
        activeKey: '1',
    };

    componentDidMount() {
        console.log(this.props);
        this.props.thunkSendMessage("This message was sent by a thunk!");
        this.props.thunkLoadSubjects();
    }

    selectTab = (tabIndex: string) => {
        this.setState({
            activeKey: tabIndex
        });
    };

    onChange = (key: string) => {
       this.selectTab(key);
        console.log(key)
    };

    myCallback = () => {
        this.selectTab('2');
    };

    render() {
        return (
            <Row justify="center">
                <Col span={4} style={{padding: '5px'}}>
                    <Tabs defaultActiveKey="1" activeKey={this.state.activeKey} onChange={this.onChange}
                          className='auth_form'>
                        <TabPane tab="Войти" key="1">
                            <Login onRegistration={this.myCallback} history={this.props}/>
                        </TabPane>
                        <TabPane tab="Регистрация" disabled={this.props.system.loggedIn} key="2">
                            <Registration onRegistration={this.myCallback} history={this.props}/>
                        </TabPane>
                    </Tabs>,
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    system: state.system,
});

export default connect(
    mapStateToProps,
    {updateSession, thunkSendMessage, thunkLogin,thunkLoadSubjects}
)(AuthView);
