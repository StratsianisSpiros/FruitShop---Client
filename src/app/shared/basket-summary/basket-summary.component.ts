
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IbasketItem } from '../models/basket';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})

export class BasketSummaryComponent implements OnInit {
  @Output() increment: EventEmitter<IbasketItem> = new EventEmitter<IbasketItem>();
  @Output() decrement: EventEmitter<IbasketItem> = new EventEmitter<IbasketItem>();
  @Output() remove: EventEmitter<IbasketItem> = new EventEmitter<IbasketItem>();
  @Input() isBasket: true;
  basket$: Observable<IBasket>;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }
  
  decrementBasketItem(item: IbasketItem) {
    this.decrement.emit(item);
  }

  incrementBasketItem(item: IbasketItem) {
    this.increment.emit(item);
  }

  removeBasketItem(item: IbasketItem) {
    this.remove.emit(item);
  }
}
