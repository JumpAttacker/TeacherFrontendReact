import React, {Component} from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import "./login_component.css"
import HistoryProp from "../Views/HistoryProp";
import {Link} from "react-router-dom";

interface ILoginProp {
    history: HistoryProp
    onRegistration: any
}

// const {  UserOutlined, LockOutlined  } = icons;

interface IState {
    login: string,
    password: string
}

const onFinish = (values: any) => {
    console.log('Success:', values);
};

class Login extends Component<ILoginProp, IState> {
    state = {
        login: '',
        password: ''
    };
    clickAction = () => {
        console.log(this.props);
        this.props.onRegistration();
    };

    render() {
        return (
            <>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{required: true, message: 'Please input your Username!'}]}
                    >
                        <Input placeholder="Логин или почта" prefix={<UserOutlined className="site-form-item-icon"/>}/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: 'Please input your Password!'}]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Пароль"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Запомнить меня</Checkbox>
                        </Form.Item>
                        <Link className="login-form-forgot" to="/resetPassword">Забыли пароль</Link>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Войти
                        </Button>
                        <>или</>
                        <Button type="link" onClick={this.clickAction.bind(this)}>зарегистрироваться сейчас!</Button>
                    </Form.Item>
                </Form>
            </>
        );
    }
}

export default Login;
