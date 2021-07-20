import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { OrdersService } from 'src/app/orders.service';
import { Orders } from 'src/app/shared/models/Orders';

@Component({
  selector: 'app-on-their-way',
  templateUrl: './on-their-way.component.html',
  styleUrls: ['./on-their-way.component.css']
})
export class OnTheirWayComponent implements OnInit, OnDestroy {
  orders: Orders[] = [];
  trackingUrl: string = 'https://tools.usps.com/go/TrackConfirmAction_input?strOrigTrackNum=';

  onTheirWaySubscription: Subscription;

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {    
    this.onTheirWaySubscription = this.orderService.onTheirWay$
      .pipe(
        map((results: Orders[]) => {
          for (let i = 0; i < results.length; i++) {
            results[i].trackingUrl = this.trackingUrl;
          }
          return results;
        })
      )
      .subscribe((results: Orders[]) => {
        console.log(results);
        this.orders = results;
      });

  }

  ngOnDestroy() {
    this.onTheirWaySubscription.unsubscribe();
  }

  onRemoveOrder(order: Orders) {
    this.orderService.deleteOrder(order);
  }

}
