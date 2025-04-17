import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../common/customer';
import { CustomerService } from '../services/customer-service.service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { take } from 'rxjs';



@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  

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
    .subscribe((res) => this.customers = res)
     
  }


}
