import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-loan-application',
  templateUrl: './loan-application.component.html',
  styleUrls: ['./loan-application.component.css'],
  imports: [ReactiveFormsModule, RouterLink],
  standalone: true
})


export class LoanApplicationComponent {
  loanForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loanForm = this.fb.group({
      loanAmount: ['', Validators.required],
      loanTerm: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      phone: ['', Validators.required],
      income: ['', Validators.required]
    });
  }
 
  onSubmit() {
    if (this.loanForm.valid) {
      console.log(this.loanForm.value);
    }
      //console.log(this.loanForm.value);
    this.router.navigateByUrl('/customers');
  }
}
