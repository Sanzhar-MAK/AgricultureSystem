const registrationButton = document.querySelector('.registration-button');
const sigInButton = document.querySelector('.sign-in-button');
const modalRegistration = document.querySelector('.modal-registration');
const modalSignIn = document.querySelector('.modal-sign-in');

const registrationForm = document.querySelector('.sent-form-registration');
const inputSent = document.querySelectorAll('.input-sent');
const showPasswordButton = document.querySelector('.show-password-button');
const inputShowPassword = document.querySelector('.input-show-password');
const inputRepassword = document.querySelector('.input-repassword');

const changeModal = (modal) => {
    if (modal.classList.contains('modal-active')) {
        modal.classList.remove('modal-active')
    } else {
        modal.classList.add('modal-active')
    }
}

const exitModal = (modal, e) => {
    const target = e.target
    let check = target === modal ? changeModal(modal) : false
    return check
}

const showAlert = () => {
    alert('Одно из полей пустое!');
}

const checkEmpty = (obj, check) => {
    for (let key in obj) {
        check = (obj[key].trim() === '') ? false : true
        if (!check) {
            break
        }
    }
    return check
}

const checkReg = (obj) => {
    let passwordReg = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])/;
    let usernameReg = /^(?=.*[A-Za-zА-Яа-яЁё])*\w/;
    if (usernameReg.test(obj.username) && passwordReg.test(obj.password)) {
        return true
    }
}

registrationForm.addEventListener('submit', event => {
    event.preventDefault();
    let info = []

    inputSent.forEach(input => {
        let id = input.id
        let value = input.value
        info.push({
            id,
            value
        })
    })

    let all = info.reduce((obj, item) => {
        obj[item.id] = item.value
        return obj
    }, {})

    console.log(all);

    if (inputShowPassword.value !== inputRepassword.value) {
        console.log('rgrgrgr')
    }

    console.log(all)
    if (checkEmpty(all)) {
        if (checkReg(all)) {
            ipcRenderer.send('open-main-window', all.username)
            let window = remote.getCurrentWindow()
            window.close()
        } else {
            alert('Значение поля password должно содержать по крайней мере одну строчную букву, прописную букву и цифру')
        }
    } else {
        showAlert()
    }

})


// showPasswordButton.addEventListener('mousedown', e => {
//     inputShowPassword.setAttribute('type', 'text');
// })

// showPasswordButton.addEventListener('mouseup', e => {
//     inputShowPassword.setAttribute('type', 'password');
// })

registrationButton.addEventListener('click', event => {
    changeModal(modalRegistration)
})

modalRegistration.addEventListener('click', (event) => {
    exitModal(modalRegistration, event)
})

sigInButton.addEventListener('click', (event) => {
    changeModal(modalSignIn)
})

modalSignIn.addEventListener('click', (event) => {
    exitModal(modalSignIn, event)
})