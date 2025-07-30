const storeAuthToken = (value) => {
  localStorage.setItem('authtoken', value)
}
const storeEmailID = (value) => {
  localStorage.setItem('email', value)
}
const storeUserID = (value) => {
  localStorage.setItem('id', value)
}
const storeUserType = (value) => {
  localStorage.setItem('usertype', value)
}
const storeUserName = (value) => {
  localStorage.setItem('name', value)
}

const getAuthToken = () => {
  let data = localStorage.getItem('authtoken')
  return data
}
const getEmailID = () => {
  let data = localStorage.getItem('email')
  return data
}
const getUserID = () => {
  let data = localStorage.getItem('userID')
  return data
}
const getUserType = () => {
  let data = localStorage.getItem('role')
  return data
}
const getUserName = () => {
  let data = localStorage.getItem('name')
  return data
}

const removeAuthToken = () => {
  localStorage.removeItem('authtoken')
  localStorage.removeItem('email')
  localStorage.removeItem('id')
  localStorage.removeItem('role')
  localStorage.removeItem('name')
  localStorage.clear()
}



export { storeAuthToken, getAuthToken, removeAuthToken,storeUserType,getUserType,storeUserID,storeEmailID,getUserID,getEmailID,storeUserName,getUserName, }
