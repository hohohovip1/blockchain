import { offlineApi } from "../api";
export const BlockchainApi = {
    getBlockchainInfo: () => {
        return offlineApi.get("/blockchain/info")
    },
addBlock: (data) => offlineApi.post("/blockchain/add-block", data)
}