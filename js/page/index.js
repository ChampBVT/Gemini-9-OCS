
$( document ).ready(()=> {
    checkLogin()
    loadNavbar(0)
    if(getRole()==='ASTRONOMER'){
        const validateButton = $('#validate')
        const createProgramButton = $('#createProgram')
        validateButton.css('opacity', 0.5)
        validateButton.css('pointer-events', 'none');
        createProgramButton.css('opacity', 0.5)
        createProgramButton.css('pointer-events', 'none');
    }else if(getRole()==='OBSERVER'){
        const submitButton = $('#submit')
        const testButton = $('#test')
        const createPlanButton = $('#createPlan')
        testButton.css('opacity', 0.5)
        testButton.css('pointer-events', 'none');
        submitButton.css('opacity', 0.5)
        submitButton.css('pointer-events', 'none');
        createPlanButton.css('opacity', 0.5)
        createPlanButton.css('pointer-events', 'none');
    }
});
