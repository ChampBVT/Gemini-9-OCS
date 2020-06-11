$(document).ready(() => {
    checkLogin()
    loadNavbar()
    addActive(1, 1);
    showTable()
})

const showTable = () => {
    $('#spinner').show()
    $("#table-body").empty()
    getAllPlan().then(res => {
        if (res.status === 200) {
            res.json().then(allSp => {
                const filteredSp = allSp.filter(sp => sp.status === 'DRAFT')
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
                        <td>${sp.telescopeLoc}</td>
                        <td>${sp.target}</td>
                        <td><button type='button' class='btn btn-warning' id="sci${sp.id}">Test</button></td>
                        </tr>`)
                        $(`#sci${sp.id}`).click(() => {
                            $(`#sci${sp.id}`).prop('disabled', true)
                            testPlan(sp.id).then(res => {
                                if (res.status === 200) {
                                    res.json().then(sp=>{
                                        if(sp.status==='FAILED')
                                            alert(`Test Science Plan Failed ID = ${sp.id}`)
                                        else if(sp.status==='TESTED')
                                            alert(`Test Science Plan Succeeded ID = ${sp.id}`)
                                        goToIndex()
                                    })
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