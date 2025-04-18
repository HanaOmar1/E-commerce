export interface ICart {
  _id: string;
  cartOwner: string;
  products: ProductElement[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  totalCartPrice: number;
}

interface ProductElement {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

interface Product {
  subcategory: Brand[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Brand;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
