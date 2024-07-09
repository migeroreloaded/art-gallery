import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

function App() {
  return (
    <div>
      <h1>Art Gallery</h1>
      <RegisterForm />
      <LoginForm />
    </div>
  );}

export default App;
