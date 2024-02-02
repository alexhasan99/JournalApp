import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login page', () => {
  render(<App />);
  const loginHeading = screen.getByText('Login');
  expect(loginHeading).toBeInTheDocument();

  const usernameInput = screen.getByLabelText('Username:');
  expect(usernameInput).toBeInTheDocument();

  const passwordInput = screen.getByLabelText('Password:');
  expect(passwordInput).toBeInTheDocument();

  const loginButton = screen.getByText('Log in');
  expect(loginButton).toBeInTheDocument();
});
