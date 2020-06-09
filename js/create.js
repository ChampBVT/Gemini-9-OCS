
$(document).ready(() => {
    loadNavbar();
    addActive(1, 0);
    $("#test").click(function () {

    });
});

$(()=> {
    $('input[name="daterange"]').daterangepicker({
        opens: 'bottom'
    }, function(start, end, label) {
        console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
});