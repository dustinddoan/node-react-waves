import React from 'react';
import UserLayout from '../../HOC/user'
import UpdateInfo from './update_info'

const UpdateProfile = () => {
  return (
    <UserLayout>
      profile
      <UpdateInfo />
    </UserLayout>
  );
};

export default UpdateProfile;