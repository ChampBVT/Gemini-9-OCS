
$(document).ready(() => {
    const $form = $("#login")
    const $button = $("#signin")
    $form.submit((e) => {
        $button.prop("disabled",true)
        e.preventDefault()
        e.stopPropagation()
        if ($form[0].checkValidity() === true) {
            login($("#username").val(), $("#password").val()).then((res) => {
                if (res.message === "Successful") {
                    saveToLocalStr(res.user.fullname, res.user.id, res.token)
                    goToIndex()
                }
                $button.prop("disabled", false)
            }).catch(
                $button.prop("disabled", false)
            )
        }
        $form[0].classList.add('was-validated')
    });
});

