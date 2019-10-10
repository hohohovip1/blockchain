import { offlineApi } from "../api";
export const BlockchainApi = {
addBlock: (data) => offlineApi.post("/blockchain/add-block", data)
}