export const isUserLoggedIn = () => !!(localStorage.getItem('accessToken') && localStorage.getItem('userData'))
