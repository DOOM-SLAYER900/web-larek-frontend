import { ApiListResponse } from "../components/base/api";

export interface ApiProduct {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface ApiClient {
  getProducts(): Promise<ApiListResponse<ApiProduct>>;
  submitOrder(order: IOrder): Promise<void>;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface BasketModel {
  items: { [productId: number]: Product };
  totalPrice: number;
  addProduct(product: Product): void;
  removeProduct(productId: number): void;
  getTotalPrice(): number;
  getItems(): Product[];
}

export enum PaymentMethod {
  Online = 'Online',
  Cash = 'cash',
}

export interface IOrder {
  address: string;
  email: string;
  phone: string;
  payment: PaymentMethod;
  items: string[];
  total: number
}

export interface PurchaseData {
  setPaymentMethod(method: PaymentMethod): void;
  setUserAddress(address: string): void;
  setUserEmail(email: string): void;
  setUserPhone(phone: string): void;
  getPaymentMethod(): string | null;
  getUserAddress(): string | null;
  getUserEmail(): string | null;
  getUserPhone(): string | null;
  isValid(): boolean;
  validateEmail(): boolean;
  validatePhone(): boolean;
}

export interface ProductModel {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
}

export interface Modal {
  modalElement: HTMLElement;
  contentElement: HTMLElement;
  onCloseCallback: () => void;
  onCloseClick(callback: () => void): void;
  setContent(content: HTMLElement): void;
  show(): void;
  hide(): void;
}

export interface MainView {
  productsContainer: HTMLElement;
  basketButton: HTMLButtonElement;
  basketElementCounter: HTMLElement;
  renderProducts(productElements: HTMLElement[]): void;
  onProductClick(callback: (productId: number) => void): void;
  setCartItemsCount(count: number): void;
}

export interface ProductDetailView {
  modal: Modal;
  titleElement: HTMLInputElement;
  imageElement: HTMLInputElement;
  descriptionElement: HTMLInputElement;
  categoryElement: HTMLInputElement;
  priceElement: HTMLInputElement;
  addToCartButton: HTMLInputElement;
  onAddToCartCallback: () => void;
  productTemplate: HTMLTemplateElement;
  renderProduct(product: Product): void;
  onAddToBasketClick(callback: () => void): void;
  show(product: Product): void;
  hide(): void;
}

export interface BasketView {
  modal: Modal;
  BasketItemsContainer: HTMLElement;
  totalPriceElement: HTMLElement;
  checkoutButton: HTMLButtonElement;
  onRemoveItemCallback: (productId: number) => void;
  onCheckoutCallback: () => void;
  BasketItemTemplate: HTMLTemplateElement;
  basketModel: BasketModel;
  renderBasketItems(BasketItems: Product[]): void;
  renderTotalPrice(): void;
  onRemoveItemClick(callback: (productId: number) => void): void;
  onCheckoutClick(callback: () => void): void;
  show(): void;
  hide(): void;
}

export interface PurchaseFirstView extends Modal {
  paymentMethodOnline: HTMLInputElement;
  paymentMethodCash: HTMLInputElement;
  addressInput: HTMLInputElement;
  errorElement: HTMLElement;
  onNextClick(callback: (data: PurchaseData) => void): void;
  showError(message: string): void;
  show(): void;
  hide(): void;
}

export interface PurchaseSecondView extends Modal {
  emailInput: HTMLInputElement;
  phoneInput: HTMLInputElement;
  errorElement: HTMLElement;
  onPayClick(callback: (data: PurchaseData) => void): void;
  showError(message: string): void;
  show(): void;
  hide(): void;
}

export interface SuccessView {
  modal: Modal;
  descriptionPrice: HTMLElement;
  renderSuccess(orderData: { totalPrice: number }): void;
  show(orderData: { totalPrice: number }): void;
  hide(): void;
}

export interface Presenter<V, M> {
  view: V;
  model: M;
}

export enum Event {
  ProductClicked = 'productClicked',
  AddToBasket = 'addToBasket',
  RemoveFromBasket = 'removeFromBasket',
  Checkout = 'checkout',
  PaymentSuccess = 'paymentSuccess',
  CloseProductDetail = 'closeProductDetail',
  CloseBasket = 'closeBasket',
  ClosePurchaseFirst = 'closePurchaseFirst',
  ClosePurchaseSecond = 'closePurchaseSecond',
}

export interface EventPayload {
  [Event.ProductClicked]: { productId: number };
  [Event.AddToBasket]: { product: Product };
  [Event.RemoveFromBasket]: { productId: number };
  [Event.Checkout]: {};
  [Event.PaymentSuccess]: {};
  [Event.CloseProductDetail]: {};
  [Event.CloseBasket]: {};
  [Event.ClosePurchaseFirst]: {};
  [Event.ClosePurchaseSecond]: {};
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}
