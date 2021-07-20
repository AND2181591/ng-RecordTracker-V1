import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { SearchService } from '../search.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { Artist } from 'src/app/shared/models/Artist';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  results: Artist[] = [];
  searchSubscription: Subscription;

  @Output() multipleResults = new EventEmitter<Artist[]>();
    

  searchForm: FormGroup = new FormGroup({
    query: new FormControl('')
  })


  constructor(
    private searchService: SearchService, 
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.searchSubscription = this.searchForm.get('query').valueChanges
    .pipe(
      debounceTime(100), 
      distinctUntilChanged()
    )
    .subscribe(query => this.searchService.getAuth()
      .subscribe(({ access_token }) => this.searchService.searchMusic(query, 'artist', access_token)
        .subscribe((results: any) => {
          if (Object.keys(results).length === 0) { // Handles the empty observable
            return;
          }
          this.results = results.artists.items.slice(0, 5); // Otherwise, assigns the artists results to the array
        })
      )
    );
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  open(result: Artist) {
    const modalRef = this.modalService.open(ModalComponent, 
      {
        centered: true
      }
    );
    modalRef.componentInstance.artist = result;
    this.searchForm.reset();
  }

  onSubmit() {
    this.multipleResults.emit(this.results);
    this.searchForm.reset();
  }
}
