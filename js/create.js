$(document).ready(() => {
    let start;
    let end;
    const $form = $("#create");
    const $button = $("#createBtn");
    loadNavbar();
    addActive(1, 0);
    $('input[name="daterange"]').daterangepicker({
        locale: { format: 'DD/MM/YYYY' },
        opens: 'bottom'
    }, function(start, end, label) {
        start = start.format('DD/MM/YYYY');
        end = end.format('DD/MM/YYYY');
    });
    $form.submit((e) => {
        e.preventDefault();
        e.stopPropagation();
        if ($form[0].checkValidity() === true) {
            $button.prop("disabled", true);
            const data = {
                creatorID : $('#creatorID').val(),
                starsysname : $('#starsysname').val(),
                funding : $('#funding').val(),
                obj : $('#obj').val(),
                start : start,
                end : end,
                preprocess : $('#preprocess').val(),
                annotation : $('#annotation').val(),
            }
            console.log(data);
            setTimeout(()=>{
                $button.prop("disabled", false);
            },2000);
        }
        $form[0].classList.add('was-validated');
    });
});