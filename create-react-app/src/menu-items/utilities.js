// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconForms, IconMapPin, IconMap } from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconForms,
  IconMapPin,
  IconMap
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Typography',
      type: 'item',
      url: '/utils/util-typography',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'util-color',
      title: 'Color',
      type: 'item',
      url: '/utils/util-color',
      icon: icons.IconPalette,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: 'Shadow',
      type: 'item',
      url: '/utils/util-shadow',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'Things_to_Do',
      title: 'Things to Do',
      type: 'collapse',
      icon: icons.IconMapPin,
      children: [
        {
          id: 'AdDestination',
          title: 'Ad Destination',
          type: 'item',
          url: '/Destination/AdDestination',
          breadcrumbs: false
        },
        {
          id: 'ViewDestinations',
          title: 'View Destinations',
          type: 'item',
          url: '/Destination/ViewDestinations',
          breadcrumbs: false
        },
        {
          id: 'AdActivities',
          title: 'Ad Activities',
          type: 'item',
          url: '/Activities/AdActivities',
          breadcrumbs: false
        },
        {
          id: 'ViewActivities',
          title: 'View Activities',
          type: 'item',
          url: '/Activities/ViewActivities',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'TourPackages',
      title: 'Tour Packages',
      type: 'collapse',
      icon: icons.IconMap,
      children: [
        {
          id: 'CreatePackages',
          title: 'Create Packages',
          type: 'item',
          url: '/TourPackages/CreatePackages',
          breadcrumbs: false
        },
        {
          id: 'ViewDestinations',
          title: 'View Destinations',
          type: 'item',
          url: '/Destination/ViewDestinations',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'icons',
      title: 'Icons',
      type: 'collapse',
      icon: icons.IconWindmill,
      children: [
        {
          id: 'tabler-icons',
          title: 'Tabler Icons',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false
        },
        {
          id: 'material-icons',
          title: 'Material Icons',
          type: 'item',
          external: true,
          target: '_blank',
          url: 'https://mui.com/material-ui/material-icons/',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default utilities;
