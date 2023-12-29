

// // import { showAlert } from "./showAlert";
// // const applicationForm = document.querySelector('.apply');

// // const showAlert = (type, msg) => {
// //     hideAlert();
// //     const markup = `<div class="alert alert--${type}">${msg}</div>`;
// //     document.body.insertAdjacentHTML('afterbegin', markup);
// //     window.setTimeout(hideAlert, 5000);
// // };

// // const hideAlert = () => {
// //     const alertElement = document.querySelector('.alert');
// //     if (alertElement) {
// //         alertElement.parentElement.removeChild(alertElement);
// //     }
// // };


document.getElementById('studentForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentForm = new FormData();
    studentForm.append('firstname', document.getElementById('firstname').value);
    studentForm.append('lastname', document.getElementById('lastname').value);
    studentForm.append('DOB', document.getElementById('DOB').value);
    studentForm.append('gender', document.getElementById('gender').value);
    studentForm.append('stateOfOrigin', document.getElementById('stateOfOrigin').value);
    studentForm.append('homeAddress', document.getElementById('homeAddress').value);
    studentForm.append('course', document.getElementById('course').value);
    studentForm.append('lessonTime', document.getElementById('lessonTime').value);
    studentForm.append('paymentMethod', document.getElementById('paymentMethod').value);
    studentForm.append('photo', document.getElementById('photo').files[0]);
    studentForm.append('email', document.querySelector('.email').value);

    try {
        const res = await fetch('/api/student_form', {
            method: 'POST',
            body: studentForm,
        });

        if (res.ok) {
            const data = await res.json();
            console.log(data);
            // showAlert('success', 'Your application was received successfully');
        } else {
            const errorResponse = await res.json();
            console.log(errorResponse);
            // showAlert('fail', errorResponse.message || 'Application not successful. Try again!');
        }
    } catch (err) {
        // showAlert('fail', 'An unexpected error occurred. Please try again.');
        console.error(err);
    }

    document.getElementById('studentForm').reset();
});
