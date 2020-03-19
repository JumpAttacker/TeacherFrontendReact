import React, {Component} from "react";
import {Button, Form, Input, Select} from "antd";
import {LockOutlined, MailOutlined} from '@ant-design/icons';
import "./login_component.css"
import LoginProp from "../Views/LoginProp";
import {connect} from "react-redux";
import {updateSession} from "../store/system/actions";
import {thunkLogin, thunkSendMessage} from "../thunks";
import {AppState} from "../store";
import {SystemState} from "../store/system/types";
import {RegistrationState} from "../store/registration/types";

const { Option } = Select;

interface IRegistrationProp {
    history: LoginProp,
    registration: RegistrationState,
    system: SystemState,
    onRegistration: any,
    thunkLogin: any,
    subjects: [],
}

interface IState {
    login: string,
    password: string
}

function handleChange(value: any) {
    console.log(`selected ${value}`);
}

class Registration extends Component<IRegistrationProp, IState> {
    onFinish = (values: any) => {
        console.log('Success:', values);
        let {username, password} = values;
    };

    componentDidMount(): void {
        console.log(`props in registration: `, this.props)
    }

    render() {
        return (
            <>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined/>} placeholder="Почта"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: 'Please input your Password!'}]}
                        hasFeedback
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Пароль"
                        />
                    </Form.Item>

                    <Form.Item
                        name="Confirm password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({getFieldValue}) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject('Пароли не совпадают!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Подтвердить пароль"
                        />
                    </Form.Item>

                    <Form.Item
                        required
                        name="classNumber"
                        label={'Класс'}
                        hasFeedback
                        rules={[{ required: true, message: 'Необходимо выбрать класс' }]}
                    >
                        <Select onChange={handleChange}>
                            {[5,6,7,8,9,10,11].map((item: number, index: number)=>
                                <Option key={index} value={index}>{item}</Option>
                            )}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        required
                        name="subject"
                        label={'Предметы'}
                        hasFeedback
                        rules={[{ required: true, message: 'Необходимо выбрать предмет' }]}
                    >
                        <Select onChange={handleChange} mode="multiple" >
                            {this.props.registration.subjects.map((item: string, index: number)=>
                                <Option key={index} value={index}>{item}</Option>
                            )}
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                </Form>
            </>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    system: state.system,
    registration: state.registration
});

export default connect(
    mapStateToProps,
    {updateSession, thunkLogin, thunkSendMessage}
)(Registration);
