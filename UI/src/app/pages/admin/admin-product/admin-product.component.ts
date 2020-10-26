import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductModelServer, ServerResponse} from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

declare var $: any;

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  products: ProductModelServer[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<ProductModelServer> = new Subject();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [
        [5, 10, 25, 50, -1],
        [5, 10, 25, 50, 'All'],
      ],
    };

    //display product
    this.productService.getAllProduct().subscribe((prod : ServerResponse) =>{
      this.products = prod.products
      this.dtTrigger.next()
    })
    
  };

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}




