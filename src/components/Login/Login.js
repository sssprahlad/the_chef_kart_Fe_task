import './Login.css';

import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserLoggedIn } from '../../redux/reducer/user';

const Login = () =>{
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const users = useSelector((state) => state.user.users);
    const dispatch = useDispatch();
    const userLoggedIn = useSelector((state) => state.user.userLoggedIn);
    
    const handleLogin = async (e) => {
        e.preventDefault();
        const user = users.find((user) => user.email === email)
        console.log(user,"user");
        if(user){
          if(user.password === password){
            dispatch(setUserLoggedIn(true));
              setTimeout(() => {
                navigate('/');
                setError('');
            }, 2000);
          }else{
            setError('Password not matched');
          }
        }else{
            setError('User not found');
        }
       
    }
    

    return (
        <div className="login-container">
  <h2>Login</h2>
  <form onSubmit={handleLogin} className="login-form">
    <input 
      type="email" 
      placeholder="Email" 
      value={email} 
      onChange={(e) => setEmail(e.target.value)} 
      required
    />
    <input 
      type="password" 
      placeholder="Password" 
      value={password} 
      onChange={(e) => setPassword(e.target.value)} 
      required
    />
    <button type="submit">Login</button>
  </form>
  {error && <p className="error">{error}</p>}
  <p className="register-para">Don't have an account?<Link to="/signup" className="register-link">
     Register
  </Link></p>
</div>

    );
}

export default Login;