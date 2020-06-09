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
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
        }
    })
    const a = res.json().then(res => {
        console.log(res)
    })
    console.log(a)
    //return res.json()
}
const createPlan = async (data) => {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    return res.json()
}

const test2 = () => {
    $.ajax({
        url: 'http://192.168.1.45:8080/api/users/10',
        type: 'GET',
        dataType: 'json',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        contentType: 'application/x-www-form-urlencoded',
        success: function (result) {
            // CallBack(result);
        },
        error: function (error) {

        }
    });
}
