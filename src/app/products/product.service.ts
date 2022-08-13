import { Injectable } from "@angular/core"
import { IProduct } from "./product";
import { Observable ,catchError,tap, throwError, map,} from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";




@Injectable({
  providedIn: "root"
})
export class ProductService{

  private productsUrl = '../../assets/products/products.json';

  constructor(private http: HttpClient) { }

  //exeptiopn error handling
  getProducts():Observable<IProduct[]>{
     return this.http.get<IProduct[]>(this.productsUrl).pipe(
      tap(data=>console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
     );
     ;
   }

  getProduct(id: number): Observable<IProduct | undefined> {
    return this.getProducts()
      .pipe(
        map((products: IProduct[]) => products.find(p => p.productId === id))
      );
  }


  private handleError(err: HttpErrorResponse) {
    // inareal world app,we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      //Aclient-side or network error occurred.Handle it accordingly.
      errorMessage = `An error occurred:${ err.error.message } `;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code:${err.status},error message is:${err.message}`;
      console.error(errorMessage);
    }
    return throwError(() => errorMessage);
  }
}
