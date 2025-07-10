export interface IPaginationOptions {
  page: number;
  limit: number;
}

export interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export class Pagination<T> {
  items: T[];
  meta: PaginationMeta;

  constructor(items: T[], totalItems: number, currentPage: number, limit: number) {
    this.items = items;
    this.meta = {
      totalItems,
      itemCount: items.length,
      itemsPerPage: limit,
      totalPages: Math.ceil(totalItems / limit),
      currentPage,
    };
  }
}

export async function paginateMongo<T>(
  model: any,
  options: IPaginationOptions,
  filter: Record<string, any> = {},
  projection: any = null,
  populate: string | string[] = [],
): Promise<Pagination<T>> {
  const { page = 1, limit = 10 } = options;
  const skip = (page - 1) * limit;

  const [items, totalItems] = await Promise.all([
    model.find(filter, projection).skip(skip).limit(limit).populate(populate).exec(),
    model.countDocuments(filter),
  ]);

  return new Pagination<T>(items, totalItems, page, limit);
}
