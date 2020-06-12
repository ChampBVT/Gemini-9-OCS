
$(document).ready(() => {
    const $form = $("#login")
    const $button = $("#signin")
    $form.submit((e) => {
        e.preventDefault()
        e.stopPropagation()
        if ($form[0].checkValidity() === true) {
            $button.prop("disabled",true)
            login($("#username").val(), $("#password").val()).then((res) => {
                if (res.message === "Successful") {
                    saveToLocalStr(res.user.name, res.user.id, res.token, res.user.role.name)
                    goToIndex()
                } else
                    alert('Login Unsuccessful');
                $button.prop("disabled", false)
            }).catch((err)=>{
                alert('There was an error');
                $button.prop("disabled", false)
            })
        }
        $form[0].classList.add('was-validated')
    });
});

