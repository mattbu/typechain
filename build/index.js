"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// // 블록의 hash 값은 prevHash, height, data 값을 이용해 계산된다.
// // 해쉬는 블록의 고유 서명과 같은 것, 결정론적이다 (어떤 입력값의 해쉬는 언제나 같은 결과값이 나옴), 데이터가 변하지 않으면 해쉬값도 변하지 않음,
// // 해쉬 값 만들기는 node js의 crypto를 이용
// class Block implements BlockShape {
//     public hash: string
//     constructor(
//         public prevHsah: string,
//         public height: number,
//         public data: string,
//     ) {
//         this.hash = Block.calculateHash(prevHsah, height, data)
//     }
//     static calculateHash(prevHash: string, height: number, data: string) {
//         const toHash = `${prevHash}${height}${data}`
//     }
// }
