
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

document
  .getElementById('tutor-update')
  .addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentForm = new FormData();

    studentForm.append('firstname', document.getElementById('firstname').value);
    studentForm.append('lastname', document.getElementById('lastname').value);
    studentForm.append('photo', document.getElementById('photo').value);
    studentForm.append('email', document.querySelector('#email').value);

    try {
      const res = await fetch('/api/updateProfile', {
        method: 'PATCH',
        body: studentForm,
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        showAlert('success', data.message);
      } else {
        showAlert('fail', data.message);
      }
    } catch (err) {
      showAlert('fail', 'something went really wrong');
      console.error(err);
    }

    document.querySelector('.form-user-settings').reset();
  });


 
