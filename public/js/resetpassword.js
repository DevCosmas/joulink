const studentForm = document.querySelector('.studentForm');

const resetPasswod = async (password, confirmPassword) => {
  const url = window.location.href;
  const token = url.split("/")[4]
//     console.log('Token:', token);
//   console.log('url:', url);
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
      }, 1000);
      console.log(data);
      // showAlert('success', 'Your application was received successfully');
    } else {
      const errorResponse = await res.json();
      console.log(errorResponse);
      // showAlert('fail', errorResponse.message || 'Application not successful. Try again!');
    }
  } catch (err) {
    console.Error(err);
  }
};

studentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const password = document.getElementById('password').value;
  const confirmPassword = document.querySelector('#confirmPassword').value;

  resetPasswod(password, confirmPassword);

  studentForm.reset();
});
