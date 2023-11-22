export interface ICustomer {
  [x: string]: Key | null | undefined;
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
}