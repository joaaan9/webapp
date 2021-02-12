var url = 'https://database-web.herokuapp.com/users';

const getFormData = e => {
    e.preventDefault();
    
    var element = document.getElementById('form-alert');
    var wrapper = document.getElementById('sections-wrapper');
    var form = document.forms["signin-form"];
    var fields = [...form.elements];

    const popAlert = (str) => {
        if(element) return;
        var alert = document.createElement('section');
        alert.id = "form-alert";
        alert.className = "alert alert-danger text-center col-12"
        alert.innerHTML = str;
        wrapper.insertBefore( alert, wrapper.firstChild);
    };
    
    const cleanAlert = () => {
        if(!element) return;
        wrapper.removeChild(element);
    }

    const checkPwd = response => {
        var mail = form["signin-email"].value;
        if (response[0].pwd != form["signin-pwd"].value) popAlert("La combinació de contrassenya i usuari no és correcta");
        else {
            alert(`Bienvenid@ ${mail}`);
        }
    }

    const checkSignIn = async () => {
        var mail = form["signin-email"].value;
        try {
            const { data } = await axios.get(`${url}?email=${mail}`);
            checkPwd(data);
        } catch (error) {
            popAlert("No hem trobat cap usuari amb aquest email");
        }
    }

    cleanAlert();
    var inputs = fields.splice(0, fields.length-1);
    if(inputs.find( e => e.value.trim() === '' && e.value !== null)) {
        return popAlert("S'han d'omplir tots el camps");
    } else {
        checkSignIn();
    }

};
