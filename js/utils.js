
const checkLogin = () => {
    if (localStorage.getItem("token")===null)
        window.location.href = `./login.html`
}

const loadNavbar = () => {
    $("#navbar").load("./components/navbar.html");
}

const goToIndex = () => {
    window.location.href = `./index.html`
}

const addActive = ( idx1 = -1, idx2 = -1) => {
    $(window).on( "load",()=>{
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