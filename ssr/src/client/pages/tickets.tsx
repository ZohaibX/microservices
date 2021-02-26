import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../redux/1-actions';
import { Connect } from './../redux/4-connect';

const Tickets = (props: any) => {
  useEffect(() => {
    /* sync state with the URL */
    props.fetchingUsers();
  }, []);

  // console.log(props.users);

  return (
    <div>
      <h1> Tickets </h1>
      <ul>
        {props.users.map((user) => (
          <li key={user.id + user.name}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

function loadData(store) {
  // return store.dispatch(fetchUsers());
  if (store) {
    if (store.dispatch) {
      return store.dispatch(fetchUsers); // not calling
    }
  }
}

export { loadData };

export default Connect(Tickets);
