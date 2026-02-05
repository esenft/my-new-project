document.getElementById('submit-btn').addEventListener('click', async () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const messageDiv = document.getElementById('message');

  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  if (data.success) {
    messageDiv.textContent = 'recorded';
  } else {
    messageDiv.textContent = data.error || 'Error adding user.';
  }
});

document.getElementById('view-btn').addEventListener('click', async () => {
  const res = await fetch('/api/users');
  const users = await res.json();
  const userListDiv = document.getElementById('user-list');
  if (users.length === 0) {
    userListDiv.textContent = 'No users yet.';
    return;
  }
  userListDiv.innerHTML = '<ul>' + users.map(u => `<li>${u.name} (${u.email})</li>`).join('') + '</ul>';
});
