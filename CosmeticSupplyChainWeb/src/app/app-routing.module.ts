import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { AddUpdateUserComponent } from './demo/Users/add-update-user/add-update-user.component';
import { ListUsersComponent } from './demo/Users/list-users/list-users.component';
import { ChangePasswordComponent } from './demo/Users/change-password/change-password.component';
import { ProcurementdashboardComponent } from './demo/Procurement/procurementdashboard/procurementdashboard.component';
import { WarhousedashboardComponent } from './demo/Warehouse/warhousedashboard/warhousedashboard.component';
import {ProductionDashboardComponent} from './demo/Production/production-dashboard/production-dashboard.component';
import { DistributionDashboardComponent } from './demo/Distribution/distribution-dashboard/distribution-dashboard.component';
import {DelayDaysComponent} from './demo/Procurement/Predict/delay-days/delay-days.component';
import { ProbDelayComponent } from './demo/Procurement/Predict/prob-delay/prob-delay.component';
import { TimeSeriesComponent } from './demo/Procurement/Predict/time-series/time-series.component';
import { RecommendationsComponent } from './demo/Procurement/recommendations/recommendations.component';
import { HoursComponent } from './demo/Distribution/hours/hours.component';
import { DefectComponent } from './demo/Distribution/defect/defect.component';
import {RisqueComponent} from './demo/Warehouse/risque/risque.component';
import {FinalStockComponent} from './demo/Warehouse/final-stock/final-stock.component';
import {PerformanceComponent} from './demo/Production/performance/performance.component';
import { DelayComponent } from './demo/Production/delay/delay.component';
import { ChatbotComponent } from './demo/chatbot/chatbot.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/signin',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./demo/dashboard/dashboard.component'),
      },
      {path :'add-user',
       component: AddUpdateUserComponent},

       {path :'update-user/:id',
      component: AddUpdateUserComponent},
      {path :'list-users',
        component: ListUsersComponent
      },
      {path :'change-password',
        component: ChangePasswordComponent

      },
      {path: 'procurement/dashboard',
        component: ProcurementdashboardComponent,
      },
      {path: 'warehouse/dashboard',
        component: WarhousedashboardComponent,
      },
      {path: 'production/dashboard',
        component: ProductionDashboardComponent,

      },
      {path: 'distribution/dashboard',
        component: DistributionDashboardComponent,

      },
      {
        path:'procurement/delaydays',
        component: DelayDaysComponent,
      },
      {path:'procurement/probdelay',
        component: ProbDelayComponent,

      },
      {path: 'procurement/timeseries',
        component: TimeSeriesComponent,
      },
      {path: 'procurement/recommendations',
        component: RecommendationsComponent,
      },
      {path :'distribution/hours',
        component: HoursComponent,
      },
     {path :'distribution/defect',
        component: DefectComponent,
      },
     {path :'warehouse/risque',
        component: RisqueComponent,

     },
     {path :'warehouse/finalstock',
        component: FinalStockComponent,
     },
     {path :'production/performance',
        component: PerformanceComponent,
     },
      {path :'production/delay',
        component: DelayComponent,

      },
      
      {path: 'chatbot',
        component: ChatbotComponent,},
     
      {
        path: 'basic',
        loadChildren: () =>
          import('./demo/ui-elements/ui-basic/ui-basic.module').then(
            (m) => m.UiBasicModule,
          ),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./demo/pages/form-elements/form-elements.module').then(
            (m) => m.FormElementsModule,
          ),
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./demo/pages/tables/tables.module').then(
            (m) => m.TablesModule,
          ),
      },
      {
        path: 'apexchart',
        loadComponent: () =>
          import('./demo/chart/apex-chart/apex-chart.component'),
      },
      {
        path: 'sample-page',
        loadComponent: () =>
          import('./demo/extra/sample-page/sample-page.component'),
      },
    ],
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./demo/pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule,
          ),
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
