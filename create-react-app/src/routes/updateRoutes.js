import React from 'react';
import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const UpdateDestination = Loadable(lazy(() => import('views/pages/UpdareRecorders/UpdateDestination')));
const UpdateActivity = Loadable(lazy(() => import('views/pages/UpdareRecorders/UpdateActivity')));

const updateRoutes = {
  path: '/Update',
  element: <MainLayout />,
  children: [
    {
      path: 'Destination/:id', // Remove the leading slash
      element: <UpdateDestination />
    },
    {
      path: 'Activities/:id', // Remove the leading slash
      element: <UpdateActivity />
    }
  ]
};

export default updateRoutes;
