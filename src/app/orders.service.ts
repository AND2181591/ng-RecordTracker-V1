import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, from, Subject } from 'rxjs';

import { AlbumInput } from './shared/models/AlbumInput';
import { Orders } from './shared/models/Orders';



@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private onTheirWayCollection: AngularFirestoreCollection<Orders>;
  private preOrdersCollection: AngularFirestoreCollection<Orders>;
  onTheirWay$: Observable<Orders[]>;
  preOrders$: Observable<Orders[]>;

  albumAdded$ = new Subject<boolean>();


  constructor(private afs: AngularFirestore) { 
    this.onTheirWayCollection = afs.collection<Orders>('onTheirWay');
    this.preOrdersCollection = afs.collection<Orders>('preOrders');
    this.onTheirWay$ = this.onTheirWayCollection.valueChanges({ idField: 'afId' });
    this.preOrders$ = this.preOrdersCollection.valueChanges({ idField: 'afId' });
  }


  addToOrders(albumRes: any, formInput: AlbumInput) {
    if (formInput.orderType === 'onTheirWay') {
      const newOrder = {
        id: albumRes.id.toString(), 
        artistName: albumRes.artists[0].name, 
        album: formInput.album, 
        image: albumRes.images[0].url, 
        orderType: formInput.orderType, 
        trackingNum: formInput.trackingNum
      };

      return from(this.onTheirWayCollection.add(newOrder))
        .subscribe({
          next: (() => {
            this.albumAdded$.next(true);
          }), 
          error: (() => {
            this.albumAdded$.next(false);
          })
        });
    } else {
      const newOrder = {
        id: albumRes.id.toString(), 
        artistName: albumRes.artists[0].name, 
        album: formInput.album, 
        image: albumRes.images[0].url, 
        orderType: formInput.orderType, 
        date: formInput.date
      }; 

      return from(this.preOrdersCollection.add(newOrder))
        .subscribe({
          next: (() => {
            this.albumAdded$.next(true);
          }), 
          error: (() => {
            this.albumAdded$.next(false);
          })
        });
    }
  }


  deleteOrder(order: Orders) {
    if (order.orderType === 'onTheirWay') {
      const orderRef = this.afs.doc('onTheirWay/' + order.afId);
      orderRef.delete();
    } else {
      const orderRef = this.afs.doc('preOrders/' + order.afId);
      orderRef.delete();
    }
  }

  
}
