import formatDate from '../../utils/formatDate';

function AccountHeader({user, accountFeature}) {
  return (

        <div className="jumbotron">
            <div className="container">
                <h1>My Account</h1>
                <h3>{user.name}</h3>
                <p>Welcome [{user.role}] : {user.email}</p>
                <p>Joined: {formatDate(user.createdAt)}</p>
                <p>{accountFeature}</p>
            </div>
        </div>



  );
}



export default AccountHeader;

