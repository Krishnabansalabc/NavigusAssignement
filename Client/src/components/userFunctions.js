import axios from 'axios'

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
    token: "",
  })
    .then(response => {
      console.log('Registered')
      return response.data;
    })
    .catch(err => {
      console.log("ERROR!!")
    })
}

export const logout = user => {
  return axios.post('http://localhost:5000/logout', {
    username: user.username,
    token: user.token
  }).then(response => {
    console.log(response)
    localStorage.removeItem('usertoken');
  }).catch(err => {
    console.log(err)
  })
}

export const liveUser = user => {
  return axios.post('http://localhost:5000/liveuser')
    .then(response => {
      return response;
    }).catch(err => {
      console.log(err);
    })
}
