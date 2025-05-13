import { Injectable } from '@angular/core';
import { UserService } from  '../../../../services/User/user.service'; // adjust the path
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const ProcurementNavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item',
      },
       {
        id: 'chatbot',
        title: 'Chatbot',
        type: 'item',
        url: '/chatbot',
        icon: 'feather icon-message-circle',
        classes: 'nav-item',
      },
    ],
  },
  {
    id: 'ProcurementManagment',
    title: 'Procurement Managment',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/procurement/dashboard',
        icon: 'feather icon-bar-chart',
        classes: 'nav-item',
      },
      {
        id: 'basic',
        title: 'Prediction',
        type: 'collapse',
        icon: 'feather icon-activity',
        children: [
          {
            id: 'button',
            title: 'Delay Days',
            type: 'item',
            url: '/procurement/delaydays',
          },
          {
            id: 'badges',
            title: 'Probability Of Delay',
            type: 'item',
            url: '/procurement/probdelay',
          },
          {
            id: 'time series',
            title: 'time series',
            type: 'item',
            url: '/procurement/timeseries',
          },  {
            id: 'recommendations',
            title: 'Recommendations',
            type: 'item',
            url: '/procurement/recommendations',
          },   
        ],
      },
    ],
  },
]

const DistributionNavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item',
      },
      {
        id: 'chatbot',
        title: 'Chatbot',
        type: 'item',
        url: '/chatbot',
        icon: 'feather icon-message-circle',
        classes: 'nav-item',
      },
    ],
  },
  {
    id: 'DistributionManagment',
    title: 'Distribution Managment',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/distribution/dashboard',
        icon: 'feather icon-bar-chart',
        classes: 'nav-item',
      },
      {
        id: 'basic',
        title: 'Prediction',
        type: 'collapse',
        icon: 'feather icon-activity',
        children: [
          {
            id: 'button',
            title: 'hours',
            type: 'item',
            url: '/distribution/hours',
          },
          {
            id: 'badges',
            title: 'defection',
            type: 'item',
            url: '/distribution/defect',
          }   
        ],
      }
    ],
  },
]

const ProductionNavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item',
      },
      {
        id: 'chatbot',
        title: 'Chatbot',
        type: 'item',
        url: '/chatbot',
        icon: 'feather icon-message-circle',
        classes: 'nav-item',
      },
    ],
  },
  {
    id: 'ProductionManagment',
    title: 'Production Managment',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/production/dashboard',
        icon: 'feather icon-bar-chart',
        classes: 'nav-item',
      },
      {
        id: 'basic',
        title: 'Prediction',
        type: 'collapse',
        icon: 'feather icon-activity',
        children: [
          {
            id: 'button',
            title: 'Performance',
            type: 'item',
            url: '/production/performance',
          },
          {
            id: 'badges', 
            title: 'delay',
            type: 'item',
            url: '/production/delay',
          }
            
        ],
      },
    ],
  }
]
const WarehouseNavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item',
      },
      {
        id: 'chatbot',
        title: 'Chatbot',
        type: 'item',
        url: '/chatbot',
        icon: 'feather icon-message-circle',
        classes: 'nav-item',
      },
    ],
  },
  {
    id: 'WarehouseManagment',
    title: 'Warehouse Managment',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/warehouse/dashboard',
        icon: 'feather icon-bar-chart',
        classes: 'nav-item',
      },
      {
        id: 'basic',
        title: 'Prediction',
        type: 'collapse',
        icon: 'feather icon-activity',
        children: [
          {
            id: 'button',
            title: 'Risk',
            type: 'item',
            url: '/warehouse/risque',
          },
          {
            id: 'badges',
            title: 'Final Stock',
            type: 'item',
            url: '/warehouse/finalstock',
          }
            
        ],
      },
    ],
  },
]




const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item',
      },
      {
        id: 'chatbot',
        title: 'Chatbot',
        type: 'item',
        url: '/chatbot',
        icon: ' feather icon-message-circle',
        classes: 'nav-item',
      },
    ],
  },  {
    id: 'UserManagment',
    title: 'User Managment',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'addUser',
        title: 'Add User',
        type: 'item',
        url: '/add-user',
        icon: 'feather icon-user',
        classes: 'nav-item',
      },
      {
        id: 'ListUser',
        title: 'List User',
        type: 'item',
        url: '/list-users',
        icon: 'feather icon-list',
        classes: 'nav-item',
      },
    ],
  },
  {
    id: 'ProcurementManagment',
    title: 'Procurement Managment',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/procurement/dashboard',
        icon: 'feather icon-bar-chart',
        classes: 'nav-item',
      },
      {
        id: 'basic',
        title: 'Prediction',
        type: 'collapse',
        icon: 'feather icon-activity',
        children: [
          {
            id: 'button',
            title: 'Delay Days',
            type: 'item',
            url: '/procurement/delaydays',
          },
          {
            id: 'badges',
            title: 'Probability Of Delay',
            type: 'item',
            url: '/procurement/probdelay',
          },
          {
            id: 'time series',
            title: 'time series',
            type: 'item',
            url: '/procurement/timeseries',
          },  {
            id: 'recommendations',
            title: 'Recommendations',
            type: 'item',
            url: '/procurement/recommendations',
          },   
        ],
      },
    ],
  },
 

  {
    id: 'WarehouseManagment',
    title: 'Warehouse Managment',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/warehouse/dashboard',
        icon: 'feather icon-bar-chart',
        classes: 'nav-item',
      },
      {
        id: 'basic',
        title: 'Prediction',
        type: 'collapse',
        icon: 'feather icon-activity',
        children: [
          {
            id: 'button',
            title: 'Risk',
            type: 'item',
            url: '/warehouse/risque',
          },
          {
            id: 'badges',
            title: 'Final Stock',
            type: 'item',
            url: '/warehouse/finalstock',
          }
            
        ],
      },
    ],
  },
  {
    id: 'ProductionManagment',
    title: 'Production Managment',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/production/dashboard',
        icon: 'feather icon-bar-chart',
        classes: 'nav-item',
      },
      {
        id: 'basic',
        title: 'Prediction',
        type: 'collapse',
        icon: 'feather icon-activity',
        children: [
          {
            id: 'button',
            title: 'Performance',
            type: 'item',
            url: '/production/performance',
          },
          {
            id: 'badges',
            title: 'delay',
            type: 'item',
            url: '/production/delay',
          }
            
        ],
      },


    ],
  }, {
    id: 'DistributionManagment',
    title: 'Distribution Managment',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/distribution/dashboard',
        icon: 'feather icon-bar-chart',
        classes: 'nav-item',
      },
      {
        id: 'basic',
        title: 'Prediction',
        type: 'collapse',
        icon: 'feather icon-activity',
        children: [
          {
            id: 'button',
            title: 'hours',
            type: 'item',
            url: '/distribution/hours',
          },
          {
            id: 'badges',
            title: 'defection',
            type: 'item',
            url: '/distribution/defect',
          }   
        ],
      }
    ],
  }
];

@Injectable()
export class NavigationItem {
 
  get() {
 const role = localStorage.getItem('role') || '';
  
if (role === 'admin') {
      return NavigationItems;
    }else if (role === 'procurment') {
      return ProcurementNavigationItems;
    }else if (role === 'distribution') {
      return DistributionNavigationItems;}
    else if (role === 'production') {
      return ProductionNavigationItems;
    }else if (role === 'inventory') {
      return WarehouseNavigationItems;
    }else {
      
      return null; // Default to all items if role is unknown
    }


    
  
}

  }

