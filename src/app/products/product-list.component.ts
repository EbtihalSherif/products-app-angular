import { Component, OnDestroy, OnInit } from '@angular/core';
import { ignoreElements, Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';


@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit ,OnDestroy{
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  filteredProducts: IProduct[] = [];
  private _listFilter: string = '';
  errorMessage: string = 'error occured';
  sub :Subscription|undefined;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    console.log(value);
    this._listFilter = value;
    this.filteredProducts = this.performFilter(this.listFilter);
  }

  products: IProduct[] = [];

  constructor(private productService: ProductService) {

  }
  ngOnDestroy(): void {
this.sub?.unsubscribe()  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {

    console.log("on init")

  this.sub=  this.productService.getProducts()
      .subscribe({
        next: products => {
          this.products = products;
          this.filteredProducts = this.products;
        },
        error: error => this.errorMessage = <any>error
      });


    this.filteredProducts = this.products;

  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLowerCase().includes(filterBy));
  }

}
