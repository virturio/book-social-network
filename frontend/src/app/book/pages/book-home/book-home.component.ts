import { Component, OnInit } from '@angular/core';
import { Perform } from 'src/app/utils/perform';
import { BookService } from '../../book.service';
import { PageResponseBookResponse } from '../../types/page-response-book-response';
import { map } from 'rxjs';

@Component({
  selector: 'app-book-home',
  templateUrl: './book-home.component.html',
})
export class BookHomeComponent implements OnInit {
  constructor(private bookService: BookService) {}

  response$: Perform<PageResponseBookResponse> = new Perform();

  ngOnInit(): void {
    this.response$.load(this.bookService.findAllBooks());
  }

  selectPage($event: number) {
    this.response$.load(
      this.bookService.findAllBooks({
        page: $event,
      })
    );
  }
}
