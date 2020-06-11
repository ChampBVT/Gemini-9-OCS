const checkLogin = () => {
    const itemStr = localStorage.getItem("user")
    if (!itemStr) {
        goToLogin()
    }
    const item = JSON.parse(itemStr)
    checkExpired(item.expiry)
}

const checkRole = () => {
    const itemStr = localStorage.getItem("user")
    const item = JSON.parse(itemStr)
    if(item.role==="ASTRONOMER") {
        alert('You are not allowed here.')
        goToIndex()
    }
}

const getUserId = () => {
    const itemStr = localStorage.getItem("user")
    const item = JSON.parse(itemStr)
    checkExpired(item.expiry)
    return item.userId
}

const getUserName = () => {
    const itemStr = localStorage.getItem("user")
    const item = JSON.parse(itemStr)
    checkExpired(item.expiry)
    return item.userName
}

const getToken = () => {
    const itemStr = localStorage.getItem("user")
    const item = JSON.parse(itemStr)
    checkExpired(item.expiry)
    return item.token
}

const saveToLocalStr = (fname, usrId, token, role) => {
    const now = new Date()
    const item = {
        userName: fname,
        userId: usrId,
        token: token,
        role: role.replace('ROLE_',''),
        expiry: now.getTime() + (3600 * 1000)
    }
    localStorage.setItem("user", JSON.stringify(item))
}

const loadNavbar = () => {
    $("#navbar").load("./components/navbar.html",()=>{
        $('#logout').click(()=>{
            localStorage.removeItem("user")
            goToLogin()
        })
        const itemStr = localStorage.getItem("user")
        const item = JSON.parse(itemStr)
        if(item.role==="ASTRONOMER") {
            addDisabled(-1, 3)
            addDisabled(2, 4)
        }
        $('#user').text(`${item.userName}, Role : ${item.role}`)
    });

}

const goToIndex = () => {
    window.location.href = `./index.html`
}

const goToLogin = () => {
    window.location.href = `./login.html`
}

const addActive = (idx1 = -1, idx2 = -1) => {
    $(window).on("load", () => {
        $(".nav-item").each((index, obj) => {
            if (index === idx1)
                obj.classList.add("active")
        })
        $(".dropdown-item").each((index, obj) => {
            if (index === idx2)
                obj.classList.add("active")
        })
    })
}

const addDisabled = (idx1 = -1, idx2 = -1) => {
    $(window).on("load", () => {
        $(".nav-item").each((index, obj) => {
            if (index === idx1)
                obj.classList.add("disabled")
        })
        $(".dropdown-item").each((index, obj) => {
            if (index === idx2)
                obj.classList.add("disabled")
        })
    })
}

const checkExpired = (expiry) => {
    const now = new Date()
    if (now.getTime() > expiry) {
        localStorage.removeItem("user")
        goToLogin()
    }
}