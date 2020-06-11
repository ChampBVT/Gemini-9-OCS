$(document).ready(() => {
    //checkLogin()
    loadNavbar()
    addActive(1, 1);
    showTable()

})

const showTable = () => {
    getAllPlan().then(res=>{
        if(res.status === 200){
           res.json().then(allSp=>{
               $("#table-body").empty()
               allSp.map( sp => {
                   $('#spinner').hide()
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
                       alert(`Test Science Plan Failed => id = ${sp.id}`)
                       showTable()
                       // }
                       //}//)
                   })
               })
            })
        }else{
            alert('There was an error')
        }
    })

}