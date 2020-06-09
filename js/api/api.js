const API_URL = 'http://192.168.1.45:8080';

const login = async (username, pwd) => {
    const res = await fetch(`${API_URL}/login?username=${username}&password=${pwd}`, {
        method: 'POST',
    })
    return res.json()
}