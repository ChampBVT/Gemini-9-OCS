const API_URL = '//192.168.1.45:8080';

const login = async (username, pwd) => {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: pwd
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res.json()
}

const createPlan = async (data) => {
    const res = await fetch(`${API_URL}/api/scienceplan/add`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        }
    })
    return res
}

const testPlan = async () => {
    const res = await fetch(`${API_URL}/api/scienceplan/test`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
    return res
}

const getTarget = async () =>{
    const res = await fetch(`${API_URL}/api/starsystems`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
    return res.json()
}
