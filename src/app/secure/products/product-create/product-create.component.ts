import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductService} from '../../../services/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: '',
      description: '',
      image: '',
      price: ''
    });
  }

  submit(): void {
    this.productService.create(this.form.getRawValue())
      .subscribe(() => this.router.navigate(['/products']));
  }
}
