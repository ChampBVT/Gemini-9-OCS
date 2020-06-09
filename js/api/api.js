const API_URL = 'http://192.168.1.45:8080';

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

const test = async () => {
    console.log(`Bearer ${localStorage.getItem("token")}`)
    const res = await fetch(`http://192.168.1.45:8080/api/users/10`, {
        method: 'GET',
        headers: {
            //'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MiIsImV4cCI6MTU5MTcxNzY4NywiaWF0IjoxNTkxNzE0MDg3fQ.OHmQulv9Z0IRA6BjKtIOkx-HsKnMjaQVBQkl4d8VeMCP5tmvs6d0LJ2geIW5IS6Pw_x7Vt8HSg3VQqvAgpF2AQ',
            'Content-Type': 'application/json',
            'Accept' : '*/*',
        }
    })
    console.log(res)
    return res.json()
}