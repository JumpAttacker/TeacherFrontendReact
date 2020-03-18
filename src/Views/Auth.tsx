import React, {Component} from "react";
import {Col, Row, Tabs} from "antd";
import Login from "../components/login_component";
import './auth.css'
import HistoryProp from "./HistoryProp";

const {TabPane} = Tabs;

interface ITab {
    activeKey: string
}

export default class AuthView extends Component<HistoryProp, ITab> {
    state = {
        activeKey: '1',
    };

    componentDidMount() {
        console.log(this.props)
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
                        <TabPane tab="Регистрация" disabled={false} key="2">
                            Tab 2
                        </TabPane>
                    </Tabs>,
                </Col>
            </Row>
        );
    }
}
