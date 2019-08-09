import React from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import '../App.css';

class RegisterUser extends React.Component {

    constructor() {
        super();
        this.state={}
    }    

    render() {
        return (
            <div className='register-form'>
                <h1>Register</h1>
                <Form>
                    <label>Username</label>
                    <Field type='text' name='username' placeholder='Username' />
                    {this.props.touched.username && this.props.errors.username && <p>{this.props.errors.username}</p>}

                    <label>Password</label>
                    <Field type='password' name='password' placeholder='Password'/>
                    {this.props.touched.password && this.props.errors.password && <p>{this.props.errors.password}</p>}
    
                    <label className='checkbox-container'>
                        I Accept the Terms of Service
                        <Field 
                        type='checkbox'
                        name='tos'
                        checked={this.props.values.tos}
                        />
                    </label>
                    {this.props.touched.tos && this.props.errors.tos && <p>{this.props.errors.tos}</p>}


                    <button type='submit'>Register</button>
                </Form>
            </div>
        )
    }   

}

const RegisterUserFormik = withFormik({
    mapPropsToValues({ username, password, tos }) {
        return {
            username: username || '',
            password: password || '',
            tos: tos || false
        };
    },

    validationSchema: Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().min(6, 'Enter 6 or more characters.').required(),
        tos: Yup.boolean().oneOf([true], 'Must accept Terms of Service')        
    }),

    handleSubmit(values) {
        console.log(values)
        axios.post('http://localhost:5000/api/register', values)
        .then(response => {
            console.log(response.data);
            this.setState(response.data);
        })
        .catch(error => {
            console.log('error in handleSubmit', error)
        })
    }

})(RegisterUser);

export default RegisterUserFormik;