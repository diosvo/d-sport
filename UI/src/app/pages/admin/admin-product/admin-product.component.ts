import { Component, OnInit } from '@angular/core';
import { CategoryModelServer } from 'src/app/models/category.model';
import { ClassifyModelServer } from 'src/app/models/classify.model';
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

  productId = 0;

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
    else {
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
    $('#myModal').modal("show");
  }


  createProduct() {
    this.productService.createProduct(this.product).subscribe(result=>{
        var res:any = result;
        if(res.success){
          this.isEdit = true;
          alert(res.message);
          $('#Modal').modal("hide");
          location.reload();
        }
      }, error => console.error(error));
  }

  updateProduct() {
    this.productService.updateProduct(this.product).subscribe(result => {
      var res: any = result;
      if (res.success) {
        this.isEdit = true;
        alert(res.message);
        $('#myModal').modal("hide");
        location.reload();
      }
    }, error => console.error(error))
  }

  deleteProduct() {
    this.productService.deleteProduct(this.productId).subscribe(result => {
      var res: any = result;
      if (res.success) {
        alert(res.message);
        $('#deleteModal').modal("hide");
        location.reload();
      }
    })
  }

  deleteModal(id) {
    $('#deleteModal').modal("show");
    this.productId = id;
  }

}