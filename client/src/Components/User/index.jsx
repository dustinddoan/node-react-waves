import React from "react";
import UserLayout from "../../HOC/user";
import MyButton from '../utils/button'

const UserDashboard = () => {
  return (
    <UserLayout>
      <div>
        <div className="user_nfo_panel">
          <h1>User information</h1>
          <div>
            <span>name</span>
            <span>lastname</span>
            <span>email</span>
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
