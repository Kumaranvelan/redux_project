import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AppRouter } from './routing';
import { Login } from './login/login';
import Integrate from './cart-management/integrate';
import { KeyboardShortcut } from './keyboard-shortcut/keyboard';

export const App:React.FC =() => {
  return (
    <div className="App">
       <KeyboardShortcut/>
    </div>
  );
}


