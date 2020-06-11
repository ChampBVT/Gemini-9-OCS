$(document).ready(() => {
    //checkLogin()
    loadNavbar()
    addActive(1, 1);
    showTable()

})

const showTable = () => {
    const res = [{
        id: 22,
        name: null,
        creatorUser: {
            id: 10,
            name: 'test',
            email: 'test',
            password: '$2a$10$S4Pre6edCfRxkeavuuuHs.Xcc5XRBijIDJDBkNcxDUn.w.DtP0T12',
            fullname: 'null',
            phone: 'null',
            address: 'null',
            role: {
                id: 1,
                name: 'ROLE_USER'
            }
        },
        submitterUser: 'null',
        validatorUser: 'null',
        funding: '122222.0',
        annotations: 'twwwwt',
        objectives: 'goal',
        startDate: '2020-10-05T17:00:00.000+0000',
        endDate: '2020-10-09T17:00:00.000+0000',
        telescopeLoc: 'HAWAII',
        status: 'RUNNING',
        dpr: {
            id: 23,
            fileType: 'JPEG',
            fileQuality: 1231232.0,
            colorType: 'COLOR',
            contrast: 6.9222269E7,
            brightness: 10.0,
            saturation: 1.0
        },
        target: 'EARTH',
        starSystem: 'EARTH'
    }]
    res.map( sp => {
        $("#table-body").empty()
        $('#table-body').append(`
                    <tr style='line-height: 2.2;'>
                    <th scope='row'>${sp.id}</th>
                    <td>${sp.creatorUser.name}</td>
                    <td>${sp.creatorUser.name}</td>
                    <td>${sp.funding}</td>
                    <td class='text-ovf'>${sp.objectives}</td>
                    <td>${moment(sp.startDate).format('DD-MM-YYYY')}</td>
                    <td>${moment(sp.endDate).format('DD-MM-YYYY')}</td>
                    <td>${sp.telescopeLoc}</td>
                    <td>${sp.target}</td>
                    <td><button type='button' class='btn btn-warning' id="sci${sp.id}">Test</button></td>
                    </tr>`)
        $(`#sci${sp.id}`).click(()=>{
            // testPlan().then(res=>{
            //     if(res.status === 200){
            //         console.log(res.json())
            //         goToIndex()
            //     } else {
                    alert("Create Science Plan Failed")
                    showTable()
                // }
            //}//)
        })
    })
}