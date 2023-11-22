export interface IProduct {
  images: File[] | string[];
  description?: string;
  name: string;
  price: number;
  _id?: string | undefined;
}

export const emptyProduct: IProduct = {
  images: [],
  description: "",
  name: "",
  price: 0,
  _id: undefined,
};
