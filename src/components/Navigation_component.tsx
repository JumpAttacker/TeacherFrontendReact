import {Menu} from "antd";
import {Link} from "react-router-dom";
import React, {Component} from "react";

interface IData {
    item: object,
    key: number,
    keyPath: string,
    domEvent: string
}

export default class NavigationComponent extends Component {
    onClick = (ClickParam: IData | any) => {
        let {keyPath} = ClickParam;
        console.log(keyPath);
    };

    render() {
        return (
            <>
                <div className="logo"/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{lineHeight: '64px'}}
                    onClick={this.onClick}
                >
                    <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/auth">Auth</Link></Menu.Item>
                </Menu>
            </>
        )
    }
}


