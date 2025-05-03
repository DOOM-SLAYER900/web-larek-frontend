# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Описание базовых классов, их предназначение и функции

1. Модели:

ApiProduct:
Описание: Интерфейс, представляющий структуру данных о товаре, полученную от API.
Поля:
id: number — уникальный идентификатор товара.
title: string — название товара.
price: number — цена товара.
category: string — категория товара.
description: string — описание товара.
image: string — URL изображения товара.

ApiClient:
Описание: Интерфейс для взаимодействия с API, получения данных о товарах.
Методы:
getProducts(): Promise<ApiListResponse<ApiProduct>> — асинхронный метод для получения списка товаров из API. Возвращает Promise, который разрешается в объект ApiListResponse<ApiProduct>.

ApiListResponse<Type>:
Описание: Интерфейс для представления ответа API, содержащего список объектов типа Type и общее количество элементов.
Поля:
total: number — общее количество элементов.
items: Type[] — массив объектов типа Type.

ProductModel:
Описание: Модель, отвечающая за получение и обработку данных о товарах.
Методы:
getProducts(): Promise<Product[]> — асинхронный метод для получения списка товаров. Преобразует данные из API (ApiProduct) в формат, используемый в приложении (Product).
getProduct(id: number): Promise<Product | undefined> — асинхронный метод для получения информации о конкретном товаре по его ID.
Конструктор класса (apiClient: ApiClient):
this.apiClient = apiClient;

Product:
Описание: Хранит данные о товаре.
Поля:
id: number — уникальный идентификатор товара.
title: string — название товара.
price: number — цена товара.
category: string — категория товара.
description: string — описание товара.
image: string — URL изображения товара.
Конструктор принимает все свойства и инициализирует их.

CartItem:
Описание: Хранит информацию о товаре в корзине и количестве.
Поля:
product: Product — объект товара.
counter: number — количество товара в корзине.
Конструктор принимает все свойства и инициализирует их.

PurchaseData:
Описание: Хранит данные, введенные пользователем при оформлении заказа и валидирует их.
Поля:
paymentMethod: string — способ оплаты.
userAddress: string — адрес пользователя.
userEmail: string — электронная почта пользователя.
userPhone: string — телефон пользователя.
Конструктор принимает все свойства и инициализирует их.

2. Отображения:

Modal:
Описание: Базовый класс для модальных окон, содержит общую логику отображения и скрытия.
Методы:
onCloseClick(callback: () => void): void — устанавливает обработчик для события закрытия окна.
show(): void — отображает модальное окно.
hide(): void — скрывает модальное окно.

MainView:
Описание: Отображает главную страницу с каталогом товаров.
Поля класса:
Products: HTMLInputElement — элемент каталога товаров.
basketButton: HTMLInputElement — элемент кнопки корзины.
basketElementCounter: HTMLInputElement — элемент счетчика корзины.
Методы:
renderProducts(products: Product[]): void — отображает список товаров в виде карточек.
onProductClick(callback: (productId: number) => void): void — устанавливает коллбек для обработки клика по карточке товара.
setCartItemsCount(count: number): void — обновляет количество товаров в корзине.

ProductDetailView (Наследуется от Modal):
Описание: Отображает модальное окно с детальной информацией о товаре.
Поля класса:
titleElement: HTMLInputElement — элемент названия.
imageElement: HTMLInputElement — элемент изображения.
descriptionElement: HTMLInputElement — элемент описания.
categoryElement: HTMLInputElement — элемент категории.
priceElement: HTMLInputElement — элемент цены.
AddToCartButton: HTMLInputElement — элемент кнопки добавления в корзину.
Методы:
renderProduct(product: Product): void — отображает детальную информацию о товаре (изображение, название, цена, описание).
onAddToCartClick(callback: () => void): void — устанавливает коллбек для обработки добавления товара в корзину.

CartView (Наследуется от Modal):
Описание: Отображает модальное окно с корзиной покупок.
Поля класса:
cartItems: HTMLInputElement — список товаров в корзине.
totalPriceElement: HTMLInputElement — элемент итоговой цены.
Методы:
renderCartItems(cartItems: CartItem[]): void — отображает список товаров в корзине (номер, название, цена, кнопка удаления).
renderTotalPrice(totalPrice: number): void — отображает общую стоимость.
onRemoveItemClick(callback: (productId: number) => void): void — устанавливает коллбек для обработки удаления товара из корзины.
onCheckoutClick(callback: () => void): void — устанавливает коллбек для оформления заказа.

PurchaseFirstView (Наследуется от Modal):
Описание: Отображает первое модальное окно оформления заказа.
Поля класса:
paymentMethodOnline: HTMLInputElement — элемент кнопки выбора онлайн-оплаты.
paymentMethodCash: HTMLInputElement — элемент кнопки выбора оплаты при доставке.
addressInput: HTMLInputElement — элемент ввода адреса.
errorElement: HTMLElement — элемент текста с ошибкой.
Методы:
onNextClick(callback: (data: PurchaseData) => void): void — устанавливает коллбек для перехода к следующему шагу.
showError(message: string): void — отображает сообщение об ошибке.

PurchaseSecondView (Наследуется от Modal):
Описание: Отображает второе модальное окно оформления заказа.
Поля класса:
emailInput: HTMLInputElement — элемент ввода электронной почты.
phoneInput: HTMLInputElement — элемент ввода телефона.
errorElement: HTMLElement — элемент текста с ошибкой.
Методы:
onPayClick(callback: (data: PurchaseData) => void): void — устанавливает коллбек для обработки платежа.
showError(message: string): void — отображает сообщение об ошибке.

SuccessView (Наследуется от Modal):
Описание: Отображает окно успешного оформления заказа.
Поля класса:
descriptionPrice: HTMLInputElement — элемент c указанием итоговой цены.
Методы:
renderSuccess(orderData: { totalPrice: number }) => void — Реализация отображения сообщения об успешном заказе

3. Представители:

Presenter<V, M>:
Описание: Обобщенный интерфейс для представителя, связывающего представление (View) и модель (Model).
Параметры типа:
V — тип представления (View).
M — тип модели (Model).
Поля:
view: V — ссылка на представление.
model: M — ссылка на модель.

MainPresenter реализует интерфейс Presenter:
Описание: Управляет логикой главной страницы.
Поля:
view: MainView — представление главной страницы.
model: ProductModel — модель данных о товарах.
cartModel: CartModel — модель данных о корзине.
Конструктор класса (view: MainView, model: ProductModel, cartModel: CartModel):
this.view = view;
this.model = model;
this.cartModel = cartModel;
this.view.onProductClick((productId) => {});

ProductDetailPresenter реализует интерфейс Presenter:
Описание: Управляет логикой модального окна с детальной информацией о товаре.
Поля:
view: ProductDetailView — представление детальной информации о товаре.
model: ProductModel — модель данных о товарах.
cartModel: CartModel — модель данных о корзине.
Конструктор класса (view: ProductDetailView, model: ProductModel, cartModel: CartModel):
this.view = view;
this.model = model;
this.cartModel = cartModel;
this.view.onAddToCartClick(() => {});

CartPresenter реализует интерфейс Presenter:
Описание: Управляет логикой модального окна с корзиной покупок.
Поля:
view: CartView — представление корзины.
model: CartModel — модель данных о корзине.
Конструктор класса (view: CartView, model: CartModel):
this.view = view;
this.model = model;
this.view.onRemoveItemClick((productId) => {});
this.view.onCheckoutClick(() => {});

PurchaseFirstPresenter реализует интерфейс Presenter:
Описание: Управляет логикой первого модального окна оформления заказа.
Поля:
view: PurchaseFirstView — представление первого окна оформления заказа.
model: PurchaseDataModel — модель данных о покупке.
cartModel: CartModel — модель данных о корзине.
Конструктор класса (view: PurchaseFirstView, model: PurchaseDataModel, cartModel: CartModel):
this.view = view;
this.model = model;
this.cartModel = cartModel;
this.view.onNextClick((data) => {});

PurchaseSecondPresenter реализует интерфейс Presenter:
Описание: Управляет логикой второго модального окна оформления заказа.
Поля:
view: PurchaseSecondView — представление второго окна оформления заказа.
model: PurchaseDataModel — модель данных о покупке.
cartModel: CartModel — модель данных о корзине.
Конструктор класса (view: PurchaseSecondView, model: PurchaseDataModel, cartModel: CartModel):
this.view = view;
this.model = model;
this.cartModel = cartModel;
this.view.onPayClick((data) => {});

4. События и дополнительные интерфейсы:

EventName: Строка или регулярное выражение, представляющее имя события.
Subscriber: Функция, которая вызывается при наступлении события.
EmitterEvent: Объект, содержащий имя события и данные.

EventEmitter:
Описание: Класс EventEmitter обеспечивает работу событий. Его функции: возможность установить и снять слушателей событий, вызвать слушателей при возникновении события.
Методы:
on<T extends object>(eventName: EventName, callback: (event: T) => void): Подписывает функцию на событие. Поддерживает подписку на все события с помощью * и подписку по шаблону с помощью регулярных выражений.
off(eventName: EventName, callback: Subscriber): Отписывает функцию от события.
emit<T extends object>(eventName: string, data?: T): Инициирует событие и вызывает все подписанные на него функции. При этом передаются данные, если они есть. Для событий * и регулярных выражений передается объект EmitterEvent.
onAll(callback: (event: EmitterEvent) => void): Подписывает функцию на все события.
offAll(): Отписывает все функции от всех событий.
trigger<T extends object>(eventName: string, context?: Partial<T>): Создает функцию-триггер, которая при вызове инициирует событие.

Event:
Описание: Перечисление (enum) всех возможных событий в приложении.
Значения:
ProductClicked = 'productClicked' — событие, возникающее при клике на карточку товара.
AddToCart = 'addToCart' — событие, возникающее при добавлении товара в корзину.
RemoveFromCart = 'removeFromCart' — событие, возникающее при удалении товара из корзины.
Checkout = 'checkout' — событие, возникающее при переходе к оформлению заказа.
PaymentSuccess = 'paymentSuccess' — событие, возникающее при успешной оплате.
CloseProductDetail = 'closeProductDetail' — событие, возникающее при закрытии окна детализации товара.
CloseCart = 'closeCart' — событие, возникающее при закрытии корзины.
ClosePurchaseFirst = 'closePurchaseFirst' — событие, возникающее при закрытии первого окна оформления заказа.
ClosePurchaseSecond = 'closePurchaseSecond' — событие, возникающее при закрытии второго окна оформления заказа.

EventPayload:
Описание: Интерфейс, определяющий типы данных, передаваемых с каждым событием.
Поля:
[Event.ProductClicked]: { productId: number } — данные для события ProductClicked.
[Event.AddToCart]: { product: Product } — данные для события AddToCart.
[Event.RemoveFromCart]: { productId: number } — данные для события RemoveFromCart.
[Event.Checkout]: {} — данные для события Checkout.
[Event.PaymentSuccess]: {} — данные для события PaymentSuccess.
[Event.CloseProductDetail]: {} — данные для события CloseProductDetail.
[Event.CloseCart]: {} — данные для события CloseCart.
[Event.ClosePurchaseFirst]: {} — данные для события ClosePurchaseFirst.
[Event.ClosePurchaseSecond]: {} — данные для события ClosePurchaseSecond.

ValidationResult:
Описание: Интерфейс, представляющий результат валидации.
Поля:
isValid: boolean — флаг, указывающий, прошла ли валидация успешно.
message?: string — сообщение об ошибке.
