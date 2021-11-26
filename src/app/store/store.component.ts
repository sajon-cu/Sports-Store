import { Component } from "@angular/core";
import { Cart } from "../model/cart.model";
import { Product } from "../model/product";
import { ProductRepository } from "../model/product.repository";

@Component({
    selector: "store",
    templateUrl: "store.component.html" 
})
export class StoreComponent {
    selectedCategory: string = null;
    public productsPerPage = 10
    public selectedPage = 1

    constructor(private repository: ProductRepository, private cart: Cart) {}

    get products(): Product[] {
        let pageIndex = (this.selectedPage - 1) * this.productsPerPage;

        return this.repository.getProducts(this.selectedCategory)
                            .slice(pageIndex, pageIndex + this.productsPerPage);
    }

    get categories(): string[] {
        return this.repository.getCategories();
    }

    changeCategory(newCategory: string) {
        this.selectedCategory = newCategory;
    }

    changePageSize(newSize:number) {
        this.productsPerPage = Number(newSize);
        this.changePage(1);
    }

    changePage(newPage: number) {
        this.selectedPage = newPage;
    }

    get pageNumbers():number[] {
        return Array(
            Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.productsPerPage)
        ).fill(0).map((x, i) => i + 1);
    }

    addProductToCart(product: Product) {
        this.cart.addLine(product);
    }
}