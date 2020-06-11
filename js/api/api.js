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
    return await fetch(`${API_URL}/api/scienceplan/add`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        }
    })
}

const testPlan = async (id) => {
    return await fetch(`${API_URL}/api/scienceplan/test?id=${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
}

const getPlan = async (id) => {
    return await fetch(`${API_URL}/api/scienceplan/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
}

const getAllPlan = async () => {
    return await fetch(`${API_URL}/api/scienceplan/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
}

const submitPlan = async (id, uid) => {
    return await fetch(`${API_URL}/api/scienceplan/submit?id=${id}&uid=${uid}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
}
const validatePlan = async (id, uid) => {
    return await fetch(`${API_URL}/api/scienceplan/validate?id=${id}&uid=${uid}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
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
