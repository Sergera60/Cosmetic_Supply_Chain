import { Component, NgZone ,OnInit  } from '@angular/core';
import { DattaConfig } from 'src/app/app-config';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/User/user.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
}) 
export class AdminComponent implements OnInit {
  navCollapsed: any;
  navCollapsedMob: boolean;
  windowWidth: number;

  constructor(
    private zone: NgZone,
    private location: Location,
    private router: Router,
    private Userservice: UserService
  ) {
    let current_url = this.location.path();
    if (this.location['_baseHref']) {
      current_url = this.location['_baseHref'] + this.location.path();
    }

    if (
      current_url === this.location['_baseHref'] + '/layout/collapse-menu' ||
      current_url === this.location['_baseHref'] + '/layout/box'
    ) {
      DattaConfig.isCollapseMenu = true;
    }

    this.windowWidth = window.innerWidth;
    this.navCollapsed =
      this.windowWidth >= 992 ? DattaConfig.isCollapseMenu : false;
    this.navCollapsedMob = false;
  }

  ngOnInit(): void {
    this.Userservice.VerifyToken(localStorage.getItem('token')).subscribe(
      (response) => {
      
      },
      (error) => {
        this.router.navigate(['/auth/signin']);;
      }
    );
  }

  navMobClick() {
    if (
      this.navCollapsedMob &&
      !document
        .querySelector('app-navigation.pcoded-navbar')
        .classList.contains('mob-open')
    ) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
  }
}
