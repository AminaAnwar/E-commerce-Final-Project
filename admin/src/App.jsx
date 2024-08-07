import React, { useEffect, Suspense } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import routes from './routes';

import './css/style.css';

import './charts/ChartjsConfig';
import FullPageLoader from './components/FullPageLoader/FullPageLoader';


function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
    <Suspense fallback={<FullPageLoader/>}>
      <Routes>
        {routes.map((route,index) => (
        <Route key={index} path={route.path} element={<route.layout><route.element/></route.layout>} />
        ))}
      </Routes>
      </Suspense>
    </>
  );
}

export default App;
