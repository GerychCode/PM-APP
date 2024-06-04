FIX: в DTO мы проверяем существование проекта, но это делается и в guard permission, придумать что с этим сделать, при том что одминам эта проверка нужна (скорее всего)
FIX: Оптимизировать DTo, создать base для взях fk а после обьеденять
FIX: Переписать Get project

export class UpdateCatDto extends IntersectionType(
CreateCatDto,
AdditionalCatInfo,
) {}

Fix: Перепистаь валибацию через Dto, для общей валидации
args: {
targetName: 'CreateCommentsDto',
property: 'parentId',
object: CreateCommentsDto {
projectId: 0,
employeeId: 0,
taskId: 0,
text: 'string',
parentId: 0
},
value: 0,
constraints: [ { model: 'TasksComments', property: 'id' } ]
}


По умолчанию все эти поля являются обязательными. Чтобы создать тип с теми же полями, но с каждым из них необязательным, используйте PartialType()передачу ссылки на класс ( CreateCatDto) в качестве аргумента:
export class UpdateCatDto extends PartialType(CreateCatDto) {}

Fix: переписать createProject и апдейт, а именно проверку совпадения title, без использования ownerid 
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
