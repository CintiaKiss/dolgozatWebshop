import { Component, ViewChild } from '@angular/core';
import { Product } from './entity/product';
import { HttpService } from './service/http.service';
import { ConfigService } from './service/config.service';
import { ItemproductComponent } from './component/itemproduct/itemproduct.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild(ItemproductComponent) itemproductComponent!: ItemproductComponent;

  switchLanguageParent(lang: string): void {
    this.itemproductComponent.switchLanguage(lang);
  }
  constructor(
      private db: HttpService,
      private config: ConfigService,
    ) {
      //this.loadTitles();
    }

  ngOnInit(): void {
    this.loadProducts();
    }

  title = 'dolgozatWebshop';
    products: Product[] = [];
    newProduct: Product = {
      category: '',
      description: '',
      id: 0,
      name: '',
      price: 0
    };

    loadProducts(): void {
      this.db.getProducts().subscribe(
        data => {
          this.products = Object.keys(data).map(key => ({
            id: data[key].id,
            name: data[key].name,
            price: data[key].price,
            description: data[key].description,
            category: data[key].category
          }));
          console.log('Adatok lekérve', data);
        },
        error => {
          console.error('Hiba történt az adatok lekérésekor', error);
        }
      );
    }

    createProduct(): void {
      if (this.newProduct.name && this.newProduct.price > 0) {
        this.db.addProduct(this.newProduct).subscribe(
          data => {
            console.log('Termék hozzáadva', data);
            this.loadProducts();
          },
          error => {
            console.error('Hiba történt a termék hozzáadása közben', error);
          }
        );
      } else {
        console.log('Kérlek, töltsd ki az összes mezőt.');
      }
    }
}
