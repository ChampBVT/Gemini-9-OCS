let prefix = ""
$(document).ready(() => {
    if (window.location.href.includes("localhost"))
        prefix = "/Gemini-9-OCS"
});

const checkLogin = () => {
    if (window.sessionStorage.getItem("authorized") !== "true")
        window.location.href = `${prefix}/login.html`
}

const loadNavbar = () => {
    $("#navbar").load("./components/navbar.html");
}

const goToIndex = () => {
    window.location.href = `${prefix}/index.html`
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