import React from 'react';
import "./common/styles/styles.css";
import "./common/styles/elementsStyles.css";
import { BottomPageComponent } from './components/PageComponents/BottomPageComponent';
import { TopPageComponent } from './components/PageComponents/TopPageComponent';

export const App = () => {
  return (
    <div className="app">
        <TopPageComponent />
        <BottomPageComponent />
    </div>
  );
}