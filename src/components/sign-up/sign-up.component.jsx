import React, { Component } from 'react'

import './sign-up.styles.scss'

import FormInput from '../form-input/form-input.component';

export class SignIn extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name: '',
             email: '',
             password: '',
             confirmPassword: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleSubmit(e){
        e.preventDefault();
        this.setState({
            email: '',
            password: ''
        })
    }

    handleChange(event){
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div className="sign-up">
                <h2>I don't have an account</h2>
                <span>Sign up with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name="name"
                        type='text'
                        label='Name'
                        value={this.state.email}
                        required
                        handleChange={this.handleChange}
                    />
                    <FormInput 
                        name="email"
                        type='email'
                        label='Email'
                        value={this.state.email}
                        required
                        handleChange={this.handleChange}
                    />
                    <FormInput 
                        name="password"
                        type='password'
                        label='Password'
                        value={this.state.password}
                        required
                        handleChange={this.handleChange}
                    />
                    <FormInput 
                        name="confirm password"
                        type='password'
                        label='Confirm Password'
                        value={this.state.password}
                        required
                        handleChange={this.handleChange}
                    />
                    <input type='submit' value='Submit Form' />
                </form>
            </div>
        )
    }
}

export default SignIn
