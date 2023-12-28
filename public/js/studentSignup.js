

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
    DOB,
    gender,
    stateOfOrigin,
    homeAddress,
    course,
    lessonTime,
    paymentMethod,
    photo,
    email,) => {
    try {
       
        const signUpDetails = {
            firstname,
            lastname,
            DOB,
            gender,
            stateOfOrigin,
            homeAddress,
            course,
            lessonTime,
            paymentMethod,
            photo,
            email,
        };
        const res = await fetch('/api/student_form', {
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
const DOB = document.getElementById('DOB').value;
const gender = document.getElementById('gender').value;
const stateOfOrigin = document.getElementById('stateOfOrigin').value; 
const homeAddress = document.getElementById('homeAddress').value;
const course = document.getElementById('course').value;
const lessonTime = document.getElementById('lessonTime').value;
const paymentMethod = document.getElementById('paymentMethod').value;
const photo = document.getElementById('photo').value;
const email = document.querySelector('.email').value;



signUpFn(
    firstName,
    lastName,
    DOB,
    gender,
    stateOfOrigin,
    homeAddress,
    course,
    lessonTime,
    paymentMethod,
photo,
email
)

studentForm.reset()
})


// export {signUpFn}
 