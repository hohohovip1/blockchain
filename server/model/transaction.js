const sha256 = require ("crypto-js/sha256");
class Transaction {
    constructor(data){
        let {
            maNhanVien,
            maSach,
            nguoiMuon,
            ngayMuon,
            ngayTra,
            signature
        } = data;
        this.maNhanVien = maNhanVien;
        this.maSach = maSach;
        this.nguoiMuon = nguoiMuon;
        this.ngayMuon = ngayMuon;
        this.ngayTra = ngayTra;
        this.signature = signature;
        this.timeStamp = Date.now();
        this.hash = sha256(maNhanVien + maSach + nguoiMuon + this.timeStamp + signature).toString();
    }

    getTransaction() {
        return {
            maNhanVien: this.maNhanVien,
            maSach: this.maSach,
            nguoiMuon: this.nguoiMuon,
            ngayMuon: this.ngayMuon,
            ngayTra: this.ngayTra,
            signature: this.signature,
            timeStamp: this.timeStamp,
            hash: this.hash
        };
    };

    getHash() {
        return{hash};
    }
}
module.exports = Transaction;