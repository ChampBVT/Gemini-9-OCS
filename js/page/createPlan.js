$(document).ready(() => {
    checkLogin()
    const daterange = $('input[name="daterange"]')
    const $form = $("#create")
    const $button = $("#createBtn")
    loadNavbar()
    addActive(1, 0);
    daterange.daterangepicker({
        locale: {format: 'DD/MM/YYYY'},
        opens: 'bottom'
    })
    $('#creator').val(`${getUserName()}`)
    $("input[name='colorType']").change(() => {
        const rangeInput = $('#saturation')
        if ($('#inlineRadio4').prop('checked')) {
            $("output[name='saturationVal']").val(0)
            rangeInput.val(0)
            rangeInput.prop("disabled", true)
        } else {
            $("output[name='saturationVal']").val(50)
            rangeInput.val(50)
            rangeInput.prop('disabled', false)
        }
    })
    getTarget().then(res=>{
        res.map(starsystem => {
            $('#target').append(`<option>${starsystem}</option>`);
        })
    })

    $form.submit((e) => {
        e.preventDefault()
        e.stopPropagation()
        if ($form[0].checkValidity() === true) {
            $button.prop("disabled", true)
            const data = {
                name: $('#planName').val(),
                creator: `${getUserId()}`,
                target: $('#target').val(),
                funding: $('#funding').val(),
                objectives: $('#obj').val(),
                startDate: daterange.data('daterangepicker').startDate.format('YYYY-DD-MM'),
                endDate: daterange.data('daterangepicker').endDate.format('YYYY-DD-MM'),
                telescopeLoc: $('#location').val(),
                fileType: $('#fileType').val(),
                fileQuality: $("input[name='fileQuality']").val(),
                colorType: $("input[name='colorType']").val(),
                annotations: $('#annotation').val(),
                contrast: $('#contrast').val(),
                brightness: $('#brightness').val(),
                saturation: $('#saturation').val(),
            }
            console.log(data);
            createPlan(data).then(res=>{
                if(res.status === 200){
                    alert("Create Science Plan Succeeded")
                    goToIndex()
                } else {
                    alert("Create Science Plan Failed")
                }
                $button.prop("disabled", false)
            })
        }
        $form[0].classList.add('was-validated')
    })
})