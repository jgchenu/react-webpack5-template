import React from 'react';
import Dashboard from '$src/containers/Dashboard';
import DashboardMessages from '$src/containers/DashboardMessages';
import DashboardTasks from '$src/containers/DashboardTasks';
import { useRoutes } from 'react-router-dom';

const routes = [
  {
    path: '/',
    element: <Dashboard />,
    children: [
      { index: true, element: 'not matched' },
      {
        path: 'messages',
        element: <DashboardMessages />,
      },
      { path: 'tasks', element: <DashboardTasks /> },
    ],
  },
];

function Routes() {
  const element = useRoutes(routes);
  return element;
}

export default Routes;
