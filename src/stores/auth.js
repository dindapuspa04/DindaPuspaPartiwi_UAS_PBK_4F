import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null, // Persist user state
    token: localStorage.getItem('token') || null, // Persist token
    error: null,
    loading: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user && !!state.token,
    getUserRole: (state) => state.user?.role || null,
  },
  actions: {
    async login(username, password) {
      this.loading = true;
      this.error = null;
      try {
        // Simulate API call to json-server for users
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
          throw new Error('Failed to fetch user data.');
        }
        const users = await response.json();
        const foundUser = users.find(u => u.username === username && u.password === password);

        if (foundUser) {
          // Simulate a simple token and user object
          this.user = { id: foundUser.id, username: foundUser.username, role: foundUser.role };
          this.token = `mock-token-${foundUser.id}`; // Simple mock token
          localStorage.setItem('user', JSON.stringify(this.user));
          localStorage.setItem('token', this.token);
          this.loading = false;
          return true; // Login successful
        } else {
          this.error = 'Invalid username or password.';
          this.loading = false;
          return false; // Login failed
        }
      } catch (err) {
        this.error = err.message || 'Login failed due to network or server error.';
        this.loading = false;
        console.error('Login error:', err);
        return false;
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.error = null; // Clear any previous errors
    }
  },
});