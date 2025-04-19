import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';

//import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withNoXsrfProtection, withXsrfConfiguration } from '@angular/common/http';
import { LoanApplicationComponent } from './loan-application/loan-application.component';
import { CustomersComponent } from './customers/customers.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';


const routes: Routes = [
  {
    path: 'customers',
          //canActivate: [CognitoService],
    component: CustomersComponent,
  },
  {
    path: 'loan-application',
    //canActivate: [CognitoService],
    component: LoanApplicationComponent,
  },
  {
    path: 'file-uploader',
    //canActivate: [CognitoService],
    component: FileUploaderComponent,
  },
  
  { path: '', redirectTo: '/loan-application', pathMatch: 'full' }, // Redirects empty path to /home
];


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(
    withInterceptors([]),
    withXsrfConfiguration({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    })
  )]
};
