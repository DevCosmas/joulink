document
  .getElementById('password-setting')
  .addEventListener('submit', async (e) => {
    e.preventDefault();

    const setPassword = new FormData();

    setPassword.append(
      'currentPassword',
      document.getElementById('password-current').value
    );
    setPassword.append('password', document.getElementById('password').value);
    setPassword.append(
      'confirmPassword',
      document.getElementById('password-confirm').value
    );

    console.log(setPassword)

    try {
      const res = await fetch('/api/changePassword', {
        method: 'POST',
        body: setPassword,
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

    // document.querySelector('.password-setting').reset();
  });
