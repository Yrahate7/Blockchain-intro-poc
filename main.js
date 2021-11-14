const sha256 = require('crypto-js/sha256');


class Block {

    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return sha256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash).toString();
    }
}


class BlockChain {

    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "14/11/2021", "HelloBlockchain", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let index = 1; index < this.chain.length; index++) {
            let currentBlock = this.chain[index];
            let previousBlock = this.chain[index - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }

        }
        return true;
    }

}


let bc = new BlockChain();

bc.addBlock(new Block(1, "15/11/2021", "Hello2",));
bc.addBlock(new Block(2, "16/11/2021", "Hello3",));

console.log("Chain is Valid? " + bc.isChainValid());
// tampering with the chain
bc.chain[1].data = 1234;
console.log("Chain is Valid? " + bc.isChainValid());



