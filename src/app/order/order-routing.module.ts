import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderComponent } from './order.component';

const routes: Routes = [
  { path: '', component: OrderComponent, data: { breadcrumb : 'Order Summary'}},
  { path: ':id', component: OrderDetailsComponent, data: { breadcrumb : { alias: 'orderDetailed'}}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
