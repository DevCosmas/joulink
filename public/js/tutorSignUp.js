

// import { showAlert } from "./showAlert";
// const applicationForm = document.querySelector('.apply');

// const showAlert = (type, msg) => {
//     hideAlert();
//     const markup = `<div class="alert alert--${type}">${msg}</div>`;
//     document.body.insertAdjacentHTML('afterbegin', markup);
//     window.setTimeout(hideAlert, 5000);
// };

// const hideAlert = () => {
//     const alertElement = document.querySelector('.alert');
//     if (alertElement) {
//         alertElement.parentElement.removeChild(alertElement);
//     }
// };

const studentForm= document.querySelector('.studentForm')


const signUpFn = async ( 
    firstname,
    lastname,
   password,
   confirmPassword,
email,
photo,) => {
    try {
       
        const signUpDetails = {
            firstname,
            lastname,
           password,
           confirmPassword,
        email,
        photo,
        };
        const res = await fetch('/api/sign_Up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signUpDetails),
        });

        if (res.ok) {
            const data = await res.json();
            console.log(data)
            // showAlert('success', 'Your application was received successfully');
        } else {
            const errorResponse = await res.json();
            console.log(errorResponse)
            // showAlert('fail', errorResponse.message || 'Application not successful. Try again!');
        }
    } catch (err) {
        // showAlert('fail', 'An unexpected error occurred. Please try again.');
        console.log(error)
    }
};

studentForm.addEventListener('submit',(e)=>{
    e.preventDefault()


    const firstName = document.getElementById('firstname').value;
const lastName = document.getElementById('lastname').value;
const password = document.getElementById('password').value;
const confirmPassword = document.getElementById('confirmPassword').value;
const photo = document.getElementById('photo').value;
const email = document.querySelector('#email').value;

signUpFn(
    firstName,
    lastName,
   password,
   confirmPassword,
email,
photo,
)

studentForm.reset()
})


// export {signUpFn}
 