import './SignUp.css';

import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {setUsers} from '../../redux/reducer/user';
import { setUserLoggedIn } from '../../redux/reducer/user';



const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 

    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users);

    console.log(users, "users from Redux");


    const handleRegister = async(e) => {
      e.preventDefault();
      const newUser = {
        name,
        email,
        password
      };
      console.log(newUser,"newUser");
      
      dispatch(setUsers(newUser));
     const checkUser = users.find((user) => user.email === email)
     console.log(checkUser,"checkUser");
     if(checkUser){
      setError('User already exists');
     }else{
      setError('user registered successfully');
      dispatch(setUserLoggedIn(true));
      setTimeout(() => {
        navigate('/');
        setError('');
      }, 2000);
    }
    
      setName('');
      setEmail('');
      setPassword('');
    }



    return(
        <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister} className="register-form">
          <input 
            type="text" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
          />
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
          <button type="submit">Register</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p className="register-para">Already have an account?<Link to="/login" className="register-link">
           Login
        </Link></p>
      </div>
      
    )
}

export default SignUp