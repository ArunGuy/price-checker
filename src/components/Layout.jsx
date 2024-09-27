import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Onboarding from './Onboarding';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
      <Onboarding />
    </div>
  );
};

export default Layout;