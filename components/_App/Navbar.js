import React from 'react';
import Menu from './Menu'
import MenuOpen from './MenuOpen';
import MenuClose from './MenuClose';

class Navbar extends React.Component {
  constructor(props) { 
    super(props);

    this.state = {
      showMenu: false
    };
    // console.log(this.state);
    // this.toggleShowMenu = this.toggleShowMenu.bind(this);
  }

   toggleShowMenu(){
    const currentState = this.state.showMenu;
    this.setState({ showMenu: !currentState });
    // console.log(this.state)
  }
  render() {
    const { showMenu } = this.state;
    const { user } = this.props;
    //console.log(user);

    return (
      <header>
        <nav>
            <div className="logo">
                <a href="/">
                    {/* <i className="fas fa-cookie-bite"></i> */}
                    <i className="fas fa-home"></i>
                </a>
            </div>
            <div className="links-menu">
              <Menu showMenu={showMenu} user={user}/>
            </div>
            
            <div className="link-resp-menu"> 
                <a href="#" 
                onClick={()=>this.toggleShowMenu()} 
                className="trigger-menu">
                  <MenuOpen showMenu={showMenu}/>
                </a>  
            
                <a href="#" onClick={()=>this.toggleShowMenu()}
                className="close-menu">
                  <MenuClose showMenu={showMenu}/>
                </a>             
              </div>
            <div className="clearfix"></div>

        </nav>
    </header>
    )
  }
}

export default Navbar;