
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

const logInFn = async (email, password) => {
  try {
    const logInDetails = {
      email,
      password,
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
      showAlert('success', data.message);
      window.setTimeout(() => {
        location.assign('/overview');
      }, 1000);
    } else {
      const response = await res.json();
      console.log(response);
      showAlert('fail', response.message);
    }
  } catch (err) {
    showAlert('fail', 'Something went really wrong!');
    console.log(err);
  }
};

studentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const password = document.getElementById('password').value;
  const email = document.querySelector('#email').value;

  logInFn(email, password);

  studentForm.reset();
});

