import { v4 as uuid} from 'uuid';

export interface IbasketItem {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export interface IBasket {
    id: string;
    items: IbasketItem[];
    clientSecret?: string;
    paymentIntentId?: string;
    deliveryMethodId?: number;
    shippingPrice?: number;
}

export class Basket implements IBasket {
    id = uuid();
    items: IbasketItem[] = [];
    
}

export interface IBasketTotals {
    shipping: number;
    subTotal: number;
    total: number;
}
