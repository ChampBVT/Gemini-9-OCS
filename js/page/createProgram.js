$(document).ready(() => {
    checkRole('OBSERVER')
    checkLogin()
    loadNavbar(2, 4)
    if (window.location.search.includes('?planid=')) {
        $('#table').remove()
        $('#breadcrumb').text(`Observing Program > Create > ${window.location.search.replace('?planid=', '')}`)
        getPlan(window.location.search.replace('?planid=', '')).then(res => {
            if (res.status === 200) {
                res.json().then(sp => {
                    const containerDiv = $('#container')
                    $('#spinner').hide()
                    $('.base-table').css("width", "50%");
                    containerDiv.load("./components/disabledForm.html", () => {
                        const statusLabel = $('#statusLabel')
                        $('#button').hide()
                        $('#planId').val(sp.id)
                        $('#planName').val(sp.name)
                        $('#creator').val(sp.creatorUser.name)
                        $('#submitter').val(getUserName())
                        $('#status').val(sp.validatorUser.name)
                        statusLabel.text('Validator')
                        statusLabel.append('<span class="required"> *</span>')
                        $('#funding').val(sp.funding)
                        $('#obj').val(sp.objectives)
                        $('#date').val(`${moment(sp.startDate).format('DD/MM/YYYY')} - ${moment(sp.startDate).format('DD/MM/YYYY')}`)
                        $('#location').val(sp.telescopeLoc)
                        $('#target').val(sp.target)
                        $('#fileType').val(sp.dpr.fileType)
                        if(sp.dpr.fileQuality<=50)
                            $('#inlineRadio1').prop('checked', true)
                        else if (sp.dpr.fileQuality<=75)
                            $('#inlineRadio2').prop('checked', true)
                        else if (sp.dpr.fileQuality<=100)
                            $('#inlineRadio3').prop('checked', true)
                        if(sp.dpr.colorType==='BW')
                            $('#inlineRadio4').prop('checked', true)
                        else if (sp.dpr.colorType==='COLOR')
                            $('#inlineRadio5').prop('checked', true)
                        $('#contrast').val(sp.dpr.contrast)
                        $('#brightness').val(sp.dpr.brightness)
                        $('#saturation').val(sp.dpr.saturation)
                        $('#annotation').val(sp.annotations)
                        $("output[name='contrastVal']").val(sp.dpr.contrast)
                        $("output[name='brightnessVal']").val(sp.dpr.brightness)
                        $("output[name='saturationVal']").val(sp.dpr.saturation)
                        $('#extend').load("./components/extendCreateProgramForm.html", ()=>{
                            $('#back').click(()=> window.location.href = './createProgram.html')
                            const daterange = $('input[name="date"]')
                            daterange.daterangepicker({
                                singleDatePicker: true,
                                locale: {format: 'DD/MM/YYYY'},
                                opens: 'bottom',
                                maxDate: moment(),
                                drops: 'up'
                            })
                            const $form = $('#disable')
                            const $button = $('#createBtn')
                            $form.submit((e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                if ($form[0].checkValidity() === true) {
                                    $button.prop("disabled", true)
                                    const data = {
                                        isLightDetectorOn: $("input[name='lightDetectorON']:checked").val(),
                                        lens: {
                                            make: $('#lensMake').val(),
                                            model: $('#lensModel').val(),
                                            manufacturer: $('#lensManufacturer').val(),
                                            year: $('#lensYear').val()
                                        },
                                        sciencePlan: {
                                            id: sp.id
                                        },
                                        creatorUser: {
                                            id: getUserId()
                                        },
                                        filters: [{
                                            make: $('#filtersMake').val(),
                                            model: $('#filtersModel').val(),
                                            manufacturer: $('#filtersManufacturer').val(),
                                            year: $('#filtersYear').val(),
                                            size: $('#filtersSize').val(),
                                            weight: $('#filtersWeight').val()
                                        }],
                                        specialEquipments: [{
                                            equipmentName: $('#equipmentName').val(),
                                            ownerName: $('#ownerName').val(),
                                            installedDate: $('#installedDate').data('daterangepicker').startDate.format('YYYY-DD-MM'),
                                        }],
                                        exposures: $('#exposures').val().split(',').filter(ex => parseFloat(ex) == ex),
                                    }
                                    createProgram(data).then(res=>{
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
                    })
                })
            } else {
                alert('Science Plan Not found.')
                window.location.href = `./createProgram.html`
            }

        })
    } else
        showTable()
})

const showTable = () => {
    $('#spinner').show()
    $("#table-body").empty()
    getAllPlan().then(res => {
        if (res.status === 200) {
            res.json().then(allSp => {
                const filteredSp = allSp.filter(sp => sp.status === 'COMPLETE')
                if (filteredSp.length === 0) {
                    $('div').removeClass("spinner-border")
                    $('#spinner').text('0 Result Found')
                } else {
                    $('#spinner').hide()
                    filteredSp.map(sp => {
                        $('#table-body').append(`
                        <tr style='line-height: 2.2;'>
                        <th scope='row'>${sp.id}</th>
                        <td class='text-ovf'>${sp.name}</td>
                        <td class='text-ovf'>${sp.creatorUser.name}</td>
                        <td class='text-ovf'>${sp.funding}</td>
                        <td class='text-ovf'>${sp.objectives}</td>
                        <td class='text-ovf'><span style="font-size: 14px">${moment(sp.startDate).format('DD/MM/YYYY')}</span></td>
                        <td class='text-ovf'><span style="font-size: 14px">${moment(sp.endDate).format('DD/MM/YYYY')}</span></td>
                        <td class='text-ovf'>${sp.telescopeLoc}</td>
                        <td class='text-ovf'>${sp.target}</td>
                        <td><button type='button' class='btn btn-primary' id="sci${sp.id}">Details</button></td>
                        </tr>`)
                        $(`#sci${sp.id}`).click(() => {
                            window.location.href = `./createProgram.html?planid=${sp.id}`
                        })
                    })
                }
            })
        } else {
            alert('There was an error.')
        }
    })
}