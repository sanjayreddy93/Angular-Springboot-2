import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";


import { AppComponent } from './app.component';
import { BikesComponent } from "./components/bikes/bikes.component";
import { ViewRegistrationComponent } from './components/view-registration/view-registration.component';
import { NewRegistrationComponent } from './components/new-registration/new-registration.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    BikesComponent,
    ViewRegistrationComponent,
    NewRegistrationComponent,
    WelcomeComponent,
    
   
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'bikes/new', component:NewRegistrationComponent},
      {path:'bikes', component: BikesComponent},
      {path: 'bikes/:id', component: ViewRegistrationComponent},
      {path: 'welcome', component: WelcomeComponent},
      {path:'', redirectTo:'welcome', pathMatch: 'full'}])
      ],

  bootstrap: [AppComponent]
})
export class AppModule { }
