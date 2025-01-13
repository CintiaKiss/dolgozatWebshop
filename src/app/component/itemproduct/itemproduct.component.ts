import { Component, Input, input, OnInit } from '@angular/core';
import { Product } from '../../entity/product';
import { ConfigService } from '../../service/config.service';
import { HttpService } from '../../service/http.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-itemproduct',
  templateUrl: './itemproduct.component.html',
  styleUrl: './itemproduct.component.css'
})

export class ItemproductComponent implements OnInit {
setEditProduct() {
  this.editProduct = !this.editProduct;
}
  @Input() product!: Product;
  //product!: Product; //| null = null;
  editProduct: boolean = false;
  titles: any = {};

  modifiedProduct: Product = {
    category: '',
    description: '',
    id: 0,
    name: '',
    price: 0
  };

  constructor(
    private db: HttpService,
    private config: ConfigService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit(): void {
    //this.loadProducts();
      
    }
  

  createProduct(): void {
    if (this.product.name && this.product.price > 0) {
      this.db.addProduct(this.product).subscribe(
        data => {
          console.log('Termék hozzáadva', data);
          //this.loadProducts();
        },
        error => {
          console.error('Hiba történt a termék hozzáadása közben', error);
        }
      );
    } else {
      console.log('Kérlek, töltsd ki az összes mezőt.');
    }
  }

  modifyProduct(): void{
    this.db.updateProduct(this.modifiedProduct.id, this.modifiedProduct).subscribe(
      data => {
        console.log('Termék frissítve', data);
        //this.loadProducts();
      },
      error => {
        console.error('Hiba történt a termék frissítésekor', error);
      }
    );
  }

  deleteProduct(): void{
    this.db.deleteProduct(this.product.id).subscribe(
      data => {
        console.log('Termék törölve', data);
        //this.loadProducts();
      },
      error => {
        console.error('Hiba történt a termék törlésekor', error);
      }
    );
  }
  
  resetNewProduct(): void {
    this.modifiedProduct = { id: this.product.id, name: '', category: '', description: '', price: 0 };
  }
}