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

const getCookie = (name) => {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}