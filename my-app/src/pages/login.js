import { useRouter } from 'next/router'; // Import useRouter
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Import useAuth


const LoginPage = () => {

  const router = useRouter(); // Initialize the router
  
  const { setIsLoggedIn } = useAuth(); // Get the setIsLoggedIn function

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [error, setError] = useState('');

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      // Handle successful login
      console.log('Login successful', response.data);
      
      // Save user data and token in local storage
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Assuming user data is in response.data.user
      localStorage.setItem('token', response.data.token); // Assuming you get a token for session

      setIsLoggedIn(true); // Set logged in state to true

      // Redirect to home page
      router.push('/'); // Make sure to import useRouter from next/router
    } catch (err) {
      setError('Invalid credentials');
    }
  };  

  // Handle Create Account
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signup', { firstName, lastName, email, password });
      // Handle successful account creation
      console.log('Account created', response.data);
    } catch (err) {
      setError('Error creating account');
    }
  };

  return (
    <div className="login-page">
      <h1>{isCreatingAccount ? 'Create an Account' : 'Login'}</h1>
      {error && <p className="error">{error}</p>}
      
      {!isCreatingAccount ? (
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Login</button>
          <p onClick={() => setIsCreatingAccount(true)}>Don't have an account? Sign up</p>
        </form>
      ) : (
        <form onSubmit={handleCreateAccount}>
          <div>
            <label>First Name:</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </div>
          <div>
            <label>Last Name:</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Create Account</button>
          <p onClick={() => setIsCreatingAccount(false)}>Already have an account? Login</p>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
