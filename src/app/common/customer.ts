export class Customer {
    constructor(
      public cust_Id: number,
      public name: string,
      public taxID: string,
      public address: string,
      public city: String,
  
      public state: String,
      public country_id: number,
      public postalCcode: string,
      public createdBy: string,
  
      public createdOn: Date,
      public cust_Invoice_Method: string, // fax, email, etc.
      public modifiedOn: Date,
      public modifiedBy: string
    ) {}
  }
  