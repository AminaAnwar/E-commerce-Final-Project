import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Banner from '../partials/Banner';
import { Navigate } from 'react-router-dom';

function Auth({children}) {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("token")

  if(!token) {
    return <Navigate to="/login"/>
  }


  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
         {children}
        </main>

        <Banner />

      </div>
    </div>
  );
}

export default Auth;