import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AppRouter } from './routing';
import { Login } from './login/login';
import Integrate from './cart-management/integrate';
import { KeyboardShortcut } from './keyboard-shortcut/keyboard';
import { RegisterNo } from './login/register2';
import { Register } from './login/register';
import { useAppSelector } from './store/hook';
import { ConfigProvider, ThemeConfig } from 'antd';
import { darkTheme, lightTheme } from './theme/theme-config';

export enum ThemeType{
  LIGHT ="light",
  DARK="dark"
}

export const App:React.FC =() => {

  const theme = useAppSelector((state) => state.theme) as unknown;
  
  
  const themeConfig: ThemeConfig = 
  theme === ThemeType.LIGHT ? { ...lightTheme} :{ ...darkTheme};

  return (
    <div className={`App${theme}`}>
      <ConfigProvider
      theme={themeConfig}
      textArea={{className:`${theme}tron-input`}}
      >
       <AppRouter/>
       </ConfigProvider>

    </div>
  );
}


