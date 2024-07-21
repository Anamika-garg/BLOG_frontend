import React, { useState ,useContext} from 'react';
import {Link} from 'react-router-dom';
import { FaBars } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import logoo from '../../public/logoo.png';
import { UserContext } from '../Context/userContext';

const Header = () => {

  const [isNavShowing , setIsNavShowing] = useState(window.innerWidth > 800 ? true : false);
  const {currentUser} = useContext(UserContext);

  const closeNavHandler = () =>{
    if(window.innerWidth < 800){
      setIsNavShowing(false)
    }
    else{
      setIsNavShowing(true)
    }
  }
  return (
    <nav>
      <div className="container nav_container">
        <Link onClick={closeNavHandler} to="/" className='nav_logo'>
        <img src={logoo} height={80} width={90} alt="Navbar Logo" />
        </Link>

      {currentUser?.id && isNavShowing && <ul className='nav_menu'>
          <li><Link onClick={closeNavHandler} to = {`/profile/${currentUser.id}`}>{currentUser?.name}</Link></li>
          <li><Link onClick={closeNavHandler} to="/create">Create Post</Link></li>
          <li><Link onClick={closeNavHandler} to="/authors">Authors</Link></li>
          <li><Link onClick={closeNavHandler} to="/logout">Logout</Link></li>
        </ul>}

      {!currentUser?.id && isNavShowing && <ul className='nav_menu'>
          <li><Link onClick={closeNavHandler} to="/authors">Authors</Link></li>
          <li><Link onClick={closeNavHandler} to="/login">Login</Link></li>
        </ul>}
      <button className='nav_toggle-btn' onClick={() => setIsNavShowing(!isNavShowing)}>
        {
          isNavShowing ? <AiOutlineClose/> : <FaBars/>
        }
      </button>
      </div>
    </nav>
  )
}

export default Header