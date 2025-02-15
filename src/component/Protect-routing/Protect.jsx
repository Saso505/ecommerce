

/* eslint-disable */
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Protect(props) {
  if (localStorage.getItem('userToken') !== null) {
    // User is logged in, render the protected content
    return props.children;
  } else {
    // Redirect to the login page
    return <Navigate to="/login" />;
  }
}
