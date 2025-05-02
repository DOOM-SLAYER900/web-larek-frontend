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
Product: Хранит данные о товаре. { id: number, title: string, price: number, category: string, description: string, image: string }
Cart: Хранит список товаров в корзине и общую стоимость. Предоставляет методы добавления, удаления и получения товаров. { items: Product[], totalPrice: number }
PurchaseData: Хранит данные, введенные пользователем при оформлении заказа и валидирует их. { paymentMethod: string, userAddress: string, userEmail: string, userPhone: string }
ErrorManager: Управляет сообщениями об ошибках, предоставляя их в унифицированном формате.

2. Отображения:
MainView: Отображает главную страницу с каталогом товаров.
ProductDetailView: Отображает модальное окно с детальной информацией о товаре.
CartView: Отображает модальное окно с корзиной покупок.
PurchaseFirstView: Отображает первое модальное окно оформления заказа.
PurchaseSecondView: Отображает второе модальное окно оформления заказа.
ErrorView: Отображает сообщения об ошибках.

3. Представители:
MainPresenter: Управляет логикой главной страницы. Взаимодействует с MainView и ProductModel.
ProductDetailPresenter: Управляет логикой модального окна с детальной информацией о товаре. Взаимодействует с ProductDetailView, ProductModel, и CartModel.
CartPresenter: Управляет логикой модального окна с корзиной покупок. Взаимодействует с CartView и CartModel.
PurchaseFirstPresenter: Управляет логикой первого модального окна оформления заказа. Взаимодействует с PurchaseFirstView и PurchaseDataModel.
PurchaseSecondPresenter: Управляет логикой второго модального окна оформления заказа. Взаимодействует с PurchaseSecondView, PurchaseDataModel, и CartModel.
EventEmitter: Обеспечивает работу событий. Его функции: возможность установить и снять слушателей событий, вызвать слушателей при возникновении события.

4. EventEmitter: Реализует паттерн "публикация-подписка" для взаимодействия компонентов.

Компоненты взаимодействуют через EventEmitter. Например:

MainPresenter эмитит событие productClicked с данными о товаре при нажатии на карточку товара. ProductDetailPresenter подписывается на это событие и открывает модальное окно.
ProductDetailPresenter эмитит событие addToCart при нажатии на кнопку "В корзину". CartPresenter подписывается на это событие и обновляет корзину.
CartPresenter эмитит событие checkout при нажатии на кнопку "Оформить". PurchaseFirstPresenter подписывается на это событие и открывает первое окно оформления заказа.
