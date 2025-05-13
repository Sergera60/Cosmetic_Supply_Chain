import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './theme/shared/shared.module';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { HttpClientModule } from '@angular/common/http';

import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavLogoComponent } from './theme/layout/admin/navigation/nav-logo/nav-logo.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavSearchComponent } from './theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { ToggleFullScreenDirective } from './theme/shared/components/full-screen/toggle-full-screen';
import { AddUpdateUserComponent } from './demo/Users/add-update-user/add-update-user.component';
import { ListUsersComponent } from './demo/Users/list-users/list-users.component';
import { ChangePasswordComponent } from './demo/Users/change-password/change-password.component';
import { PowerBIEmbedModule } from 'powerbi-client-angular';
import { WarhousedashboardComponent } from './demo/Warehouse/warhousedashboard/warhousedashboard.component';
import { ProductionDashboardComponent } from './demo/Production/production-dashboard/production-dashboard.component';
import { DistributionDashboardComponent } from './demo/Distribution/distribution-dashboard/distribution-dashboard.component';
import { ProbDelayComponent } from './demo/Procurement/Predict/prob-delay/prob-delay.component';
import { DelayDaysComponent } from './demo/Procurement/Predict/delay-days/delay-days.component';
import { TimeSeriesComponent } from './demo/Procurement/Predict/time-series/time-series.component';
import { RecommendationsComponent } from './demo/Procurement/recommendations/recommendations.component';
import { HoursComponent } from './demo/Distribution/hours/hours.component';
import { DefectComponent } from './demo/Distribution/defect/defect.component';
import { RisqueComponent } from './demo/Warehouse/risque/risque.component';
import { FinalStockComponent } from './demo/Warehouse/final-stock/final-stock.component';
import { PerformanceComponent } from './demo/Production/performance/performance.component';
import { DelayComponent } from './demo/Production/delay/delay.component';



@NgModule({
  declarations: [
    AppComponent,
    GuestComponent,
    AdminComponent,
    NavBarComponent,
    NavigationComponent,
    NavLeftComponent,
    NavRightComponent,
    NavContentComponent,
    NavLogoComponent,
    NavCollapseComponent,
    NavGroupComponent,
    NavItemComponent,
    NavSearchComponent,
    ToggleFullScreenDirective,
    AddUpdateUserComponent,
    ListUsersComponent,
    ChangePasswordComponent,
    WarhousedashboardComponent,
    ProductionDashboardComponent,
    DistributionDashboardComponent,
    ProbDelayComponent,
    DelayDaysComponent,
    TimeSeriesComponent,
    RecommendationsComponent,
    HoursComponent,
    DefectComponent,
    RisqueComponent,
    FinalStockComponent,
    PerformanceComponent,
    DelayComponent,
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PowerBIEmbedModule
  ],
  providers: [NavigationItem],
  bootstrap: [AppComponent],

})
export class AppModule {}
