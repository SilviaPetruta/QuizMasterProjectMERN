import React, {useContext, useRef, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import AuthService from '../middlewares/AuthService';
import { AuthContext } from '../Context/AuthContext';
import Image1 from '../images/image1.jpeg'; 
import Image2 from '../images/image2.jpeg'; 
import Image3 from '../images/image3.jpeg'; 

const Navbar = (props) =>{
    const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);

    let timerID = useRef(null);

    useEffect(()=>{
        return ()=>{
            clearTimeout(timerID);
        }
    },[]);
    
    const onClickLogoutHandler = ()=>{
        AuthService.logout().then(async(data)=>{
            if(data.success){
                setUser(data.user);
                setIsAuthenticated(false);

                timerID = setTimeout(()=>{
                    props.history.push(`/login`);
                },500);
            }
        });
    }

    const unauthenticatedNavBar = ()=>{
        return (
            <>
               
                    <Link className='link-component' to="/">
                        <li className="nav-list-item">
                            HOME
                        </li>
                    </Link>  
                    <Link className='link-component' to="/login">
                        <li className="nav-list-item">
                            LOGIN
                        </li>
                    </Link>  
                    <Link className='link-component'  to="/register">
                        <li className="nav-list-item">
                            REGISTER
                        </li>
                    </Link>
       
            </>
        )
    }

    const authenticatedNavBar = ()=>{
        return(
            <>
                <Link className='link-component' to="/home">
                    <li className="nav-list-item">
                        Home
                    </li>
                </Link> 
                <Link className='link-component' to="/quizPage">
                    <li className="nav-list-item">
                        Quiz
                    </li>
                </Link> 
                <Link className='link-component' to="/top10">
                    <li className="nav-list-item">
                        Top 10 Scores
                    </li>
                </Link> 
                
                {/* {
                    user.role === "admin" ? 
                    <Link to="/admin">
                        <li className="nav-item nav-link">
                            ADMIN
                        </li>
                    </Link> : null
                }   */}
                
                <a type="button" className="logout-btn" onClick={onClickLogoutHandler}>
                    LOGOUT
                </a>
                
            </>
        )
    }

    const handlerForClosingNavbar = (event) => {
        if(event.target.className == 'nav-list-item' || event.target.className == 'link-component') {

        }
    }

    return(
        
        <div className='navbar'>
            <input type="checkbox" id="check" className="checkbox" hidden />     
            <div className="navbar-menu-button">
                <label htmlFor="check" className="menu">
                    <div className="menu-line menu-line-1"></div>
                    <div className="menu-line menu-line-2"></div>
                    <div className="menu-line menu-line-3"></div>
                </label>
            </div>
            <div className="navbar-navigation">
                <div className="navbar-navigation-left">
                    <img src={Image1} className="left-img left-img-1"/>
                    <img src={Image2} className="left-img left-img-2"/>
                    <img src={Image3} className="left-img left-img-3"/>
                </div>
                <div className="navbar-navigation-right">
                    <input type="checkbox" id="check-mate" className="checkbox-mate" hidden/> 
                    <ul className="navbar-navigation-list" onClick={handlerForClosingNavbar}>
                        <label htmlFor="check-mate" className="links">
                            { !isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
                        </label>
                    </ul>                    
                </div>
            </div>
            
        </div>
    )
}

export default withRouter(Navbar);