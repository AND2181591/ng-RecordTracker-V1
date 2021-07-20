import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal, NgbDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators'

import { Artist } from '../models/Artist';
import { AlbumResults } from '../models/AlbumResults';
import { OrdersService } from 'src/app/orders.service';
import { SearchService } from 'src/app/home/search.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'], 
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() artist: Artist;
  albums: AlbumResults[] = [];
  albumSelect: AlbumResults;
  albumSubscription: Subscription;

  model: NgbDateStruct;
  @ViewChild('dp') dp: NgbDatepicker;

  modalForm = new FormGroup({
    album: new FormControl('Select album...', Validators.required), 
    orderType: new FormControl('', Validators.required), 
    trackingNum: new FormControl(''), 
    date: new FormControl('')
  })

  constructor(
    public activeModal: NgbActiveModal, 
    private orderService: OrdersService, 
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    const { id } = this.artist;
    this.albumSubscription = this.searchService.getAuth()
        .subscribe(({access_token}) => this.searchService.getAlbums(id.toString(), access_token)
        .pipe(
          map((results) => {
            const filtered = [];
            for (let i = 0; i < results.items.length; i++) {
              if (results.items[i].available_markets.includes('US')) {
                filtered.push(results.items[i]);
              }
            }
            return filtered;
          })
        )
          .subscribe((results: AlbumResults[]) => {
            if (Object.keys(results).length === 0) { // Handles the empty observable
              return;
            }
            this.albums = results;
          })
        );
  }

  ngOnDestroy() {
    this.albumSubscription.unsubscribe();
  }
  

  onAlbumSelect(album: AlbumResults) {
    this.albumSelect = album;
  }

  onSubmit() {
    this.orderService.addToOrders(this.albumSelect, this.modalForm.value);
  }

}
