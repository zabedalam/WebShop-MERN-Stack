import ModalContent from './ModalContent';

function Modal({showModal, children}){
    const modal = showModal 
    ? 
    <div id="myModal" className="modal">
        {children}
    </div>
    :
    null;  


    return(
      modal
    )
}

export default Modal;