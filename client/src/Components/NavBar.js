import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
const NavBar = () => {
  const [cookies,setCookies]=useCookies(["access_token"])
  const navigate=useNavigate();
  const logout=()=>{
    setCookies("access_token","")
    window.localStorage.removeItem("userID");
    navigate("/auth")
  }
  return (
    <div className='nav'>
        <h>Recepie of Your Choice</h>
        <Link to="/">Home</Link>
        <Link to="/create-recipie">Create Recipie</Link>
        
        {!cookies.access_token?
        (<Link to="/auth">Login /Register</Link>):(<><Link to="/saved-recipie">Saved Recipie</Link><button onClick={logout}>Logout</button></>)
        }
    </div>
  )
}

export default NavBar