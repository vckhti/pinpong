import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core'

@Component({
  selector: 'mc-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input('total') totalItemLengthProps: number;
  @Input('limit') limitProps: number;
  @Input('currentPage') currentPageProps: number;
  @Input('url') urlProps: string;

  @Output() newItemEvent = new EventEmitter<string>();

  pagesCount: number;
  pages: number[];
  visiblePages: number[];
  visibleRangeLength = 3;

  constructor() {
  }

  ngOnInit(): void {
    if (this.totalItemLengthProps) {
      this.updateTotalPages();
      this.updateVisiblePages();
    }
  }

  private updateVisiblePages(): void {
    const length = Math.min(this.pagesCount, this.visibleRangeLength);
    const startIndex = Math.max(
      Math.min(
        this.currentPageProps - Math.ceil(length / 2),
        this.pagesCount - length
      ),
      0
    );

    this.visiblePages = Array.from(
      new Array(length).keys(),
      (item) => item + startIndex + 1
    );
  }

  private updateTotalPages(): void {
    this.pagesCount = Math.ceil(this.totalItemLengthProps / this.limitProps);
  }

  public onClicked(v: number): void {
    this.updateVisiblePages();
    this.newItemEvent.emit(v.toString());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.totalItemLengthProps) {
      this.updateTotalPages();
      this.updateVisiblePages();
    }
  }
}
