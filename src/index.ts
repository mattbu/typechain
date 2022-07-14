/* 타입스크립트로 만들어지지 않은 패키지를 받았는데, 타입 정의가 없을 때 DefinitelyTyped 레포에서 찾아 어떤 패키지 인지 확인 후
'https://github.com/DefinitelyTyped/DefinitelyTyped'
'yarn add --dev @type/패키지명' 으로 설치
*/
import crypto from 'crypto'

interface BlockShape {
    hash: string
    prevHash: string
    height: number
    data: string
}

// 블록의 hash 값은 prevHash, height, data 값을 이용해 계산된다.
// 해쉬는 블록의 고유 서명과 같은 것, 결정론적이다 (어떤 입력값의 해쉬는 언제나 같은 결과값이 나옴), 데이터가 변하지 않으면 해쉬값도 변하지 않음,
// 해쉬 값 만들기는 node js의 crypto를 이용
class Block implements BlockShape {
    public hash: string
    constructor(
        public prevHash: string,
        public height: number,
        public data: string,
    ) {
        this.hash = Block.calculateHash(prevHash, height, data)
    }
    static calculateHash(prevHash: string, height: number, data: string) {
        const toHash = `${prevHash}${height}${data}`
        return crypto.createHash('sha256').update(toHash).digest('hex')
    }
} 

class BlockChain {
    private blocks: Block[]
    constructor() {
        this.blocks = []
    }
    private getPrevHash() {
        if (this.blocks.length === 0) return ''
        return this.blocks[this.blocks.length - 1].hash
    }
    public addBlock(data: string) {
        const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data)
        this.blocks.push(newBlock)
    }
    public getBlocks() {
        return [...this.blocks]
    }
}

const blockchain = new BlockChain();

blockchain.addBlock('first one')
blockchain.addBlock('second one')
blockchain.addBlock('third one')
blockchain.addBlock('fourth one')

blockchain.getBlocks().push(new Block('xxxx', 123123, 'hacked'))

console.log(blockchain.getBlocks());
