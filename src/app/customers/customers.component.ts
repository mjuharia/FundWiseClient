import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../common/customer';
import { CustomerService } from '../services/customer-service.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { take } from 'rxjs';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);



@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, AgGridAngular],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  


  columnDefs = [
    { headerName: 'Customer Name', field: 'name' as keyof Customer, sortable: true, filter: true },
    { headerName: 'Tax ID', field: 'taxID' as keyof Customer, sortable: true, filter: true },
    { headerName: 'Address', field: 'address' as keyof Customer, sortable: true, filter: true },
    { headerName: 'City', field: 'city' as keyof Customer, sortable: true, filter: true },
    { headerName: 'State', field: 'state' as keyof Customer, sortable: true, filter: true },
    { headerName: 'Country ID', field: 'country_id' as keyof Customer, sortable: true, filter: true },
    { headerName: 'Postal Code', field: 'postalCcode' as keyof Customer, sortable: true, filter: true },
    { headerName: 'Created By', field: 'createdBy' as keyof Customer, sortable: true, filter: true },
    { headerName: 'Created On', field: 'createdOn' as keyof Customer, sortable: true, filter: true },
    { headerName: 'Modified By', field: 'modifiedBy' as keyof Customer, sortable: true, filter: true },
    { headerName: 'Modified On', field: 'modifiedOn' as keyof Customer, sortable: true, filter: true },
  ];

  customers: Customer[] = [];
 

  constructor(private customerService: CustomerService) {
    window.console.log('FROM constructor()');
    console.log(
      `Constructor called... `
    );
  }

  ngOnInit(): void {

    window.console.log('FROM ngOnInit()');

    console.log(
      `OnInit called... `
    );
    this.customerService.getCustomerList()
    .pipe(take(1)) // notice take(1) to unsubscribe observable  
    .subscribe((res) => this.customers = res);
     
  }


}
