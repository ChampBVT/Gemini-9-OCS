
$(document).ready(() => {
    const $form = $("#login");
    const $button = $("#signin");

    $form.submit((e) => {
        e.preventDefault();
        e.stopPropagation();
        if ($form[0].checkValidity() === true) {
            $button.prop("disabled",true);
            login($("#username").val(), $("#password").val()).then((res) => {
                console.log(res)
                console.log(res.status)
                if (!res.status) {
                    throw new Error('Network response was not ok');
                } else {

                }
                $button.prop("disabled", false);
            })
            // }).catch(()=>{
            //     console.log("There is an error.");
            //     $button.prop("disabled",false);
            // })
        }
        $form[0].classList.add('was-validated');
    });
});

