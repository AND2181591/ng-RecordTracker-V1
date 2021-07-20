import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Subscription } from 'rxjs';

import { OrdersService } from 'src/app/orders.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { Artist } from 'src/app/shared/models/Artist';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  multipleResults: Artist[]
  closeResult: string;
  message: string;
  type: string;

  albumAddedSubscription: Subscription;

  constructor(
    private modalService: NgbModal, 
    private orderService: OrdersService
  ) {}

  ngOnInit(): void {
    this.albumAddedSubscription = this.orderService.albumAdded$
      .subscribe((added) => {
        if (added) {
          this.message = 'Album added!';
          this.type = 'success';
        } else {
          this.message = 'There was a problem adding your selection.';
          this.type = 'danger';
        }
      })
  }

  ngOnDestroy() {
    this.albumAddedSubscription.unsubscribe();
  }

  receivedResults(event: Artist[]) {
    this.multipleResults = event;
  }

  open(result: Artist) {
    const modalRef = this.modalService.open(ModalComponent, 
      {
        centered: true
      }
    );
    modalRef.componentInstance.artist = result;
  }
  
}
