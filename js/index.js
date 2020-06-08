import {getTest} from "./api/api.js";

$( document ).ready(()=> {
    $("#navbar").load("./components/navbar.html");
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