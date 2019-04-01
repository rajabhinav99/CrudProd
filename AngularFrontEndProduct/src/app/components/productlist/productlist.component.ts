import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';
import { Product } from '../../model/product';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})

export class ProductlistComponent implements OnInit {
  product: Product[];
  addForm: FormGroup;
  editForm: FormGroup;

  toggle = true;
  constructor(private productservice: ProductService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productservice.getProduct().subscribe(data => {
      this.product = data;

      this.doCheck();
    });



    this.addForm = this.formBuilder.group({
      _id: [],
      prdname: ['', Validators.required],
      prdqty: ['', Validators.required],
      prdbought: [false, Validators.required]
    });

    this.editForm = this.formBuilder.group({
      _id: [],
      prdname: ['', Validators.required],
      prdqty: ['', Validators.required],
      prdbought: [false, Validators.required],
      __v: ['']
    });

  }

  submitted: boolean = false;
  onAdd() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    this.productservice.addProduct(this.addForm.value).subscribe(data => {
      alert('Record added!');
    });
    location.reload();
  }

  onclickedit(product) {
    this.submitted = true;
    // if (this.editForm.invalid) {
    //   return;
    // }
    this.toggle = false;
    // this.productservice.editProduct(this.editForm.value).subscribe(data => {
    //   alert('Record Updated!');
    // });

    this.editForm.setValue(product);

  }

  doCheck() {
    let isAuth = sessionStorage.getItem("sessionID");
    if (isAuth == undefined)
      this.router.navigate(['login']);
  }

  delete(prdname): void {
    this.productservice.deleteProduct(prdname)
      .subscribe(data => {
        this.product = this.product.filter(u => u !== prdname);
        this.router.navigate(['productlist'])
      })
      location.reload();
  };


  onLogout() {
    sessionStorage.removeItem("sessionID");
    this.router.navigate(['login']);
  }

  onCancel() {
    this.toggle = true;
  }

  onEdit(){
    this.productservice.editProduct(this.editForm.value).subscribe(data => {
      
    });
    alert('Record Updated!');
    location.reload();
  }
}
