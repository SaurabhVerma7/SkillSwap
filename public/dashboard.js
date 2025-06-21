document.addEventListener('DOMContentLoaded', async () => {
  // Check authentication
  const checkAuth = async () => {
    try {
      const response = await fetch('/users/me');
      if (!response.ok) {
        window.location.href = '/login.html';
        return null;
      }
      return await response.json();
    } catch (error) {
      window.location.href = '/login.html';
      return null;
    }
  };

  const user = await checkAuth();
  if (!user) return;

  // Display user info
  const userInfoEl = document.getElementById('userInfo');
  if (userInfoEl) {
    userInfoEl.innerHTML = `
      <h2>Welcome, ${user.name}!</h2>
      <p>Email: ${user.email}</p>
      <div class="skills">
        <div>
          <h3>You Teach:</h3>
          <ul>${user.teaches.map(skill => `<li>${skill}</li>`).join('')}</ul>
        </div>
        <div>
          <h3>You Learn:</h3>
          <ul>${user.learns.map(skill => `<li>${skill}</li>`).join('')}</ul>
        </div>
      </div>
    `;
  }

  // Load matches
  const loadMatches = async () => {
    try {
      const response = await fetch('/match');
      if (!response.ok) throw new Error('Failed to load matches');
      const matches = await response.json();
      
      const matchesEl = document.getElementById('matches');
      if (matchesEl) {
        matchesEl.innerHTML = matches.length ? 
          matches.map(match => `
            <div class="user-card">
              <h3>${match.name}</h3>
              <div class="skills">
                <div>
                  <h4>Teaches:</h4>
                  <ul>${match.teaches.map(skill => `<li>${skill}</li>`).join('')}</ul>
                </div>
                <div>
                  <h4>Learns:</h4>
                  <ul>${match.learns.map(skill => `<li>${skill}</li>`).join('')}</ul>
                </div>
              </div>
            </div>
          `).join('') : '<p>No matches found. Try searching for skills!</p>';
      }
    } catch (error) {
      console.error('Error loading matches:', error);
    }
  };

  // Search functionality
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const skill = document.getElementById('skill').value;
      
      try {
        const response = await fetch(`/users/search?skill=${encodeURIComponent(skill)}`);
        const results = await response.json();
        
        const resultsEl = document.getElementById('results');
        resultsEl.innerHTML = results.length ? 
          results.map(user => `
            <div class="user-card">
              <h3>${user.name}</h3>
              <div class="skills">
                <div>
                  <h4>Teaches:</h4>
                  <ul>${user.teaches.map(skill => `<li>${skill}</li>`).join('')}</ul>
                </div>
                <div>
                  <h4>Learns:</h4>
                  <ul>${user.learns.map(skill => `<li>${skill}</li>`).join('')}</ul>
                </div>
              </div>
            </div>
          `).join('') : '<p>No users found teaching this skill.</p>';
      } catch (error) {
        console.error('Search error:', error);
      }
    });
  }

  // Logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      try {
        await fetch('/auth/logout', { method: 'GET' });
        window.location.href = '/login.html';
      } catch (error) {
        console.error('Logout error:', error);
      }
    });
  }

  // Load matches on dashboard
  if (window.location.pathname.includes('dashboard.html')) {
    await loadMatches();
  }
});