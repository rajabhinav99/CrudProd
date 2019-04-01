import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { User } from '../../model/user'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  submitted: boolean = false;

  user: User[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productservice: ProductService
  ) { }

  onSubmit() {

    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.productservice.setUser(this.registerForm.value)
      .subscribe(data => {
        this.router.navigate(['login']);
      });
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      id: [],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}

