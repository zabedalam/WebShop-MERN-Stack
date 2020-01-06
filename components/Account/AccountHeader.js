// import { Header, Icon, Segment, Label } from "semantic-ui-react";
// import formatDate from "../../utils/formatDate";

// function AccountHeader({ role, email, name, createdAt }) {
//   return (
//     <Segment secondary inverted color="violet">
//       <Label
//         color="teal"
//         size="large"
//         ribbon
//         icon="privacy"
//         style={{ textTransform: "capitalize" }}
//         content={role}
//       />
//       <Header inverted textAlign="center" as="h1" icon>
//         <Icon name="user" />
//         {name}
//         <Header.Subheader>{email}</Header.Subheader>
//         <Header.Subheader>Joined {formatDate(createdAt)}</Header.Subheader>
//       </Header>
//     </Segment>
//   );
// }

// export default AccountHeader;

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

