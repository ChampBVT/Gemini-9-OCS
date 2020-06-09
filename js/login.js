
$(document).ready(() => {
    const $form = $("#login");
    const $button = $("#signin");
    $form.submit((e) => {
        e.preventDefault();
        e.stopPropagation();
        if ($form[0].checkValidity() === true) {
            $button.prop("disabled",true);
            login($("#username").val(), $("#password").val()).then((res) => {
                if (res.message === "successful") {
                    window.sessionStorage.setItem("authorized", "true");
                    debugger
                    goToIndex();
                } else {
                    throw new Error('Network response was not ok');
                }
                $button.prop("disabled", false);
            })
        }
        $form[0].classList.add('was-validated');
    });
});

