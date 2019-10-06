import { offlineApi } from "../api";

export const TransApi = {
    getTransaction: (data) => offlineApi.get("/transactions"),
    createTransaction: (data) => {
        console.log(data);
        return offlineApi.post("/transactions", data);
    },
    signTransaction: (data) => offlineApi.post("/sign-transaction", data)
}