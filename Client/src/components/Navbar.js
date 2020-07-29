import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Avatar from 'react-avatar';
import { logout, liveUser } from './userFunctions';
import jwt_decode from 'jwt-decode'
import Tooltip from '@material-ui/core/Tooltip';

const heading = {
  color: 'white',
  marginTop: '-5px',
}
export class Navbar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      username: '',
      names: [],
    }
  };
  logOut(e) {
    e.preventDefault()

    const data = {
      username: this.state.username,
      token: this.state.token,
    }
    //console.log(data);
    logout(data).then(res => {
      if (!localStorage.usertoken) {
        this.props.history.push(`/`);
      }
    })
  }

  componentDidMount = () => {
    if (localStorage.length > 0) {
      const token = localStorage.usertoken
      const decoded = jwt_decode(token)
      liveUser().then(res => {
        this.setState({ names: res.data })
      })
      console.log(this.state.names);
      this.setState({
        name: decoded.name,
        token: token
      })

    }
  }


  render() {

    const {
      names,
    } = this.state;



    const withOutUser = (
      <h5 className='content' style={{ color: 'white' }}>Welcome user</h5>
    )

    const withUser = (
      <h5 className='content' style={{ color: 'white' }}>Welcome</h5>
    )
    const withOutLogin = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link style={heading} to="/login" className="nav-link">
            Login
                </Link>
        </li>
        <li className="nav-item">
          <Link style={heading} to="/register" className="nav-link">
            Register
                </Link>
        </li>
      </ul>
    )


    const withLogin = (



      <ul className="navbar-nav">
        <li className="nav-item" style={{ marginRight: '400px', marginTop: '8px' }}>
          <a style={heading} href="" onClick={this.logOut.bind(this)} className="nav-link">
            Logout
              </a>
        </li>
        {names.map(name => {
          return (
            <li className="nav-item" style={{ marginLeft: '-20px', position: 'right' }}><Tooltip title={name.name}><Avatar name={name.name} round={true} size='50px' /></Tooltip></li>
          );
        })}
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {localStorage.usertoken ? withUser : withOutUser}

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10" >
          <ul className="navbar-nav">
            <li className="nav-item" style={{ position: "static" }}>
              <Link style={heading} to="/" className="nav-link">
                Home
                  </Link>
            </li>
          </ul>
          {localStorage.usertoken ? withLogin : withOutLogin}
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)
