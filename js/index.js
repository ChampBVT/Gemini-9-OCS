
$( document ).ready(()=> {
    checkLogin();
    loadNavbar();
    $(".nav-item").each((index, obj)=>{
        if(index===0)
            obj.classList.add("active")
    })
    $("#test").click(function() {

    });
});
