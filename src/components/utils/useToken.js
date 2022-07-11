export function setToken(userToken) {
    localStorage.setItem('token', userToken);
}
  
export function getToken() {
    const tokenString = localStorage.getItem('token');
    return tokenString
}

export function removeToken() {
    localStorage.removeItem('token');

}