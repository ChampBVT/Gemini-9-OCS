
$(document).ready(() => {
    const $form = $("#login");
    const $button = $("#signin");
    $form.submit((e) => {
        $button.prop("disabled",true);
        e.preventDefault();
        e.stopPropagation();
        if ($form[0].checkValidity() === true) {
            login($("#username").val(), $("#password").val()).then((res) => {
                if (res.message === "Successful") {
                    localStorage.setItem("token", res.token);
                    debugger
                    goToIndex();
                }
                $button.prop("disabled", false);
            })
        }
        $form[0].classList.add('was-validated');
    });
});

