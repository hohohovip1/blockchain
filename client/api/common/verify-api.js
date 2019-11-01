import { offlineApi } from "../api";

export const VerifyApi = {
    verifySignature: data => offlineApi.post("/verify-transaction",data),
    verifyChain: data => offlineApi.post("/verify-blockchain", data),
    verifySignatureChain: data => offlineApi.post("/verify-signature-chain",data),
    verifySignImg: data => offlineApi.post("/verify-sign-img", data)
}