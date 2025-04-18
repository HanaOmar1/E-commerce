//  interface Brand {
//   results: number;
//   metadata: Metadata;
//   data: Brand[];
// }

export interface Ibrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}
