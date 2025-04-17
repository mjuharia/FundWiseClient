import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Customer } from '../common/customer';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  
  private baseUrl = environment.serviceURL.baseURL + 'customers';

  customers: Customer[] = [];

  // inject httpClient to read restful methods
  constructor(private httpClient: HttpClient) {}

  // getCustomerList(
  //   thePageSize: number,
  //   thePage: number
  // ): Observable<GetResponse> {
  //   return this.httpClient.get<GetResponse>(
  //     `${this.baseUrl}`);
  //     console.log(
  //       `Previous customer profile name = ${this.baseUrl} `
  //     );
  // }

  getCustomerList() {
    console.log(
      `Customer Service URL = ${this.baseUrl} `
    );
    
    return this.httpClient.get<Customer[]>(`${this.baseUrl}`);
   
  }

  getCustomerListByProfId(custProfileId: number): Observable<Customer[]> {
    return this.httpClient
      .get<GetResponse>(this.baseUrl)
      .pipe(map((response) => response._embedded.customers));
  }

  getCustomerListByProfName(
    custProfile: string | null
  ): Observable<Customer[]> {
    var searchURL: string = `${this.baseUrl}`;

    if (custProfile != null && custProfile != '') {
      searchURL = `${this.baseUrl}/search/findByCustomerProfile?searchText=${custProfile}`;
    }
    return this.httpClient
      .get<GetResponse>(searchURL)
      .pipe(map((response) => response._embedded.customers));
  }

  getCustomerListByProfNamePg(
    thePageSize: number,
    thePage: number,
    custProfile: string | null
  ): Observable<GetResponse> {
    var searchURL: string = `${this.baseUrl}`;

    if (custProfile != null && custProfile != '') {
      searchURL =
        `${this.baseUrl}/search/findByCustomerProfile?searchText=${custProfile}` +
        `&page=${thePage}` +
        `&size=${thePageSize}`;
    }
    return this.httpClient.get<GetResponse>(searchURL);
  }

  searchCustomerListByCustName(
    thePageSize: number,
    thePage: number,
    custName: string | null
  ): Observable<GetResponse> {
    var searchURL: string =
      `${this.baseUrl}` + `?page=${thePage}` + `&size=${thePageSize}`;

    if (custName != null && custName != '') {
      searchURL =
        `${this.baseUrl}/search/findByCustnameContaining?custname=${custName}` +
        `&page=${thePage}` +
        `&size=${thePageSize}`;
    }
    return this.httpClient.get<GetResponse>(searchURL);
  }

  getCustomerDetailsById(custId: number): Observable<Customer> {
    const searchURL: string = `${this.baseUrl}/${custId}`;
    return this.httpClient.get<Customer>(searchURL);
  }
}

interface GetResponse {
  _embedded: {
    customers: Customer[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
