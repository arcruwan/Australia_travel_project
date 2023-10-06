import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const UtilsDestination = Loadable(lazy(() => import('views/Ad-Destination/New-Destination')));
const VewDestinations = Loadable(lazy(() => import('views/Ad-Destination/VewDestinations')));
const AdActivities = Loadable(lazy(() => import('views/Activities/AdActivities')));
const ViewActivities = Loadable(lazy(() => import('views/Activities/ViewActivities')));
const CreatePackages = Loadable(lazy(() => import('views/Tour Packages/CreatePackages')));
// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'Destination',
      children: [
        {
          path: 'AdDestination',
          element: <UtilsDestination />
        }
      ]
    },
    {
      path: 'Destination',
      children: [
        {
          path: 'ViewDestinations',
          element: <VewDestinations />
        }
      ]
    },
    {
      path: 'Activities',
      children: [
        {
          path: 'AdActivities',
          element: <AdActivities />
        }
      ]
    },
    {
      path: 'Activities',
      children: [
        {
          path: 'ViewActivities',
          element: <ViewActivities />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'TourPackages',
      children: [
        {
          path: 'CreatePackages',
          element: <CreatePackages />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
