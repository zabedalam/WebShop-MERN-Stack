function MenuOpen({ showMenu }){

    if (!showMenu){
        return (
            <>
                    <i className="fas fa-bars"></i>
            </>
        )
    } else {
        return (
            null
            
        )
    }

}

export default MenuOpen;