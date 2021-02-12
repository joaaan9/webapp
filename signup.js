var url = 'https://database-web.herokuapp.com/users';

const getFormData = e => {
    e.preventDefault();
    
    var element = document.getElementById('form-alert');
    var wrapper = document.getElementById('sections-wrapper');
    var form = document.forms["signup-form"];
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

    const checkPwd = () => {
        var pwd1 = form["signup-pwd"].value;
        var pwd2 = form["signup-pwd-rep"].value;
        return pwd1 === pwd2;
    }

    const createUser = async () => {
        var mail = form["signup-email"].value;
        var password = form["signup-pwd"].value;
        var data = {email: mail, pwd: password};
        try {
            const res = await axios.post(`${url}`,data);
            alert(`Usuari creat correctament!`)
            console.log(res);
        } catch (error) {
            popAlert("No s'ha pogut crear l'usuari correctament");
        }
    }

    cleanAlert();
    var inputs = fields.splice(0, fields.length-1);
    if(inputs.find( e => e.value.trim() === '' && e.value !== null)) {
        return popAlert("S'han d'omplir tots el camps");
    } else {
        cleanAlert();
        if (checkPwd()) createUser();
        else popAlert("Les contrassenyes no coincideixen");
    }

};
