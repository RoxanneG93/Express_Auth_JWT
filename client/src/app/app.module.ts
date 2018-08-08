import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
// Import needed for Routing
import { RouterModule, Routes } from '@angular/router';
// Import needed for input forms
import { FormsModule } from "@angular/forms";
// Import needed for HTTP requests
import { HttpModule } from '@angular/http';
// ALL component imports below
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

// Importing SERVICES HERE
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
// Importing Flashmessages dependacny HERE
import { FlashMessagesModule } from 'angular2-flash-messages';

// ROUTING paths HERE
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'profile', component: ProfileComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // for Routing
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    HttpModule,
    FlashMessagesModule.forRoot()
  ],
  // input SERVICES in the providers array
  providers: [
    ValidateService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
