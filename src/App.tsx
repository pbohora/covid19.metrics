import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Layout from './pages/Layout';
import { setupStore } from './state/store';
import LoadingSpinner from './components/LoadingSpinner';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const App = () => {
  return (
    <Provider store={setupStore()}>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
};

export default App;
