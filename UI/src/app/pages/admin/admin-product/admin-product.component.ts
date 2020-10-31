import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CategoryModelServer } from 'src/app/models/category.model';
import { ClassifyModelServer } from 'src/app/models/classify.model';
import { ProductModelServer, ServerResponse } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

declare var $: any;

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  categories: CategoryModelServer[] = [];

  classify: ClassifyModelServer[] = [];

  product: any = {
    title: "",
    image: "",
    image_1: "",
    image_2: "",
    image_3: "",
    description: "",
    price: 0,
    quantity: 0,
    another_CatName: "",
    categoryName: "",
    category_id: "",
    classify_id: "",
    classify_name: "",
  };
  products: any = {
    page: 1,
    size: 5,
    totalPage: 0,
    count: 0,
    products: []
  };
  isEdit: boolean = true;
  kw = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    //display product
    this.searchProduct(1);
    this.getCategoryList();
    this.getClassifyList();

  };

  searchProduct(cPage) {
    let page = cPage;
    let size = 5;
    let keyword = this.kw;

    this.productService.getAllProduct(page, size, keyword).subscribe((prod: any) => {
      this.products = prod
      console.log(this.products);
    });
  }
  
  searchPrevious() {
    if (this.products.page > 1) {
      let nextPage = this.products.page - 1;
      
      let page = nextPage;
      let size = 5;
      let keyword = this.kw;

      this.productService.getAllProduct(page, size, keyword).subscribe((prod: any) => {
        this.products = prod
      });
    } else {
      alert("You're in the first page");
    }
  }

  searchNext() {
    if (this.products.page < this.products.totalPage) {
      let nextPage = this.products.page + 1;

      let page = nextPage;
      let size = 5;
      let keyword = this.kw;
      this.productService.getAllProduct(page, size, keyword).subscribe((prod: any) => {
        this.products = prod
      });
    }
    else{
      alert("You're in the last page");
    }
  }

  getCategoryList(): void {
    this.productService.getCategoryList().subscribe(cat => {
      this.categories = cat.categories
    })
  }

  getClassifyList(): void {
    this.productService.getClassifyList().subscribe(cla => {
      this.classify = cla.classify;
    })
  }

  openModal(isNew, index) {
    if (isNew) {
      this.isEdit = false;
      this.product = {
        title: "",
        image: "",
        image_1: "",
        image_2: "",
        image_3: "",
        description: "",
        price: 0,
        quantity: 0,
        another_CatName: "",
        categoryName: "",
        category_id: "",
        classify_id: "",
        classify_name: "",
      };
    }
    else {
      this.isEdit = true;
      this.product = index;
    }
  }

  // Thêm
  addProduct() {

  }

  // Cập nhật
  updateProduct() {

  }

  // Xóa
  deleteProduct() {

  }


  ///// Initalizing ADD PRODUCT properties



}




