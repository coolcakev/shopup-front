export interface IProduct {
  images: File[] | string[];
  description?: string;
  name: string;
  price: number;
  _id?: string | undefined;
}

export const emptyProduct: GetAllProductResponse = {
  images: [],
  description: "",
  name: "",
  price: 0,
  _id: "",
};

export interface GetAllProductResponse{
  _id: string;
  price: number;
  name: string;
  description: string;
  images: ProductImage[];
}

export interface ProductImage
{
  key: string;
  link: string;
}

