import axios from 'axios'

let userRegistered = false;

export const login = user => {
  return axios
    .post('http://localhost:5000/login', {
      username: user.username,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })

}

export const signup = user => {
  return axios.post('http://localhost:5000/register', {
    name: user.name,
    username: user.username,
    password: user.password,
  })
    .then(response => {
      console.log('Registered')
      userRegistered = true;
    })
    .catch(err => {
      console.log("ERROR!!")
    })
}

export { userRegistered };