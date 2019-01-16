import React from "react";
import UserLayout from "../../HOC/user";
import MyButton from '../utils/button'

// higher order component
const UserDashboard = ({user}) => {
  return (
    <UserLayout>
      <div>
        <div className="user_nfo_panel">
          <h1>User information</h1>
          <div>
            <span>{user.userData.name}</span>
            <span>{user.userData.lastname}</span>
            <span>{user.userData.email}</span>
          </div>
          <MyButton
            type="default"
            title="Edit accout info"
            linkTo="/user/user_profile" 
          />
        </div>

        <div className="user_nfo_panel">
          <h1>Order history</h1>
          <div className="user_product_block_wrapper">
            history
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
