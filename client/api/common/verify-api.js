import { offlineApi } from "../api";

export const VerifyApi = {
    verifySignature: data => offlineApi.post("/verify-transaction",data),
    verifyChain: data => offlineApi.post("/verify-blockchain", data)
}