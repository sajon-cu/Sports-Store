import { Injectable } from "@angular/core";
import { Product } from "./product";
import { StaticDataSource } from "./static.datasource";

@Injectable()
export class ProductRepository {
    private products: Product[]     = [];
    private categories: string[]    = [];

    constructor(private dataSource: StaticDataSource) {
        dataSource.getProduct().subscribe(data => {
            this.products = data;
            this.categories = data.map(p => p.category)
                                .filter((c, index, array) => array.indexOf(c) == index).sort();
        });
    }

    getProducts(category: string = null): Product[] {
        return this.products.filter(product => category == null || category == product.category)
    }

    getProduct(id: number): Product {
        return this.products.find(product => product.id == id)
    }

    getCategories(): string[] {
        return this.categories
    }
}