import { Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-search-input',
  imports: [
    FormsModule,
    MatIcon
  ],
  templateUrl: './search-input.html',
  styleUrl: './search-input.scss'
})
export class SearchInput implements OnInit {
  destroyRef = inject(DestroyRef);
  @Output() searchTask: EventEmitter<string> = new EventEmitter();
  @Input() pageTitle = '' ;
  searchValue = '';

  searchSubject = new Subject<string>();

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(value => {
        this.searchTask.emit(value);
    })
  }

  onInputChange() {
    this.searchSubject.next(this.searchValue);
  }
}
