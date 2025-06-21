document.addEventListener('DOMContentLoaded', () => {
  // Signup form
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const teaches = document.getElementById('teaches').value;
      const learns = document.getElementById('learns').value;
      
      try {
        const response = await fetch('/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, teaches, learns })
        });
        
        const data = await response.json();
        if (response.ok) {
          window.location.href = '/dashboard.html';
        } else {
          alert(data.error || 'Signup failed');
        }
      } catch (error) {
        alert('An error occurred. Please try again.');
      }
    });
  }

  // Login form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      try {
        const response = await fetch('/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        if (response.ok) {
          window.location.href = '/dashboard.html';
        } else {
          alert(data.error || 'Login failed');
        }
      } catch (error) {
        alert('An error occurred. Please try again.');
      }
    });
  }
});