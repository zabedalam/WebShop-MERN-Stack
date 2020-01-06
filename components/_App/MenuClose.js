function MenuClose({ showMenu }){

    if (showMenu === true){
        return (

                <i className="fas fa-times"></i>
        )
    } else {
        return (
            null
            
        )
    }

}

export default MenuClose;