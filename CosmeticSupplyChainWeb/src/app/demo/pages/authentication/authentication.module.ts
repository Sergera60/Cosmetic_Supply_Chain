import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';


@NgModule({
  
  imports: [CommonModule, AuthenticationRoutingModule],
})
export class AuthenticationModule {}
