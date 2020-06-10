const checkLogin = () => {
    const itemStr = localStorage.getItem("user")
    if (!itemStr) {
        goToLogin()
    }
    const item = JSON.parse(itemStr)
    checkExpired(item.expiry)
}

const getUserId = () => {
    const itemStr = localStorage.getItem("user")
    const item = JSON.parse(itemStr)
    checkExpired(item.expiry)
    return item.userId
}

const getToken = () => {
    const itemStr = localStorage.getItem("user")
    const item = JSON.parse(itemStr)
    checkExpired(item.expiry)
    return item.token
}

const logout = () => {
    localStorage.removeItem("user")
}

const saveToLocalStr = (usrId, token) => {
    const now = new Date()
    const item = {
        userId: usrId,
        token: token,
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

const checkExpired = (expiry) => {
    const now = new Date()
    if (now.getTime() > expiry) {
        localStorage.removeItem("user")
        goToLogin()
    }
}