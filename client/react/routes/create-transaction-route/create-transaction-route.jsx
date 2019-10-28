import React from "react";
import {TransApi} from "../../../api/common/trans-api";
import { customHistory } from "../routes";
import { MainLayout } from "../../layout/main-layout/main-layout";

export class CreateTransactionRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maNhanVien: "",
            maSach: "",
            nguoiMuon: "",
            ngayMuon: "",
            ngayTra:"",
            signature: "",
            created: false
        };
    }

    handleTransCreation = () => {
        let {maNhanVien,maSach,nguoiMuon,ngayMuon,ngayTra, signature} = this.state;
        TransApi.createTransaction({ maNhanVien, maSach, nguoiMuon, ngayMuon, ngayTra, signature }).then(({ newTran }) => {customHistory.push("/create-transaction"); this.setState({created: true})}).catch(err => console.log(err));
    }

    handleSign = () => {
        let { maNhanVien, maSach, nguoiMuon, ngayMuon, ngayTra } = this.state;
        TransApi.signTransaction({ maNhanVien, maSach, nguoiMuon, ngayMuon, ngayTra }).then(({ signature }) => {
            this.setState({ signature });
        })
    }

    render() {
        let { maNhanVien, maSach, nguoiMuon, ngayMuon, ngayTra, signature, created } = this.state;
        // console.log(this.state.sender);
        return (
            <MainLayout>
                <div className="create-transaction">
                    <label htmlFor="ma-nhan-vien">Nhap ma nhan vien:</label>
                    <input name="ma-nhan-vien" type="text" value={maNhanVien} onChange={e => { this.setState({ maNhanVien: e.target.value }); }}/> 

                    <label htmlFor="ma-sach">Nhap ma sach:</label>
                    <input name="ma-sach" type="text" value={maSach} onChange={e => { this.setState({ maSach: e.target.value }); }} />

                    <label htmlFor="nguoi-muon">Nhap nguoi muon sach:</label>
                    <input name="nguoi-muon" type="text" value={nguoiMuon} onChange={e => { this.setState({ nguoiMuon: e.target.value }); }} />

                    <label htmlFor="ngay-muon">Nhap ngay muon sach:</label>
                    <input name="nguoi-muon" type="date" value={ngayMuon} onChange={e => { this.setState({ ngayMuon: e.target.value.toString() }); }} />

                    <label htmlFor="ngay-tra">Nhap ngay tra sach:</label>
                    <input name="ngay-tra" type="date" value={ngayTra} onChange={e => { this.setState({ ngayTra: e.target.value.toString() }); }} />

                    <label htmlFor="signature">Signature</label>
                    <p className="signature">{signature}</p>
                    {signature?(
                        <button className="sign-part" onClick={() => this.setState({
                            maNhanVien: "",
                            maSach: "",
                            nguoiMuon: "",
                            ngayMuon: "",
                            ngayTra: "",
                            signature: "",
                            created: false})}>
                            Reset
                        </button>
                    ):(
                            <button className = "sign-part" onClick = {this.handleSign}>
                                Sign
                            </button>
                    )}
                    
                    <button className="create-part" onClick={this.handleTransCreation} disabled={!signature}>
                        Create
                    </button>
                    {created == true ? (<p className="end-text">Created!</p>) : (<p></p>)}
                
                    
                </div>
            </MainLayout>
        );
    }
}

export default CreateTransactionRoute;