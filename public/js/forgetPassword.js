

const showAlert = (type, msg) => {
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.body.insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, 5000);
};

const hideAlert = () => {
    const alertElement = document.querySelector('.alert');
    if (alertElement) {
        alertElement.parentElement.removeChild(alertElement);
    }
};

const studentForm= document.querySelector('.studentForm')


const forgetPasswordFn = async ( 
    email
    ) => {
    try {
       
        const forgettenEmail = {
            email
       
        };
        const res = await fetch('/api/forget_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(forgettenEmail),
        });

        if (res.ok) {
            const data = await res.json();
            console.log(data)
            showAlert('success', data.message);
        }  else {
            const response = await res.json();
            console.log(response);
            showAlert('fail', response.message);
          }
        } catch (err) {
          showAlert('fail', 'Something went really wrong!');
          console.log(err);
        }
};

studentForm.addEventListener('submit',(e)=>{
    e.preventDefault()

const email = document.querySelector('#email').value;


forgetPasswordFn(
    email
)

studentForm.reset()
})


// export {signUpFn}
 