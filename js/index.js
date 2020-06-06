import {navBar} from "./components/navbar.js";

$( document ).ready(()=> {
    $( "body" ).append(navBar);
    $(".nav-item").each((index, obj)=>{
        if(index===0)
            obj.classList.add("active")
    })

});