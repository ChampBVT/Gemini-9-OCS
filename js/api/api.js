const API_URL = 'http://localhost:8080/heroes';
export const getTest = async () => {
    const res = await fetch(`${API_URL}`)
    return res.json()
}