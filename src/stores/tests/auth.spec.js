import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '../auth';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia()); // Reset Pinia store before each test
    localStorage.clear(); // Clear localStorage before each test
    vi.clearAllMocks(); // Clear mock after each test
  });

  it('should initialize with no user or token', () => {
    const auth = useAuthStore();
    expect(auth.user).toBeNull();
    expect(auth.token).toBeNull();
    expect(auth.isAuthenticated).toBe(false);
  });

  it('should set user and token on successful login', async () => {
    // Mock fetch API to return a matching user
    vi.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: 'u1', username: 'testuser', password: 'password', role: 'teacher' }]),
      })
    );

    const auth = useAuthStore();
    const success = await auth.login('testuser', 'password');

    expect(success).toBe(true);
    expect(auth.user).toEqual({ id: 'u1', username: 'testuser', role: 'teacher' });
    expect(auth.token).toBe('mock-token-u1');
    expect(auth.isAuthenticated).toBe(true);
    expect(localStorage.getItem('user')).toBe(JSON.stringify({ id: 'u1', username: 'testuser', role: 'teacher' }));
    expect(localStorage.getItem('token')).toBe('mock-token-u1');
    expect(auth.loading).toBe(false);
    expect(auth.error).toBeNull();
  });

  it('should clear user and token on logout', async () => {
    // Set some initial state to be cleared
    const auth = useAuthStore();
    auth.user = { id: 'u1', username: 'testuser', role: 'teacher' };
    auth.token = 'mock-token-u1';
    localStorage.setItem('user', JSON.stringify(auth.user));
    localStorage.setItem('token', auth.token);

    auth.logout();

    expect(auth.user).toBeNull();
    expect(auth.token).toBeNull();
    expect(auth.isAuthenticated).toBe(false);
    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('should set error on failed login (invalid credentials)', async () => {
    // Mock fetch API to return no matching user
    vi.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: 'u1', username: 'correctuser', password: 'correctpassword' }]), // Only correctuser exists
      })
    );

    const auth = useAuthStore();
    const success = await auth.login('wronguser', 'wrongpassword');

    expect(success).toBe(false);
    expect(auth.user).toBeNull();
    expect(auth.token).toBeNull();
    expect(auth.error).toBe('Invalid username or password.');
    expect(auth.isAuthenticated).toBe(false);
    expect(auth.loading).toBe(false);
  });

  it('should set error on fetch failure during login', async () => {
    // Mock fetch API to simulate a network error
    vi.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.reject(new Error('Network Error during fetch'))
    );

    const auth = useAuthStore();
    const success = await auth.login('testuser', 'password');

    expect(success).toBe(false);
    expect(auth.user).toBeNull();
    expect(auth.token).toBeNull();
    expect(auth.error).toBe('Network Error during fetch');
    expect(auth.isAuthenticated).toBe(false);
    expect(auth.loading).toBe(false);
  });
});