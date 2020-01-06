import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { useRouter } from 'next/router';
const NewModal = ({ handleClose, showModal, children, _id }) => {

  const router = useRouter();

  //may be we are not doing this using getInitialProps because this is being done on a btn click
  async function handleDelete(e){
    e.preventDefault();
    try {
    
      const url = `${baseUrl}/api/product`;
      const payload = { params: { _id } };
      await axios.delete(url, payload);
      router.push('/shop');//redirect to shop after deleting 
    
    } catch (error) {
      console.log(error);
    }

  }

//https://alligator.io/react/modal-component/
    return (
        <div className={showModal ? "modal display-block" : "modal display-none"}>
        <div className="modal-main">
        <button className="close" id="modal-close" onClick={handleClose} 
        style={{
          backgroundColor: '#b0e2a775',
          border: '0px',
          color: 'black',
          fontSize: '200%',
          padding: '5px'
        }}
        >&times;</button>

            <div className="modal-content">
            <h3>Confirm Delete!</h3>
            <button className="btn btn-danger" onClick={handleDelete}>YES</button>
            </div>
        </div>
      </div>
    );
  };

export default NewModal;  