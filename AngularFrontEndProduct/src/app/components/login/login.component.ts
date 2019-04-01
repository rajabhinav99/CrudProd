import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import {User} from '../../model/user'
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  product:Product[];
  user:User[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productservice:ProductService
  ) { }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    let email = this.loginForm.controls.email.value;
    let password=this.loginForm.controls.password.value;

    let isMatch:boolean=false;

    for (let u of this.user) {
      if(email==u.email && password==u.password){
        isMatch=true;
        sessionStorage.setItem("sessionID","6a8vXNmPGYn2vgTHlLKwAgdt2");
        this.router.navigate(['productlist']);
      }
    }
    if(!isMatch) {
      this.invalidLogin = true;
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.productservice.getUser()
      .subscribe(data => {
        this.user = data;
      });
  }

}

