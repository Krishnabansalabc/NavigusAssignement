import React, { Component } from 'react'
import { signup } from './userFunctions'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            name: '',
            errors: {}
        }

        this.changeInput = this.changeInput.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    changeInput(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    submitHandler(e) {
        e.preventDefault()

        const data = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
        }
        signup(data).then(res => {
            if (res) {
                this.props.history.push('/login');
            } else {
                alert("username already defined");
                this.props.history.push('/register');
            }
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.submitHandler}>
                            <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
                            <div className="form-group">
                                <label htmlFor="text">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Enter Name"
                                    value={this.state.name}
                                    onChange={this.changeInput}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">UserName</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    placeholder="Enter Username"
                                    value={this.state.username}
                                    onChange={this.changeInput}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.changeInput}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block"
                            >
                                Register
              </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;