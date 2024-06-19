export default {
    login: (axios, data) => axios.post('/api/auth/login', data),
    Register: (axios, data) => axios.post('/api/auth/registerUser', data)
  }
  