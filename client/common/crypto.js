import elliptic from "elliptic";
const ec = new elliptic.ec("secp256k1");
import SHA256 from "crypto-js/sha256";

export const calculateHash = ({data, nonce, difficulty}) => {
    let timeStamp = Date.now();
    return SHA256(data.map(each => each.hash).concat([nonce, timeStamp, difficulty]).join(" ")).toString();
}