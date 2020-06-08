const API_URL = 'http://localhost:8080/heroes';

export const login = async (email , pwd) => {
    const data = {
        email,
        pwd
    }
    const res = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return res.json()
}