import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../redux/1-actions';
import { Connect } from './../redux/4-connect';

const Tickets = (props: any) => {
  useEffect(() => {
    // this fetch is already happening on the server side, if user navigates to this page, he will automatically get users list
    // but if he somehow navigate to this page thru the way, from where, server side is not rendered
    // then, we should also have data on client side, so thats y, we will fetch data here too
    props.fetchingUsers();
  }, []);

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

export default {
  loadData: loadData,
  component: Connect(Tickets),
};
