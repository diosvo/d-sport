import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  product: any = {
    data: []
  };

  constructor(private productService: ProductService, ) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(prods =>{
      console.log(prods);
      console.log('hiii')
    }, error => console.error(error))
  }
}
