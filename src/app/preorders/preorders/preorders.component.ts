import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { OrdersService } from 'src/app/orders.service';
import { Orders } from 'src/app/shared/models/Orders';

@Component({
  selector: 'app-preorders',
  templateUrl: './preorders.component.html',
  styleUrls: ['./preorders.component.css']
})
export class PreordersComponent implements OnInit, OnDestroy {
  orders: Orders[] = [];
  preOrderSubscription: Subscription;

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    this.preOrderSubscription = this.orderService.preOrders$
      .pipe(
        map((results: Orders[]) => {
          results.sort((a, b) => {
            const c = +new Date(a.date.year, a.date.month, a.date.day);
            const d = +new Date(b.date.year, b.date.month, b.date.day);
            return c - d;
          })

          const today = new Date();
          for (let i = 0; i < results.length; i++) {
            const orderDate = new Date(
              results[i].date.year, 
              results[i].date.month - 1,
              results[i].date.day,
            );
            if (orderDate <= today) {
              results[i].late = true;
            }
          }
          return results;
        })
      )
      .subscribe((results: Orders[]) => {
        this.orders = results;
        console.log(results);
      });
  }

  ngOnDestroy() {
    this.preOrderSubscription.unsubscribe();
  }

  onRemoveOrder(order: Orders) {
    this.orderService.deleteOrder(order);
  }

}
