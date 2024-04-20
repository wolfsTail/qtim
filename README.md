# users

Модуль `users` является реализацией системы регистрации и аутентификации пользователей. Обеспечивает эффективное управление данными пользователя и их взаимодействие с другими модулями системы.

- Основной функционал:
  - получение и обновление данных пользователя;
  - регистрация пользователей с верификацией телефонного номера;
  - аутентификация пользователей (JWT).
- Роль:
  - аутентификация и авторизация;
  - управление данными пользователя.
- Стэк:
  - NestJS;
  - TypeORM;
  - JWT;
  - NestJS Swagger;
  - class-validator;
  - class-transformer;
  - БД.

## Структура
```
users/
│
├── decorators/
│   ├── user.payload.decorator.ts
│   └── user.payload.decorator.md
│
├── dto/
│   ├── create.user.dto.ts
│   ├── create.user.dto.md
│   ├── update.user.dto.ts
│   └── update.user.dto.md
│
├── entities/
│   ├── phone.confirmation.entity.ts
│   ├── phone.confirmation.entity.md
│   ├── user.entity.ts
│   └── user.entity.md
│
├── enums/
│   ├── userRoles.enum.ts
│   └── userRoles.enum.md
│
├── interfaces/
│   ├── user.payload.interface.ts
│   └── user.payload.interface.md
│
├── users.controller.ts
├── users.module.ts
├── users.service.ts
├── users.module.md
├── users.service.md
├── users.service.md
└── README.md
```

## Ссылки на документацию

Ниже приведены ссылки на файлы, описывающие каждую часть модуля `users`.

### Декораторы
- [user.payload.decorator.md](users/decorators/user.payload.decorator.md) - декоратор, используемого для извлечения данных пользователя.

### DTO
- [create.user.dto.md](users/dto/create.user.dto.md) - DTO для создания пользователя.
- [update.user.dto.md](users/dto/update.user.dto.md) - DTO для обновления информации о пользователе.

### Модели
- [phone.confirmation.entity.md](users/entities/phone.confirmation.entity.md) - модель, используемая для подтверждения номера телефона.
- [user.entity.md](users/entities/user.entity.md) - модель пользователя.

### Перечисления
- [userRoles.enum.md](users/enums/userRoles.enum.md) - перечисление возможных ролей.

### Интерфейсы
- [user.payload.interface.md](users/interfaces/user.payload.interface.md) - интерфейс данных полезной нагрузки пользователя.

### Модуль и сервис
- [users.controller.md](users/users.controller.md) - контроллер для действий, связанных с пользователем.
- [users.module.md](users/users.module.md) - точка входа модуля `users`.
- [users.service.md](users/users.service.md) - сервис бизнес-логики, связанной с пользователем.
