import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AppRouter } from './routing';
import { Login } from './login/login';
import Integrate from './cart-management/integrate';
import { KeyboardShortcut } from './keyboard-shortcut/keyboard';
import { RegisterNo } from './login/register2';
import { Register } from './login/register';

export const App:React.FC =() => {
  return (
    <div className="App">
       <Register/>
    </div>
  );
}


