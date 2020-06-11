
$( document ).ready(()=> {
    checkLogin()
    loadNavbar()
    addActive(0)
    if(getRole()!=='OBSERVER'&&getRole()!=="ADMIN"){
        const validateButton = $('#validate')
        const createProgramButton = $('#create')
        validateButton.css('opacity', 0.5)
        validateButton.css('pointer-events', 'none');
        createProgramButton.css('opacity', 0.5)
        createProgramButton.css('pointer-events', 'none');
    }
});
