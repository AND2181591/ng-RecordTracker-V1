import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Orders } from '../models/Orders';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  @Input() orders: Orders[];
  @Output() removeOrder = new EventEmitter<Orders>();
  

  constructor() { }

  ngOnInit(): void {
  }

  onClose(order: Orders) {
    this.removeOrder.emit(order);
  }

}
