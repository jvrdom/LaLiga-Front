import React from 'react';
import { Admin, Resource } from 'react-admin';
import UserIcon from '@material-ui/icons/People';
import { UserCreate, UserEdit, UserList } from './users';
import authProvider from '../providers/authProvider';
import dataProvider from '../providers/dataProvider';
import MyLoginPage from './login';

import '../../css/style.scss';

export default function Home() {
  return (
    <Admin
      title="My Custom Admin"
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={MyLoginPage}
    >
      <Resource
        name="users"
        icon={UserIcon}
        create={UserCreate}
        edit={UserEdit}
        list={UserList}
      />
    </Admin>
  );
}
