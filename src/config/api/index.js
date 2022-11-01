import  axios from 'axios'



const Api = axios.create({
    baseURL: `${process.env.REACT_APP_URL}api`,
})

Api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token
  config.headers.Authorization = token ? token : ''
  return config
})
// http://localhost:8000/api/auth/login

export const login = (data) => {
   return Api.post('/auth/login', {...data})
}


 export const uploadSigleImage = (data) => {
    return Api.post('/upload/single_image', data)
 }

 export const uploadMultipleImage = (data) => {
    return Api.post('/upload/multiple_image', data)
 }

export const delImage = (id) => {
   return Api.delete('/upload/delete_image/'+id)
}


//  category
 export const createCategory = (data) => {
   return Api.post('/category', data)
 }

 export const getCategories = () => {
   return Api.get('/category')
 }

 export const delCategories = (id) => {
   return Api.delete('/category/'+id)
 }

 export const updateCategory = (id, data) => {
   return Api.put('/category/'+id, data)
 }

// COMBO

export const createCombo = (data) => {
  return Api.post('/combo', data)
}

export const getCombos = () => {
  return Api.get('/combo')
}

export const delCombo = (id) => {
  return Api.delete('/combo/'+id)
}

export const updateCombo = (id, data) => {
  return Api.put('/combo/'+id, data)
}

//  product

export const createProcuct = (data) => {
   return Api.post('/product', {...data})
}

export const getProducts = () => {
   return Api.get('/product/')
 }

 export const getProduct = (id) => {
   return Api.get('/product/'+id)
 }

 export const delProduct = (id) => {
   return Api.delete('/product/'+id)
 }

 export const updateProduct = (id, data) => {
   return Api.put('/product/'+id, data)
 }

//  user role

export const createUserRole= (data) => {
  return Api.post('/role', {...data})
}

export const getUserRoles = () => {
  return Api.get('/role/')
}

export const getUserRole = (id) => {
  return Api.get('/role/'+id)
}

export const delUserRole = (id) => {
  return Api.delete('/role/'+id)
}

export const updateUserRole = (id, data) => {
  return Api.put('/role/'+id, data)
}

// user

export const createUser= (data) => {
  return Api.post('/user', {...data})
}

export const getUsers = (query) => {
   return query ? Api.get(`/user/by_position?name=${query}`) : Api.get(`/user/by_position`)
}

export const getUser = (id) => {
  return Api.get('/user/'+id)
}

export const delUser = (id) => {
  return Api.delete('/user/'+id)
}

export const updateUser = (id, data) => {
  return Api.put('/user/'+id, data)
}


// Order 

export const getOrdersApi= () => {
  return Api.get('/order/')
}