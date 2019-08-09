import React from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import '../App.css';

class RegisterUser extends React.Component {

    constructor() {
        super();
        this.state={
            userData: []
        }
    }    

    getHandleSubmit = () => {
        axios.get('http://localhost:5000/api/restricted/data')
       .then(response => {
        //    console.log('response from axios.get:', response);
           this.setState({userData: response.data});
           console.log('get request response:', this.state.userData)
       })
       .catch(error => {
           console.log('error in getHandleSubmit', error)
       })
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

                    <button type='submit' onClick={() => {this.getHandleSubmit()}}>Register</button>
                </Form>

                {this.state.userData.map(item => {
                    return(
                        <div key={item.name}>
                            <p>{item.name}</p>
                        </div>
                    )
                    
                })}

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
        username: Yup.string().required('A username is required to register'),
        password: Yup.string().min(6, 'Enter 6 or more characters.').required('A password is required to register'),
        tos: Yup.boolean().oneOf([true], 'Must accept Terms of Service')        
    }),

    handleSubmit(values, { resetForm }) {
        console.log(values)
        axios.post('http://localhost:5000/api/register', values)
        .then(response => {
            console.log('Posted:', response.data);
            // this.setState(response.data);
            resetForm();
        })
        .catch(error => {
            console.log('error in handleSubmit', error)
        })
    }

 

})(RegisterUser);

export default RegisterUserFormik;