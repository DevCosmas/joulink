
const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.body.insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 2000);
};

const hideAlert = () => {
  const alertElement = document.querySelector('.alert');
  if (alertElement) {
    alertElement.parentElement.removeChild(alertElement);
  }
};
const studentForm = document.querySelector('.studentForm');

const resetPasswod = async (password, confirmPassword) => {
  const url = window.location.href;
  const token = url.split("/")[4]
  try {
    const changePassword = {
      password,
      confirmPassword,
    };
    const res = await fetch(`/api/reset_password/${token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(changePassword),
    });
    if (res.ok) {
      const data = await res.json();
      console.log('login loading.....');
      window.setTimeout(() => {
        location.assign('/login');
      }, 2000);
      showAlert('success', data.message);
    } else {
      const errorResponse = await res.json();
      console.log(errorResponse);
      showAlert('fail', errorResponse.message);
    }
  } catch (err) {
    showAlert('fail', 'Something went really wrong');
    console.log(err);
  }
};

studentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const password = document.getElementById('password').value;
  const confirmPassword = document.querySelector('#confirmPassword').value;

  resetPasswod(password, confirmPassword);

  studentForm.reset();
});
