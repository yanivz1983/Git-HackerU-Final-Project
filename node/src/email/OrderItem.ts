export interface OrderItem {
  title: string;
  price: number;
  quantity: number;
  shipping: string;
  imageUrl: string | undefined;
  itemTotal: number;
}
