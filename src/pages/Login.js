import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'commons/axios';
import { toast } from 'react-toastify';

export default function Login(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async data => {
        // 2. 获取表单数据
        console.log(data);

        // 3. 处理登录逻辑
        try {
            const { email, password } = data;
            const res = await axios.post('/auth/login', { email, password });
            const jwToken = res.data;
            console.log(jwToken);
            global.auth.setToken(jwToken);
            toast.success('Login Success');

            props.history.push('/');   // 4. 跳转到首页视图
        } catch (error) {
            const message = error.response.data.message;
            toast.error(message);
        }
    };
    //console.log(errors);

    return (
        <div className="login-wrapper">
            <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input
                            className={`input ${errors.email && 'is-danger'}`}
                            type="text"
                            placeholder="Email"
                            name="email"
                            {...register("email",
                                {
                                    required: 'email is required',
                                    pattern: {
                                        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'invalid email'
                                    }
                                }
                            )}
                        />
                        {errors.email && (
                            <p className="helper has-text-danger">{errors.email.message}</p>
                        )}
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input
                            className={`input ${errors.password && 'is-danger'}`}
                            type="password"
                            placeholder="Password"
                            name="password"
                            {...register("password",
                                {
                                    required: 'password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'cannot be less than 6 digits'
                                    }
                                }
                            )}
                        />
                        {errors.password && (
                            <p className="helper has-text-danger">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="control">
                    <button className="button is-fullwidth is-primary">Login</button>
                </div>
            </form>
        </div>
    );
}