import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brands';
import { IProduct } from '../shared/models/product';
import { IProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})

export class ShopComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IProductType[];
  shopParams: ShopParams;
  totalCount: number;

  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ]

  constructor(private shopservice: ShopService) { 
    this.shopParams = this.shopservice.getShopParams();
  }

  ngOnInit() {
    this.getProducts(true);
    this.getBrands();
    this.getProductTypes();
  }

  getProducts(useCache = false) {
    this.shopservice.getProducts(useCache).subscribe(response => {
      this.products = response.data;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    })
  }

  getBrands() {
    this.shopservice.getBrands().subscribe(response => {
      this.brands = [{id:0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    })
  }

  getProductTypes() {
    this.shopservice.getProductTypes().subscribe(response => {
      this.types = [{id:0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    })
  }

  onBrandSelected(brandId: number) {
    const params = this.shopservice.getShopParams();
    params.brandIdSelected = brandId;
    params.pageNumber = 1;
    this.shopservice.setShopParams(params);
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    const params = this.shopservice.getShopParams();
    params.typeIdSelected = typeId;
    params.pageNumber = 1;
    this.shopservice.setShopParams(params);
    this.getProducts();
  }

  onSort(sort: string) {
    const params = this.shopservice.getShopParams();
    params.sortProduct = sort;
    this.shopservice.setShopParams(params);
    this.getProducts();
  }

  onPageChanged(event: any) {
    const params = this.shopservice.getShopParams();
    if (params.pageNumber !== event){
      params.pageNumber = event;
      this.shopservice.setShopParams(params);
      this.getProducts(true);
    }
  }

  onSearch() {
    const params = this.shopservice.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    this.shopservice.setShopParams(params);
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopservice.setShopParams(this.shopParams);
    this.getProducts();
  }
}
