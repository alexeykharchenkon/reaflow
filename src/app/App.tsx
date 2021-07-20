import React from 'react';
import "@styles/styles.css";
import "@styles/elementsStyles.css";
import "@styles/toolBoxStyles.css";
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