import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent } from './product-list.component';
import { ConvertToSpacesPipe } from '../shared/convertToSpaces';
import { StarComponent } from '../shared/star.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductListComponent,
    ConvertToSpacesPipe,
  ],
  imports: [
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent
      },
    ]),SharedModule
  ]
})
export class ProductModule { }
