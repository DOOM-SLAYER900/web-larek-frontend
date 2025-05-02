export interface ApiProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface ApiListResponse<T> {
  total: number;
  items: T[];
}

export interface ApiClient {
  getProducts(): Promise<ApiListResponse<ApiProduct>>;
}


export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface CartItem {
  product: Product;
  counter: number;
}

export interface PurchaseData {
  paymentMethod: string;
  userAddress: string;
  userEmail: string;
  userPhone: string;
}

export interface ProductModel {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
}

export interface CartModel {
  getCartItems(): CartItem[];
  addToCart(product: Product): void;
  removeFromCart(productId: number): void;
  getTotalPrice(): number;
}

export interface PurchaseDataModel {
  setPurchaseData(data: PurchaseData): void;
  getPurchaseData(): PurchaseData | null;
  validateAddress(address: string): boolean;
  validateEmail(email: string): boolean;
  validatePhone(phone: string): boolean;
}

export interface Modal {
  onCloseClick(callback: () => void): void;
  show(): void;
  hide(): void;
}

export interface MainView {
  renderProducts(products: Product[]): void;
  onProductClick(callback: (productId: number) => void): void;
  setCartItemsCount(count: number): void;
}

export interface ProductDetailView extends Modal {
  renderProduct(product: Product): void;
  onAddToCartClick(callback: () => void): void;
}

export interface CartView extends Modal {
  renderCartItems(cartItems: CartItem[]): void;
  renderTotalPrice(totalPrice: number): void;
  onRemoveItemClick(callback: (productId: number) => void): void;
  onCheckoutClick(callback: () => void): void;
}

export interface PurchaseFirstView extends Modal {
  onNextClick(callback: (data: PurchaseData) => void): void;
  showError(message: string): void;
}

export interface PurchaseSecondView extends Modal {
  onPayClick(callback: (data: PurchaseData) => void): void;
  showError(message: string): void;
}

export interface Presenter<V, M> {
  view: V;
  model: M;
}

export enum Event {
  ProductClicked = 'productClicked',
  AddToCart = 'addToCart',
  RemoveFromCart = 'removeFromCart',
  Checkout = 'checkout',
  PurchaseDataSubmitted = 'purchaseDataSubmitted',
  PaymentSuccess = 'paymentSuccess',
  CloseProductDetail = 'closeProductDetail',
  CloseCart = 'closeCart',
  ClosePurchaseFirst = 'closePurchaseFirst',
  ClosePurchaseSecond = 'closePurchaseSecond',
}

export interface EventPayload {
  [Event.ProductClicked]: { productId: number };
  [Event.AddToCart]: { product: Product };
  [Event.RemoveFromCart]: { productId: number };
  [Event.Checkout]: {};
  [Event.PurchaseDataSubmitted]: PurchaseData;
  [Event.PaymentSuccess]: {};
  [Event.CloseProductDetail]: {};
  [Event.CloseCart]: {};
  [Event.ClosePurchaseFirst]: {};
  [Event.ClosePurchaseSecond]: {};
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}
