Для запуска проекта в режиме разработки необходимо:
1. Установить node js.
2. Запустить консоль (cmd), перейти в корень проекта и ввести команду npm i
3. Запустить команду npm start
4. Открыть в браузере http://localhost:4200/

Данный проект развернут на тестовой площадке и доступен по адресу http://r908321m.beget.tech/
Код бэкэнда бегло написан на Laravel 8, но не демонстрируется в данном проекте.

Для входа под покупателем используйте имя: Тестовый1 пароль: 123456789
Для входа под администратором в админскую часть сайта (/admin) используйте имя: admin пароль: 123456

Данный проект демонстрирует различные подходы написания web-приложения с помощью Angular.
Первый подход использует NgRx store для хранения данных, к которым можно обратиться с помощью селекторов (используя реактивный подход). Большим преимуществом данного подхода является возможность проверки значений в store с помощью оператора filter. Если в store данных  нет, то вызывается сервис который обращается к бэкэнду. Это позволяет не обращаться к бэкэнду лишний раз, и отображать страницы быстрее (без затраченного на запрос к бэкэнду времени).

В модуле admin используется другой подход написания кода с помощью сервисов и сущностей. При инициализации компонента модель наполняется данными и привязывается к шаблону. Наполненную модель можно передавать в качестве аргумента в функции сервисов и тем самым изменять объект модели (при этом будет меняться и html-шаблон).

В проекте используется самописная пагинация. Демонстрируется возможность автоматической фокусировки на <input> после нажатия "Оформить заказ". 
Используется guard (защита админских маршрутов). Реализована глобальная обработка ошибок (перехват ошибок в том числе из консоли) и вывод информации в сервис всплывающих сообщений и в консоль. Используются принципы ООП, такие как наследование (базовый класс компонента с пагинацией). Это позволило уйти от дублирования кода. Активно используется библиотека RxJS, считывается информация с маршрута и всё это комбинируется.

В проекте используется библиотека Prime NG. В админском модуле с помощью этой библиотеки построена таблица с возможностью сортировки 
и пагинации. Кроме того, используется Prime NG toast модуль (всплывающие сообщения), которому удалось поменять цвет текста с помощью стилей.

В разметке активно используется библиотека Bootstrap 5. Если товар уже находится в корзине, то меняется иконка (реализовано с помощью селекторов и ngClass). Демонстрируется пример использования @Viewchild и @Viewchildren. Реализован screen-сервис, в котором удачно демонстрируется использование BehaviorSubject'а, который передает значение ширины окна страницы. Это используется для отображения мобильной версии верстки.
