https://github.com/DOOM-SLAYER900/web-larek-frontend.git
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
price: number | null — цена товара.
category: string — категория товара.
description: string — описание товара.
image: string — URL изображения товара.

ApiClient:
Описание: Интерфейс для взаимодействия с API, получения данных о товарах.
Методы:
getProducts(): Promise<ApiListResponse<ApiProduct>> — асинхронный метод для получения списка товаров из API. Возвращает Promise, который разрешается в объект ApiListResponse<ApiProduct>.
submitOrder(order: PurchaseData): Promise<void> — Отправить заказ на сервер.

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

BasketModel:
Описание: Модель, отвечающая за управление корзиной покупок. Хранит информацию о добавленных товарах и общей стоимости корзины. В корзине может быть только один экземпляр каждого товара.
Поля:
items: { [productId: number]: Product } — объект, где ключом является `productId`, а значением - объект товара (`Product`).
totalPrice: number — общая стоимость товаров в корзине.
Методы:
addProduct(product: Product): void — добавляет товар в корзину. Если товар уже есть, ничего не делает.
removeProduct(productId: number): void — удаляет товар из корзины.
getTotalPrice(): number — возвращает общую стоимость товаров в корзине.
getItems(): Product[] — возвращает массив объектов товаров в корзине.

PurchaseData:
Описание: Хранит данные, введенные пользователем при оформлении заказа, валидирует их и предоставляет методы для безопасного доступа.
Поля:
private paymentMethod: string | null — способ оплаты (может быть null, если не выбран).
private userAddress: string | null — адрес пользователя (может быть null, если не введен).
private userEmail: string | null — электронная почта пользователя (может быть null, если не введена).
private userPhone: string | null — телефон пользователя (может быть null, если не введен).
Конструктор:
Принимает все свойства и инициализирует их.
Методы:
setPaymentMethod(method: string): void — устанавливает способ оплаты.
setUserAddress(address: string): void — устанавливает адрес пользователя.
setUserEmail(email: string): void — устанавливает электронную почту пользователя.
setUserPhone(phone: string): void — устанавливает телефон пользователя.
getPaymentMethod(): string | null — возвращает способ оплаты.
getUserAddress(): string | null — возвращает адрес пользователя.
getUserEmail(): string | null — возвращает электронную почту пользователя.
getUserPhone(): string | null — возвращает телефон пользователя.
isValid(): boolean — проверяет, заполнены ли все необходимые поля и прошли ли валидацию.
validateEmail(): boolean — проверяет корректность формата электронной почты.
validatePhone(): boolean — проверяет корректность формата телефона.

2. Отображения:

Modal:
Описание: Базовый класс для модальных окон, отвечающий за общую логику отображения и скрытия, а также за управление содержимым модального окна.
Поля:
modalElement: HTMLElement — Ссылка на HTML-элемент всего модального окна.
contentElement: HTMLElement — Ссылка на контейнер внутри модального окна, куда будет помещаться содержимое.
onCloseCallback: () => void — Функция обратного вызова, вызываемая при закрытии модального окна.
Конструктор (modalId: string):
this.modalElement = document.getElementById(modalId)! — Получаем элемент модального окна по ID
this.contentElement = this.modalElement.querySelector('.modal-content')! — Находим контейнер для контента
Методы:
onCloseClick(callback: () => void): void — Устанавливает функцию обратного вызова, которая будет вызвана при закрытии модального окна.
setContent(content: HTMLElement): void — Очищает предыдущее содержимое contentElement и добавляет переданный HTML-элемент в качестве нового содержимого.
show(): void — Отображает модальное окно.
hide(): void — Скрывает модальное окно, Также вызывает onCloseCallback.

MainView:
Описание: Отображает главную страницу с каталогом товаров.  Отвечает за отображение данных и взаимодействие с пользователем, делегируя логику Presenter-у.
Поля класса:
productsContainer: HTMLElement — элемент контейнера для отображения карточек товаров.
basketButton: HTMLButtonElement — элемент кнопки корзины.
basketElementCounter: HTMLElement — элемент счетчика корзины.
Методы:
renderProducts(productElements: HTMLElement[]): void — отображает список товаров в виде карточек.  Принимает массив HTML-элементов, представляющих карточки товаров.
onProductClick(callback: (productId: number) => void): void — устанавливает коллбек для обработки клика по карточке товара.
setCartItemsCount(count: number): void — обновляет количество товаров в корзине.

ProductDetailView:
Описание: Класс, отвечающий за отображение модального окна с детальной информацией о товаре. Не наследует Modal напрямую, но использует экземпляр Modal для управления отображением.
Поля:
modal: Modal — Экземпляр класса Modal, используемый для отображения и скрытия модального окна.
titleElement: HTMLInputElement — Элемент для отображения названия товара.
imageElement: HTMLInputElement — Элемент для отображения изображения товара.
descriptionElement: HTMLInputElement — Элемент для отображения описания товара.
categoryElement: HTMLInputElement — Элемент для отображения категории товара.
priceElement: HTMLInputElement — Элемент для отображения цены товара.
addToCartButton: HTMLInputElement — Элемент кнопки добавления товара в корзину.
onAddToCartCallback: () => void — Функция обратного вызова, вызываемая при нажатии кнопки "Добавить в корзину".
productTemplate: HTMLTemplateElement — Ссылка на HTML-шаблон, содержащий разметку для отображения информации о товаре.
Конструктор (modalId: string):
this.modal = new Modal(modalId);
this.productTemplate = document.getElementById('card-preview') as HTMLTemplateElement;
const templateContent = this.productTemplate.content.cloneNode(true) as HTMLElement;
this.titleElement = templateContent.querySelector('.card__title') as HTMLInputElement;
this.imageElement = templateContent.querySelector('.card__image') as HTMLInputElement;
this.descriptionElement = templateContent.querySelector('.card__text') as HTMLInputElement;
this.categoryElement = templateContent.querySelector('.card__category') as HTMLInputElement;
this.priceElement = templateContent.querySelector('.card__price') as HTMLInputElement;
this.addToBasketButton = templateContent.querySelector('.card__button') as HTMLInputElement;
Методы:
renderProduct(product: Product): void - Отображает детальную информацию о товаре, заполняя соответствующие элементы (название, изображение, описание, категория, цена) данными из объекта Product.
onAddToBasketClick(callback: () => void): void - Устанавливает функцию обратного вызова, которая будет вызвана при нажатии кнопки "Добавить в корзину".
show(product: Product): void - Отображает модальное окно с информацией о товаре. Вызывает renderProduct() для заполнения элементов данными и затем использует modal.setContent() для добавления содержимого в модальное окно.
hide(): void - Скрывает модальное окно, вызывая метод hide() у экземпляра Modal.

BasketView:
Описание: Класс, отвечающий за отображение модального окна с корзиной покупок. Использует экземпляр Modal для управления отображением и взаимодействует с BasketModel для получения данных о корзине.
Поля:
modal: Modal - Экземпляр класса Modal, используемый для отображения и скрытия модального окна.
BasketItemsContainer: HTMLElement - Элемент, в который будут отображаться элементы товаров в корзине.
totalPriceElement: HTMLElement - Элемент для отображения итоговой цены.
checkoutButton: HTMLButtonElement - Элемент кнопки оформления заказа.
onRemoveItemCallback: (productId: number) => void - Функция обратного вызова, вызываемая при удалении товара из корзины.
onCheckoutCallback: () => void - Функция обратного вызова, вызываемая при нажатии кнопки "Оформить заказ".
BasketItemTemplate: HTMLTemplateElement - Ссылка на HTML-шаблон, содержащий разметку для отображения одного товара в корзине.
basketModel: BasketModel - Экземпляр BasketModel для управления данными корзины.
Конструктор (modalId: string, basketModel: BasketModel):
this.modal = new Modal(modalId)
this.BasketItemsContainer = templateContent.querySelector('.basket__list') as HTMLInputElement;
this.totalPriceElement = templateContent.querySelector('.basket__price') as HTMLInputElement;
this.checkoutButton = templateContent.querySelector('.button') as HTMLInputElement;
this.BasketItemTemplate = templateContent.querySelector('.basket__item') as HTMLInputElement;
this.basketModel = basketModel
Методы:
renderBasketItems(BasketItems: Product[]): void - Отображает список товаров в корзине.
renderTotalPrice(): void - Отображает общую стоимость, используя данные из basketModel.getTotalPrice().
onRemoveItemClick(callback: (productId: number) => void): void - Устанавливает функцию обратного вызова, которая будет вызываться при нажатии на кнопку удаления товара из корзины.
onCheckoutClick(callback: () => void): void - Устанавливает функцию обратного вызова, которая будет вызываться при нажатии кнопки "Оформить заказ".
show(): void - Отображает модальное окно с корзиной покупок. Вызывает renderBasketItems() и renderTotalPrice() для отображения данных, используя данные из basketModel. Затем использует modal.setContent() для добавления содержимого в модальное окно.
hide(): void - Скрывает модальное окно, вызывая метод hide() у экземпляра Modal.

PurchaseFirstView:
Описание: Отображает первое модальное окно оформления заказа.
Поля класса:
modal: Modal - Экземпляр класса Modal, используемый для отображения и скрытия модального окна.
paymentMethodOnline: HTMLInputElement — элемент кнопки выбора онлайн-оплаты.
paymentMethodCash: HTMLInputElement — элемент кнопки выбора оплаты при доставке.
addressInput: HTMLInputElement — элемент ввода адреса.
errorElement: HTMLElement — элемент текста с ошибкой.
Методы:
onNextClick(callback: (data: PurchaseData) => void): void — устанавливает коллбек для перехода к следующему шагу.
showError(message: string): void — отображает сообщение об ошибке.
show(): void - Отображает модальное окно, вызывая this.modal.show().
hide(): void - Скрывает модальное окно, вызывая this.modal.hide().

PurchaseSecondView:
Описание: Отображает второе модальное окно оформления заказа.
Поля класса:
modal: Modal - Экземпляр класса Modal, используемый для отображения и скрытия модального окна.
emailInput: HTMLInputElement — элемент ввода электронной почты.
phoneInput: HTMLInputElement — элемент ввода телефона.
errorElement: HTMLElement — элемент текста с ошибкой.
Методы:
onPayClick(callback: (data: PurchaseData) => void): void — устанавливает коллбек для обработки платежа.
showError(message: string): void — отображает сообщение об ошибке.
show(): void - Отображает модальное окно, вызывая this.modal.show().
hide(): void - Скрывает модальное окно, вызывая this.modal.hide().

SuccessView:
Описание: Отображает окно успешного оформления заказа.
Поля класса:
modal: Modal - Экземпляр класса Modal, используемый для отображения и скрытия модального окна.
descriptionPrice: HTMLInputElement — элемент c указанием итоговой цены.
Методы:
renderSuccess(orderData: { totalPrice: number }) => void — Реализация отображения сообщения об успешном заказе
show(orderData: { totalPrice: number }): void - Отображает модальное окно. Вызывает renderSuccess(orderData) для отображения данных и this.modal.show().
hide(): void - Скрывает модальное окно, вызывая this.modal.hide().

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
BasketModel: BasketModel — модель данных о корзине.
Конструктор класса (view: MainView, model: ProductModel, BasketModel: BasketModel):
this.view = view;
this.model = model;
this.BasketModel = BasketModel;
this.view.onProductClick((productId) => {});
Методы:
loadProducts(): Promise<void> — загружает список товаров из model и передает их в view для отображения.
createProductCard(product: Product): HTMLElement — создает HTML-элемент карточки товара на основе данных продукта.  Включает логику добавления товара в корзину при клике на кнопку.
handleProductClick(productId: number): void — обработчик клика по карточке товара (может быть пустым, если нет дополнительной логики).

ProductDetailPresenter реализует интерфейс Presenter:
Описание: Управляет логикой модального окна с детальной информацией о товаре.
Поля:
view: ProductDetailView — представление детальной информации о товаре.
model: ProductModel — модель данных о товарах.
BasketModel: BasketModel — модель данных о корзине.
Конструктор класса (view: ProductDetailView, model: ProductModel, BasketModel: BasketModel):
this.view = view;
this.model = model;
this.BasketModel = BasketModel;
this.view.onAddToBasketClick(() => {});

BasketPresenter:
Описание: Управляет логикой модального окна с корзиной покупок, связывая BasketView и BasketModel. Реализует интерфейс Presenter.
Поля:
view: BasketView - Ссылка на представление корзины.
model: BasketModel - Ссылка на модель данных о корзине.
Конструктор (view: BasketView, model: BasketModel):
this.view = view
this.model = model
this.view.onRemoveItemClick((productId) => this.handleRemoveItem(productId))
this.view.onCheckoutClick(() => this.handleCheckout())
Методы:
handleRemoveItem(productId: number): void - Обрабатывает удаление товара из корзины. Вызывает this.model.removeProduct(productId) для удаления товара из модели. После этого обновляет отображение корзины, вызывая this.view.renderBasketItems() и this.view.renderTotalPrice().
handleCheckout(): void - Обрабатывает оформление заказа. (Логика оформления заказа будет здесь).
showBasket(): void - Отображает корзину. Вызывает this.view.show() для отображения представления.

PurchaseFirstPresenter реализует интерфейс Presenter:
Описание: Управляет логикой первого модального окна оформления заказа.
Поля:
view: PurchaseFirstView — представление первого окна оформления заказа.
model: PurchaseDataModel — модель данных о покупке.
BasketModel: BasketModel — модель данных о корзине.
Конструктор класса (view: PurchaseFirstView, model: PurchaseDataModel, BasketModel: BasketModel):
this.view = view;
this.model = model;
this.BasketModel = BasketModel;
this.view.onNextClick((data) => {});

PurchaseSecondPresenter реализует интерфейс Presenter:
Описание: Управляет логикой второго модального окна оформления заказа.
Поля:
view: PurchaseSecondView — представление второго окна оформления заказа.
model: PurchaseDataModel — модель данных о покупке.
BasketModel: BasketModel — модель данных о корзине.
Конструктор класса (view: PurchaseSecondView, model: PurchaseDataModel, BasketModel: BasketModel):
this.view = view;
this.model = model;
this.BasketModel = BasketModel;
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
