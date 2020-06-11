$(document).ready(() => {
    checkRole()
    checkLogin()
    loadNavbar()
    addActive(1, 3);
    showTable()
})

const showTable = () => {
    $('#spinner').show()
    $("#table-body").empty()
    getAllPlan().then(res => {
        if (res.status === 200) {
            res.json().then(allSp => {
                const filteredSp = allSp.filter(sp => sp.status === 'SUBMITTED')
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
                        <td class='text-ovf'>${sp.creatorUser.fullname}</td>
                        <td class='text-ovf'>${sp.funding}</td>
                        <td class='text-ovf'>${sp.objectives}</td>
                        <td class='text-ovf'>${moment(sp.startDate).format('DD/MM/YYYY')}</td>
                        <td class='text-ovf'>${moment(sp.endDate).format('DD/MM/YYYY')}</td>
                        <td class='text-ovf'>${sp.telescopeLoc}</td>
                        <td class='text-ovf'>${sp.target}</td>
                        <td><button type='button' class='btn btn-success' id="sci${sp.id}">Validate</button></td>
                        </tr>`)
                        $(`#sci${sp.id}`).click(() => {
                            $(`#sci${sp.id}`).prop('disabled', true)
                            validatePlan(sp.id, getUserId()).then(res => {
                                if (res.status === 200) {
                                    alert(`Validate Science Plan Succeeded ID = ${sp.id}`)
                                    goToIndex()
                                } else {
                                    alert(`There was an error`)
                                    showTable()
                                    checkLogin()
                                }
                                $(`#sci${sp.id}`).prop('disabled', false)
                            })
                        })
                    })
                }
            })
        } else {
            alert('There was an error.')
        }
    })
}