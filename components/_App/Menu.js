import {useRouter} from 'next/router'
import Router from 'next/router'
import { handleLogOut } from '../../utils/auth';

const handleRouteChange = url => {
    // console.log('App is changing to: ', url)
  }
  

function Menu({ showMenu, user }){

    Router.events.on('routeChangeStart', handleRouteChange)


    const router = useRouter();

    function isActive(route){//disables the links if we are on the current route
        return route === router.pathname;    
    }

    //the user obj was being passed i here as user : {user}
    //so i had to do this user.user
    const logOutLink = user.user
    ?
    <li><a onClick={handleLogOut}><i className="fas fa-sign-out-alt"></i>&nbsp;&nbsp;LOGOUT</a></li>
    :
    null; 

    if (showMenu){
        return (
            <>
                <ul className="menu">
                {/* https://css-tricks.com/how-to-disable-links/ */}
                    <li><a href="/shop" className={(isActive('/shop') ? 'isDisabled' : '' )}><i className="fas fa-store"></i>&nbsp;&nbsp;SHOP</a></li> 
                    <li><a href="/account" className={(isActive('/account') ? 'isDisabled' : '' )}><i className="fas fa-user"></i>&nbsp;&nbsp;MY ACCOUNT</a></li>
                    <li><a href="/search" className={(isActive('/search') ? 'isDisabled' : '' )}><i className="fas fa-search"></i>&nbsp;&nbsp;SEARCH</a></li>               
                    {logOutLink}
                </ul>
            </>
        )
    } else {
        return (
            null
        )
    }

}

export default Menu;