import React, {Component} from "react";
import {Button, Checkbox, Form, Input, message} from "antd";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import "./login_component.css"
import LoginProp from "../Views/LoginProp";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {updateSession} from "../store/system/actions";
import {thunkLogin, thunkLogout, thunkSendMessage} from "../thunks";
import {AppState} from "../store";
import {SystemState} from "../store/system/types";

interface ILoginProp {
    history: LoginProp
    onRegistration: any,
    thunkLogin: any,
    thunkLogout: any,
    system: SystemState;
}

interface IState {
    login: string,
    password: string
}

const key = 'loadingState';
const openMessage = (system: SystemState) => {
    if (system.isLoading)
        message.loading({content: 'Загрузка...', key});
    else if (system.loggedIn)
        message.success({content: system.message, key, duration: 5});
    else
        message.error({content: system.message, key, duration: 5});
};

class Login extends Component<ILoginProp, IState> {
    clickAction = () => {
        console.log(this.props);
        this.props.onRegistration();
    };

    onFinish = (values: any) => {
        console.log('Success:', values);
        let {username, password} = values;
        this.props.thunkLogin(username, password);
    };

    componentDidMount(): void {
        console.log(`props: `, this.props)
    }

    componentDidUpdate(prevProps: Readonly<ILoginProp>, prevState: Readonly<IState>, snapshot?: any): void {
        if (!prevProps.system.loggedIn)
            openMessage(this.props.system);
        console.log('system:', this.props.system)
    }

    render() {
        return (
            <>
                {this.props.system.loggedIn && this.props.system.userName &&
                <h3>{this.props.system.userName}, добро пожаловать!</h3>}

                {!this.props.system.loggedIn && <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{remember: true}}
                    onFinish={this.onFinish}
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
                        <Input.Password
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
                </Form>}

                {this.props.system.loggedIn &&
                <div style={{textAlign: "center"}}>
                    <Button danger type='primary' onClick={this.props.thunkLogout}>
                        Выйти из аккаунта
                    </Button>
                </div>
                }
            </>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    system: state.system,
});

export default connect(
    mapStateToProps,
    {updateSession, thunkLogin, thunkSendMessage, thunkLogout}
)(Login);
