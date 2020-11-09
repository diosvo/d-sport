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
    title: '',
    image: '',
    image_1: '',
    image_2: '',
    image_3: '',
    description: '',
    price: 0,
    quantity: 0,
    another_CatName: '',
    categoryName: '',
    category_id: '',
    classify_id: '',
    classify_name: '',
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
  message = '';

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
      this.showWarning("You're in the first page");
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
      this.showWarning("You're in the last page");
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
    if(this.validateData()){
      this.productService.createProduct(this.product).subscribe(result => {
        var res: any = result;
        if (res.success) {
          this.isEdit = true;
          $('#myModal').modal("hide");
          this.showMessage(res.message);
        }
      }, error => console.error(error));
    }
    else{
      this.showWarning("Please enter all of the required input");
    }
  }

  updateProduct() {
    if(this.validateData()){
      this.productService.updateProduct(this.product).subscribe(result => {
        var res: any = result;
        if (res.success) {
          this.isEdit = true;
          $('#myModal').modal("hide");
          this.showMessage(res.message);
        }
      }, error => console.error(error))
    }
    else{
      this.showWarning("Please enter all of the required input");
    }
    
  }

  deleteProduct() {
    this.productService.deleteProduct(this.productId).subscribe(result => {
      var res: any = result;
      if (res.success) {
        $('#deleteModal').modal("hide");
        this.showMessage(res.message);
      }
    })
  }

  deleteModal(id) {
    $('#deleteModal').modal("show");
    this.productId = id;
  }

  showMessage(message) {
    this.message = message;
    $("#successModal").modal("show");
    setTimeout(function () { $("#successModal").modal("hide"); }, 1500);
    setTimeout(function () { location.reload(); }, 1500);
  }

  showWarning(message) {
    this.message = message;
    $("#warningModal").modal("show");
    setTimeout(function () { $("#warningModal").modal("hide"); }, 1500);
  }

  validateData() {
    if (this.product.title == '' ||
      this.product.image == '' ||
      this.product.description == '' ||
      this.product.category_id == '' ||
      this.product.classify_id == '') {
      return false;
    }
    else {
      return true;
    }
  }
}