$(document).ready(() => {
    checkLogin()
    checkRole('ASTRONOMER')
    loadNavbar(1, 2)
    if (window.location.search.includes('?planid=')) {
        $('#table').remove()
        $('#breadcrumb').text(`Science Plan > Submit > ${window.location.search.replace('?planid=', '')}`)
        getPlan(window.location.search.replace('?planid=', '')).then(res => {
            if (res.status === 200) {
                res.json().then(sp => {
                    $('#spinner').hide()
                    $('.base-table').css("width", "50%");
                    $('#container').load("./components/disabledForm.html", () => {
                        $('#back').click(()=> window.location.href = './submitPlang.html')
                        $('#planId').val(sp.id)
                        $('#planName').val(sp.name)
                        $('#creator').val(sp.creatorUser.name)
                        $('#submitter').val(getUserName())
                        $('#status').val(sp.status)
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
                        $('#button').click(()=>{
                            $('#button').prop('disabled', true)
                            submitPlan(sp.id, getUserId()).then(res=>{
                                if(res.status === 200){
                                    alert(`Submit Science Plan Succeeded ID = ${sp.id}`)
                                    goToIndex()
                                } else {
                                    alert(`There was an error`)
                                    showTable()
                                    checkLogin()
                                }
                                $('#button').prop('disabled', false)
                            })
                        })
                    });
                })
            } else {
                alert('Science Plan Not found.')
                window.location.href = `./submitPlan.html`
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
                const filteredSp = allSp.filter(sp => sp.status === 'TESTED')
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
                        <td class='text-ovf'><span class="date">${moment(sp.startDate).format('DD/MM/YYYY')}</span></td>
                        <td class='text-ovf'><span class="date">${moment(sp.endDate).format('DD/MM/YYYY')}</span></td>
                        <td class='text-ovf'>${sp.telescopeLoc}</td>
                        <td class='text-ovf'>${sp.target}</td>
                        <td><button type='button' class='btn btn-success' id="sci${sp.id}">Details</button></td>
                        </tr>`)
                        $(`#sci${sp.id}`).click(() => {
                            window.location.href = `./submitPlan.html?planid=${sp.id}`
                        })
                    })
                }
            })
        } else {
            alert('There was an error.')
        }
    })
}