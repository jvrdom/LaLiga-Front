import React from 'react';
import PropTypes from 'prop-types';
import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  EmailField,
  ImageInput,
  ImageField,
  List,
  SimpleForm,
  SimpleList,
  TextField,
  TextInput,
  email,
  required,
} from 'react-admin';
import { useMediaQuery } from '@material-ui/core';

function UserTitle({ record }) {
  return (
    <span>
      User
      {' '}
      { record ? `"${record.first_name}"` : ''}
    </span>
  );
}

function UserList(props) {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <List {...props} perPage={5} exporter={false} bulkActionButtons={false}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.first_name}
          secondaryText={(record) => record.last_name}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid optimized>
          <TextField source="id" sortable={false} />
          <TextField source="first_name" sortable={false} />
          <TextField source="last_name" sortable={false} />
          <EmailField source="email" sortable={false} />
          <ImageField source="avatar" title="avatar" sortable={false} />
          <EditButton />
        </Datagrid>
      )}
    </List>
  );
}

function UserEdit(props) {
  const validateEmail = [required(), email()];
  const validateFirstName = [required()];

  return (
    <Edit title={<UserTitle />} {...props}>
      <SimpleForm>
        <TextField source="id" />
        <TextInput source="first_name" validate={validateFirstName} />
        <TextInput source="last_name" validate={validateFirstName} />
        <TextInput source="email" validate={validateEmail} />
      </SimpleForm>
    </Edit>
  );
}

function UserCreate(props) {
  const validateEmail = [required(), email()];
  const validateFirstName = [required()];

  return (
    <Create {...props}>
      <SimpleForm redirect="list">
        <ImageInput source="avatar" label="Avatar" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
        <TextInput source="first_name" validate={validateFirstName} />
        <TextInput source="last_name" validate={validateFirstName} />
        <TextInput source="email" validate={validateEmail} />
      </SimpleForm>
    </Create>
  );
}

export {
  UserList,
  UserEdit,
  UserCreate,
};

UserTitle.propTypes = {
  // eslint-disable-next-line react/require-default-props
  record: PropTypes.shape({
    first_name: PropTypes.string,
  }),
};
