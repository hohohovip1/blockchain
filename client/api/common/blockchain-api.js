import { offlineApi } from "../api";
export const BlockchainApi = {
    getBlockchainInfo: () => {
        return offlineApi.get("/blockchain/info")
    },
    addBlock: (data) => offlineApi.post("/blockchain/add-block", data),
    verifyChain: data => offlineApi.post("/verify-blockchain", data),
    signHashChain: data => offlineApi.post("/sign-hash-chain",data),
    signHashImg: data => offlineApi.post("/sign-hash-img", data)
}