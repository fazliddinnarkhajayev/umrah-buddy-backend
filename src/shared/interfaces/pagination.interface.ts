export interface PaginationMeta {
  total_items_count: number;
  total_pages_count: number;
  page_size: number;
  page_index: number;
}

export class PaginatedResult<T> {
  readonly items: T[];
  readonly meta: PaginationMeta;

  constructor(items: T[], meta: PaginationMeta) {
    this.items = items;
    this.meta = meta;
  }
}
