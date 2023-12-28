

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


const logInFn = async ( 
    email,
    password
    ) => {
    try {
       
        const logInDetails = {
            email,
           password
       
        };
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(logInDetails),
        });

        if (res.ok) {
            const data = await res.json();
            console.log('overview loading.....')
            window.setTimeout(()=>{
                location.assign('/overview')
            },1000)
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

const password = document.getElementById('password').value;
const email = document.querySelector('#email').value;


logInFn(
    email,
    password
)

studentForm.reset()
})


// export {signUpFn}
 