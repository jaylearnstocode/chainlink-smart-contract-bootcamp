// script 11

// 如何安全的放置私钥, Deploy4.js中使用了这种私钥处理方法，Deploy1,2,3没用


const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main(){

    // 连接wallet
    const wallet  = new ethers.Wallet(process.env.PRIVATE_KEY);

    // 为wallet加密，然后把加密的 private_key 保存在 encryptedJsonKey
    // 加密算法 x(密码，私钥) -> encryptedJsonKey
    const encryptedJsonKey = await wallet.encrypt(process.env.PRIVATE_KEY_PASSWORD, process.env.PRIVATE_KEY);

    // 打印加密好的私钥
    console.log(encryptedJsonKey);

    // 创建encryptedKey.json文件，并将加密好的私钥存放到 encryptedKey.json 文件中
    fs.writeFileSync("encryptedKey.json", encryptedJsonKey);

    // 生成好加密的私钥后，去.env中把 PRIVATE_KEY_PASSWORD 和 PRIVATE_KEY 删了，自己记在本子上

    // 去.gitignore，放入“.encryptedKey.json"

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })