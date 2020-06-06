import {navBar} from "./components/navbar.js";
import {getTest} from "./api/api.js";

$( document ).ready(()=> {
    $( "body" ).prepend(navBar);
    $(".nav-item").each((index, obj)=>{
        if(index===0)
            obj.classList.add("active")
    })
    $("#test").click(function() {
        test()
    });
});

const test = async ()=>{
    console.log(await getTest())
}