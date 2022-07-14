# Typescript Basic

## 새로운 프로젝트에 타입스크립트 설치 방법

+ 우선 새 폴더를 만들어 package.json을 생성해 줍니다.
```
# yarn으로 진행 하겠습니다.
yarn init -y
```
+ main을 지우고, scripts를 만들어 줍니다.
```javascript
// package.json
{
  "name": "typechain",
  "version": "1.0.0",
  "scripts": {
    
  },
  "license": "MIT"
}
```

+ typescript를 devDependencies로 설치해 줍니다.

`yarn add typescript --dev`

+ 루트 디렉토리에 tsconfig.json 그리고 src/index.ts 파일을 만들어 줍니다.

```javascript
{
    "include": ["src"], // 자바스크립트로 컴파일 하고 싶은 디렉토리나 파일
    "compilerOptions": {
        "outDir": "build", // 컴파일된 자바스크립트 파일이 생성될 디렉토리를 지정
        "target": "ES6", // 어떤 버전의 자바스크립트로 컴파일 할 지 설정
        "lib": ["ES6", "DOM"], // 자바스크립트의 어떤 버전이 어떤 환경에서 사용 될 지 설정
        "strict": true, // 엄격 모드
        "allowJs": true, // 자바스크립트 허용
    }
}
```

+ 컴파일과 실행을 한 번에 하기 위해 ts-node를 설치해줍니다.

`yarn add ts-node --dev`

> ts-node index.ts를 입력하면 자동으로 ts파일을 js파일로 컴파일 + 컴파일된 js파일을 실행 시켜줍니다.

+ 서버 코드를 변경 할때마다, 재시작하는 것을 자동으로 해주게 하기 위해 nodemon을 설치해줍니다.

`yarn add nodemon`

+ tsconfig.json 파일에 스크립트 커맨드를 추가해주겠습니다.

```javascript
// tsconfig.json
{
    "scripts": {
    "build": "tsc", // ts를 js로 컴파일 합니다.
    "dev": "nodemon --exec ts-node src/index.ts", // src/index.ts가 변경 될 때마다 재실행 됩니다.
    "start": "node build/index"
  },
}
```

## JS에 TS 적용하기

자바스크립트 파일에 `@ts-check`을 주석으로 추가하고 `tsconfig.json`에서 `"allowJs": true`로 설정해주면 타입 체크가 가능해집니다.

JSDoc 주석으로 JS 파일에 타입 정보를 제공할 수 있습니다.

```javascript
// @ts-check
/**
 * 예시1
 * @param {object} config 
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns {boolean}
 */

export function init(config) {
    return true;
}

/**
 * 예시2
 * @param {number} code 
 * @returns {number}
 */

export function exit(code) {
    /** @type {number} */ // 변수의 타입 지정하기
    let num = 1
    return code + num;
}
```

## Type Aliases (타입 별칭)

타입 별칭은 특정 타입이나 인터페이스를 참조할 수 있는 타입 변수를 의미합니다.

예를들면 아래와 같이 객체의 타입을 지정하기 위해 객체 속성들에 대한 타입을 개별적으로 지정 할 수 있습니다.

```javascript
const person: {
    name: string,
    age: number
} = {
    name:'홍길동',
    age: 20
}
```
만약 같은 타입을 가진 객체를 여러개 만들 경우가 생긴다면, 코드도 길어지고 비효율적일 것 입니다.
따라서 타입 별칭으로 만들어 객체 타입을 지정해주면 재사용 할 수 있다는 장점이 있습니다.

자바스크립트에서 변수를 선언 할때 처럼 type 키워드를 쓰면 된니다.

타입 별칭명은 자바스크립트의 변수명과 차별을 두기 위해 대문자로 시작하는게 관례라고 합니다.

위의 예시를 고쳐보면 아래와 같습니다.

```javascript
type Person = {
    name: Name,
    age?: Age
}

const person: Person = {
    name:'홍길동',
    age: 20
}
```

string, number와 같이 간단한 타입에도 타입 별칭을 부여할 수 있습니다.

```typescript
// string 타입
const name: string = '홍길동'

type Name = string
const name: Name = '홍길동'

// number 타입
const age: number = 20

type Age = number
const age: Age = 20
```

타입 별칭은 타입의 특정 값을 사용 할 수도 있습니다. (타입이 특정 값을 갖도록)
```typescript
type Team = 'read' | 'blue' | 'yellow'

type Player = {
    nickname: string,
    team: Team
}

const a: Player = {
    nickname: 'aaa',
    team: 'blue'
}
```

## Class (클래스)

보통 자바스크립트에서는 constructor(생성자) 함수를 만들고 그 안에 class 객체의 초기 값을 설정해줍니다.
```javascript
// JS
class Player {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
```
타입스크립트에서는 constructor에 파라미터들을 보내면 타입스크립트가 알아서 constructor 함수를 만들어줍니다.
```typescript
// TS
class Player {
    constructor(
        private firstName: string,
        private lastName: string,
    ) {}
}
```
이 코드를 자바스크립트로 컴파일되면 위의 코드가 됩니다.

또한 타입스크립트에서는 private, public 프로퍼티, 메소드를 만들 수 있습니다. (오직 TS에서만)

### Abstract Classes (추상 클래스)
추상 클래스는 다른 클래스가 상속 받을 수 있는 클래스이며 직접 새로운 인스턴스를 만들 수 없습니다.
추상 클래스를 정의 할 때는 class 앞에 abstract를 붙여주면 됩니다.

```typescript
abstract class User {
    constructor(
        private firstName: string,
        private lastName: string,
        public nickName: string,
    ) {}
    getFullName() {
        return `${this.firstName} ${this.lastName}`
    }
}
```

+ #### Absctract Methods (추상 메소드)
추상 클래스 안에는 추상 메소드를 만들 수 있습니다.
추상 메소드는 정의만 있을 뿐 함수의 body가 구현되어 있지 않습니다. -> 메소드의 호출 시그니쳐를 작성.
body는 추상 클래스를 상속하는 클래스에서 해당 추상 메소드를 필수로 구현해야 합니다.

+ 예를들어 위의 User 추상 클래스에 nickname을 얻을 수 있는 추상 메소드 getNickName을 추가하고,
+ User 추상 클래스를 Player 클래스에 상속 시켜보겠습니다.
```typescript
abstract class User {
    constructor(
        private firstName: string,
        private lastName: string,
        private nickName: string,
    ) {}
    getFullName() {
        return `${this.firstName} ${this.lastName}`
    }
    abstract getNickName(): void
}

class Player extends User {

}
```
+ 상속한 클래스에서 추상 메소드를 구현하지 않아서 아래와 같은 메시지를 보여줍니다.

```Non-abstract class 'Player' does not implement inherited abstract member 'getNickName' from class 'User'.```

+ 이를 해결하기 위해 Player 클래스에 getNickName을 구현 시켜줍니다.

```typescript
class Player extends User {
    getNickName() {
        //...
    }
}
```
+ 하지만 nickName이 private하기 때문에 nickName에 접근할 수 없습니다. (오직 User 클래스 안에서만 사용 가능.)
nickName에 접근 가능하도록 하려면 private을 protected로 바꿔줍니다.
(필드가 외부로부터는 보호되지만 다른 자식 클래스에서 사용되기를 원한다면 private 대신 protected로)
```typescript
// class Player
 getNickName() {
    console.log(this.nickName) // Property 'nickName' is private and only accessible within class 'User'.
 }
 
// class User 
 constructor(
    private firstName: string,
    private lastName: string,
    protected nickName: string,
 ) {}
```
+ #### readonly
클래스 속성에 readonly 키워드를 사용하면 프로퍼티가 public이어도 수정을 못하게끔 할 수 있습니다.

```typescript
class Word {
    constructor(
        public term: string,
        public def: string
    ) {}
}

const kimchi = new Word('김치', '한국음식')
kimchi.term = '된장찌개' // term 프로퍼티가 public이기 때문에 이런식을 수정이 가능합니다.
```
+ 수정이 안되고 접근만 가능하도록 하려면 readonly 키워드를 붙여주면 됩니다.
```typescript
// class Word
class Word {
    constructor(
        readonly public term: string,
        readonly public def: string
    ) {}
}
```
+ #### static property & methods
클래스를 통해 인스턴스를 생성할 필요 없이 클래스의 속성 또는 메소드를 사용하고자 할때 static 키워드를 붙여주면 됩니다.

```typescript
// class Word
class Word {
    constructor(
        readonly public term: string,
        readonly public def: string
    ) {}
    hello() {
        console.log('hello')
    }
}

// 인스턴스 생성 없이 hello 메소드 호출이 가능합니다.
Word.hello() // 'hello'
```

### Interface (인터페이스)
인터페이스는 오브젝트나 클래스의 모양을 특정해주기 위해 사용합니다.

타입스크립트에게 오브젝트의 모양을 알려주는 방법에는 두가지가 있습니다.


```typescript
// 1. 타입 별칭
type Player = {
    nickname: string,
    team: string,
    hp: number
}

// 2. 인터페이스
interface Player {
    nickname: string,
    team: string,
    hp: number
}
```
+ 클래스처럼 인터페이스도 extends 키워드를 사용해 인터페이스를 확장 할 수 있습니다.

```typescript
interface User {
    name: string
}

interface Player extends User {}

const bu: Player = {
    name: 'hu'
}

// type을 쓴다면 이렇게, 인터페이스 확장과 동일하게 작동합니다.
type User = {
    name: string
}

type Player = User & {}

const bu: Player = {
    name: 'hu'
}
```

+ 인터페이스에도 readonly 속성을 만들 수 있습니다.
```typescript
interface User {
    readonly name: string
}

let user: User = 'kim'
user.name = 'park' // 에러!
```

+ interface는 type과 다르게 선언적 확장이 가능합니다.

```typescript
interface User {
    name: string
}

interface User {
    lasName: string
}

interface User {
    hp: 100
}
// 같은 interface명으로 User를 만들면, 자동으로 확장이 됩니다.
const bu: User = {
    name: 'h',
    lasName: 'b',
    hp: 100
} 
```
+ interface는 가볍습니다. 인터페이스는 ts에만 존재해, js로 컴파일하면 js로 바뀌지 않고 사라집니다. 클래스와 달리 정의만 할 뿐 실제로 구현되지 않습니다.

예를들어 클래스가 어떤 프로퍼티나 메소드들을 갖도록 표준화된 모양을 만들고 싶을 때 추상 클래스를 사용합니다.
추상 클래스에서 프로퍼티와 메소드를 정의하고 그 추상 클래스를 상속하는 클래스를 만들 수 있습니다.

```typescript
// 추상 클래스 User
abstract class User {
    constructor(
        protected firstName: string,
        protected lastName: string
    ) {}
    abstract sayHi(name: string): string
    abstract fullName(): string 
}
// 추상 클래스 User를 상속하는 클래스 Player
class Player extends User {
    fullName() {
        return `${this.firstName} ${this.lastName}`
    }
    sayHi(name: string) {
        return `Hello ${name}. My name is ${this.fullName()}`
    }
}
```

이것을 컴파일 하게 되면 아래와 같이 컴파일 되는데,

```javascript
// js로 컴파일 후
class User {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

class Player extends User {
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    sayHi(name) {
        return `Hello ${name}. My name is ${this.fullName()}`;
    }
}
```
User 클래스는 다른 클래스가 표준화된 모양만 갖게할 뿐 직접적으로 사용하지는 않기 때문에 컴파일된 js에서 User 클래스는 불필요합니다. (User를 직접적으로 만들지도, 사용하지도 않기 때문)
그렇기 때문에 추상 클래스 대신 실제로 구현되지 않는 인터페이스로 바꿔 줄 수 있습니다.

```typescript
interface User {
    firstName: string,
    lastName: string
    sayHi(name: string): string
    fullName(): string 
}

class Player implements User {  // implements 키워드로 User 인터페이스를 상속 할 수 있습니다.
   constructor(
       public firstName: string, // 인터페이스를 상속 할 때에는 프로퍼티를 private, protected로 만들 수 없습니다.
       public lastName: string,
   ) {}
    fullName() {
        return `${this.firstName} ${this.lastName}`
    }
    sayHi(name: string) {
        return `Hello ${name}. My name is ${this.fullName()}`
    }
}
```
위의 코드를 js로 컴파일하게 되면 자바스크립트에는 추상클래스와 implements가 없기 때문에 추상 클래스를 사용하는 것보다 훨씬 가벼워진 것을 알 수 있습니다.

```javascript
class Player {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    sayHi(name) {
        return `Hello ${name}. My name is ${this.fullName()}`;
    }
}
```

한 클래스에서 하나 이상의 인터페이스를 동시에 상속 할 수도 있습니다.

```typescript
interface User {
    firstName: string,
    lastName: string
    sayHi(name: string): string
    fullName(): string 
}

interface Human {
    health: number
}

class Player implements User, Human { // ,를 붙여주면 동시에 상속합니다.
   constructor(
       public firstName: string,
       public lastName: string,
       public health: number
   ) {}
    fullName() {
        return `${this.firstName} ${this.lastName}`
    }
    sayHi(name: string) {
        return `Hello ${name}. My name is ${this.fullName()}`
    }
}
```

+ 타입으로 인터페이스를 사용할 수도 있습니다.

```typescript
function makePlayer(user: User): User { // 위의 User 인터페이스를 사용, 인터페이스를 파라미터에 설정할 수도 있고, 리턴 할 수도 있습니다.
    return {
        firstName: 'hu',
        lastName: 'bu',
        fullName: () => 'fullname',
        sayHi: (name) => name
    }
}

makePlayer({
    firstName: 'hu',
    lastName: 'bu',
    fullName: () => 'fullname',
    sayHi: (name) => name
})
```

> ⚠️ 인터페이스를 리턴하게 된다면 인터페이스에 정의된 내용을 리턴하면 되는데, 클래스를 리턴하게 된다면 new 클래스명으로 리턴 해줍니다!
```
