import React from 'react';
import "./PieChart.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);


function PieChart({dataPie, tieuChi}) {

    console.log(dataPie);
    let data = null;   
    if (tieuChi === "Gender") {
        let sumNam = dataPie.nam?.quantity;
        let sumNu = dataPie.nu?.quantity;
        let sumKhac = dataPie.khac?.quantity;
        let total = sumNu + sumKhac + sumNam;
        data = {
            labels: [dataPie.nam?.name + `(${sumNam}/${total} người)`, dataPie.nu?.name + `(${sumNu}/${total} người)`, dataPie.khac?.name + `(${sumKhac}/${total} người)`],
            datasets: [
                {
                    label: '# of Votes',
                    data: [sumNam/total, sumNu/total, sumKhac/total],
                    backgroundColor: [
                        'rgba(255, 255, 0, 0.9)', // vàng
                        'rgba(0, 128, 0, 0.9)', // lục
                        'rgba(0, 0, 255, 0.9)', // lam
                    ],
                    borderColor: [
                        'rgba(0, 0, 0, 0.3)',
                    ],
                    borderWidth: 1,
                },
            ],
        };

    } else if (tieuChi === "Age") {
        let sumNhunhi = dataPie.nhunhi?.quantity; let sumAunhi = dataPie.aunhi?.quantity;
        let sumThieunhi = dataPie.thieunhi?.quantity; let sumVithanhnien = dataPie.vithanhnien?.quantity;
        let sumThanhnien = dataPie.thanhnien?.quantity; let sumTrungnien = dataPie.trungnien?.quantity;
        let sumCaotuoi = dataPie.caotuoi?.quantity; let total = sumNhunhi + sumAunhi + sumThieunhi + sumVithanhnien + sumThanhnien + sumTrungnien + sumCaotuoi;
        data = {
            labels: [dataPie.nhunhi?.name + `(${sumNhunhi}/${total} người)`, dataPie.aunhi?.name + `(${sumAunhi}/${total} người)`, 
                dataPie.thieunhi?.name + `(${sumThieunhi}/${total} người)`, dataPie.vithanhnien?.name + `(${sumVithanhnien}/${total} người)`,
                dataPie.thanhnien?.name + `(${sumThanhnien}/${total} người)`, dataPie.trungnien?.name + `(${sumTrungnien}/${total} người)`,
                dataPie.caotuoi?.name + `(${sumCaotuoi}/${total} người)`,
            ],
         
            datasets: [
                {
                    label: '# of Votes',
                    data: [sumNhunhi/total, sumAunhi/total, sumThieunhi/total, sumVithanhnien/total, sumThanhnien/total, sumTrungnien/total, sumCaotuoi/total],
                    backgroundColor: [
                        'rgba(255, 0, 0, 0.5)', // red
                        'rgba(255, 165, 0, 0.5)', // cam
                        'rgba(255, 255, 0, 0.5)', // vàng
                        'rgba(0, 128, 0, 0.5)', // lục
                        'rgba(0, 0, 255, 0.5)', // lam
                        'rgba(128, 128, 128, 0.5)', // chàm
                        'rgba(128, 0, 128, 0.5)', // tím
                    ],
                    borderColor: [
                        'rgba(0, 0, 0, 0.5)', // đen
                    ],
                    borderWidth: 1,
                },
            ],
        };
    } else if (tieuChi === "Education") {
        let nhatre = dataPie.nhatre?.quantity; let tieuhoc = dataPie.tieuhoc?.quantity;
        let coso = dataPie.coso?.quantity; let phothong = dataPie.phothong?.quantity;
        let caodang = dataPie.caodang?.quantity; let trungcap = dataPie.trungcap?.quantity;
        let daihoc = dataPie.daihoc?.quantity; let thacsi = dataPie.thacsi?.quantity; 
        let tiensi = dataPie.tiensi?.quantity; let khac = dataPie.khac?.quantity; 
        let total = nhatre + tieuhoc + coso + phothong + trungcap + caodang + daihoc + thacsi + tiensi + khac;
        data = {
            labels: [
                (dataPie.nhatre?.name + `(${nhatre}/${total} người)`), (dataPie.tieuhoc?.name + `(${tieuhoc}/${total} người)`),
                (dataPie.coso?.name + `(${coso}/${total} người)`),(dataPie.phothong?.name + `(${phothong}/${total} người)`),
                (dataPie.trungcap?.name + `(${trungcap}/${total} người)`), caodang > 0 && (dataPie.caodang?.name + `(${caodang}/${total} người)`),
                (dataPie.daihoc?.name + `(${daihoc}/${total} người)`), (dataPie.thacsi?.name + `(${thacsi}/${total} người)`),
                (dataPie.tiensi?.name + `(${tiensi}/${total} người)`), (dataPie.khac?.name + `(${khac}/${total} người)`),
            ],
         
            datasets: [
                {
                    label: '# of Votes',
                    data: [nhatre/total, tieuhoc/total, coso/total, phothong/total, trungcap/total, caodang/total, daihoc/total, thacsi/total, tiensi/total, khac/total],
                    backgroundColor: [
                        'rgba(255, 0, 0, 0.5)', // red
                        'rgba(255, 165, 0, 0.5)', // cam
                        'rgba(255, 255, 0, 0.5)', // vàng
                        'rgba(0, 128, 0, 0.5)', // lục
                        'rgba(0, 0, 255, 0.5)', // lam
                        'rgba(128, 128, 128, 0.5)', // chàm
                        'rgba(128, 0, 128, 0.5)', // tím
                        'rgba(128, 12, 12, 0.5)', // red đậm
                        'rgba(128, 83, 20, 0.5)', // cam đậm
                        'rgba(30, 214, 30, 0.5)', // xanh lá cây nhạt
                    ],
                    borderColor: [
                        'rgba(0, 0, 0, 0.5)', // đen
                    ],
                    borderWidth: 1,
                },
            ],
        };
    } else if (tieuChi === "Nation") {
        let kinh = dataPie.kinh?.quantity; let tay = dataPie.tay?.quantity;
        let thai = dataPie.thai?.quantity; let mong = dataPie.mong?.quantity;
        let hoa = dataPie.hoa?.quantity; let khmer = dataPie.khmer?.quantity;
        let nung = dataPie.nung?.quantity; let muong = dataPie.muong?.quantity; 
        let dao = dataPie.dao?.quantity; let cham = dataPie.cham?.quantity; 
        let khac = dataPie.khac?.quantity; 
        let total = kinh + tay + thai + mong + hoa + khmer + nung + muong + dao + cham + khac;
        data = {
            labels: [
                (dataPie.kinh?.name + `(${kinh}/${total} người)`), (dataPie.tay?.name + `(${tay}/${total} người)`),
                (dataPie.thai?.name + `(${thai}/${total} người)`),(dataPie.mong?.name + `(${mong}/${total} người)`),
                (dataPie.hoa?.name + `(${hoa}/${total} người)`), (dataPie.khmer?.name + `(${khmer}/${total} người)`),
                (dataPie.nung?.name + `(${nung}/${total} người)`), (dataPie.muong?.name + `(${muong}/${total} người)`),
                (dataPie.dao?.name + `(${dao}/${total} người)`), (dataPie.cham?.name + `(${cham}/${total} người)`),
                (dataPie.khac?.name + `(${khac}/${total} người)`),
            ],
         
            datasets: [
                {
                    label: '# of Votes',
                    data: [kinh/total, tay/total, thai/total, mong/total, hoa/total, khmer/total, nung/total, muong/total, dao/total, cham/total, khac/total],
                    backgroundColor: [
                        'rgba(255, 0, 0, 0.5)', // red
                        'rgba(255, 165, 20, 0.9)', // cam
                        'rgba(255, 255, 0, 0.5)', // vàng
                        'rgba(0, 128, 0, 0.5)', // lục
                        'rgba(0, 0, 255, 0.5)', // lam
                        'rgba(128, 128, 128, 0.5)', // chàm
                        'rgba(128, 0, 128, 0.5)', // tím
                        'rgba(128, 12, 12, 0.5)', // red đậm
                        'rgba(128, 83, 20, 0.5)', // cam đậm
                        'rgba(30, 214, 30, 0.5)', // xanh lá cây nhạt
                        'rgba(30, 30, 30, 0.5)', // xanh lá cây nhạt
                    ],
                    borderColor: [
                        'rgba(0, 0, 0, 0.5)', // đen
                    ],
                    borderWidth: 1,
                },
            ],
        };
    } else if (tieuChi === "Religion") {
        let khong = dataPie.khong?.quantity; let phat = dataPie.phat?.quantity;
        let dao = dataPie.dao?.quantity; let ando = dataPie.ando?.quantity;
        let kito = dataPie.kito?.quantity; let hoi = dataPie.hoi?.quantity;
        let nho = dataPie.nho?.quantity; let khac = dataPie.khac?.quantity; 
        let total = khong + phat + dao + ando + kito + hoi + nho + khac;
        data = {
            labels: [
                (dataPie.khong?.name + `(${khong}/${total} người)`), (dataPie.phat?.name + `(${phat}/${total} người)`),
                (dataPie.dao?.name + `(${dao}/${total} người)`),(dataPie.ando?.name + `(${ando}/${total} người)`),
                (dataPie.kito?.name + `(${kito}/${total} người)`), (dataPie.hoi?.name + `(${hoi}/${total} người)`),
                (dataPie.nho?.name + `(${nho}/${total} người)`), (dataPie.khac?.name + `(${khac}/${total} người)`),
            ],
         
            datasets: [
                {
                    label: '# of Votes',
                    data: [khong/total, phat/total, dao/total, ando/total, kito/total, hoi/total, nho/total, khac/total],
                    backgroundColor: [
                        'rgba(255, 0, 0, 0.5)', // red
                        'rgba(255, 165, 20, 0.9)', // cam
                        'rgba(255, 255, 0, 0.5)', // vàng
                        'rgba(0, 128, 0, 0.5)', // lục
                        'rgba(0, 0, 255, 0.5)', // lam
                        'rgba(128, 128, 128, 0.5)', // chàm
                        'rgba(128, 0, 128, 0.5)', // tím
                        'rgba(128, 12, 12, 0.5)', // red đậm
                    ],
                    borderColor: [
                        'rgba(0, 0, 0, 0.5)', // đen
                    ],
                    borderWidth: 1,
                },
            ],
        };
    } else if (tieuChi === "Job") {
        let hangkhong = dataPie.hangkhong?.quantity; let kinhdoanh = dataPie.kinhdoanh?.quantity;
        let phapluat = dataPie.phapluat?.quantity; let nghethuat = dataPie.nghethuat?.quantity;
        let truyenthong = dataPie.truyenthong?.quantity; let nganhy = dataPie.nganhy?.quantity;
        let chamsoc = dataPie.chamsoc?.quantity; let giaoduc = dataPie.giaoduc?.quantity; 
        let congnghe = dataPie.congnghe?.quantity; let lamthue = dataPie.lamthue?.quantity;
        let hocsinh = dataPie.hocsinh?.quantity; let khoahoc = dataPie.khoahoc?.quantity; 
        let thatnghiep = dataPie.thatnghiep?.quantity; let lamnong = dataPie.lamnong?.quantity;
        let khac = dataPie.khac?.quantity; 
        let total = hangkhong + kinhdoanh + phapluat + nghethuat + truyenthong + nganhy + chamsoc + giaoduc + congnghe + lamthue 
            + hocsinh + khoahoc + thatnghiep + lamnong + khac;
        data = {
            labels: [
                (dataPie.hangkhong?.name + `(${hangkhong}/${total} người)`), (dataPie.kinhdoanh?.name + `(${kinhdoanh}/${total} người)`),
                (dataPie.phapluat?.name + `(${phapluat}/${total} người)`),(dataPie.nghethuat?.name + `(${nghethuat}/${total} người)`),
                (dataPie.truyenthong?.name + `(${truyenthong}/${total} người)`), (dataPie.nganhy?.name + `(${nganhy}/${total} người)`),
                (dataPie.chamsoc?.name + `(${chamsoc}/${total} người)`), (dataPie.giaoduc?.name + `(${giaoduc}/${total} người)`),
                (dataPie.congnghe?.name + `(${congnghe}/${total} người)`), (dataPie.lamthue?.name + `(${lamthue}/${total} người)`),
                (dataPie.hocsinh?.name + `(${hocsinh}/${total} người)`), (dataPie.khoahoc?.name + `(${khoahoc}/${total} người)`),
                (dataPie.thatnghiep?.name + `(${thatnghiep}/${total} người)`), (dataPie.lamnong?.name + `(${lamnong}/${total} người)`),
                (dataPie.khac?.name + `(${khac}/${total} người)`),
            ],
         
            datasets: [
                {
                    label: '# of Votes',
                    data: [hangkhong/total, kinhdoanh/total, phapluat/total, nghethuat/total, truyenthong/total, nganhy/total, chamsoc/total, giaoduc/total, 
                        congnghe/total, lamthue/total, hocsinh/total, khoahoc/total, thatnghiep/total, lamnong/total, khac/total,],
                    backgroundColor: [
                        'rgba(255, 0, 0, 0.9)', // red
                        'rgba(255, 165, 20, 0.9)', // cam
                        'rgba(255, 255, 0, 0.9)', // vàng
                        'rgba(0, 128, 0, 0.9)', // lục
                        'rgba(0, 0, 255, 0.9)', // lam
                        'rgba(128, 128, 128, 0.9)', // chàm
                        'rgba(128, 0, 128, 0.9)', // tím
                        'rgba(128, 12, 12, 0.9)', // red đậm
                        'rgba(255, 20, 20, 0.9)', // cam
                        'rgba(100, 255, 0, 0.9)', // vàng
                        'rgba(100, 128, 0, 0.9)', // lục
                        'rgba(100, 0, 255, 0.9)', // lam
                        'rgba(128, 0, 28, 0.9)', // chàm
                        'rgba(0, 0, 128, 0.9)', // tím
                        'rgba(0, 12, 12, 0.9)', // red đậm
                    ],
                    borderColor: [
                        'rgba(0, 0, 0, 0.5)', // đen
                    ],
                    borderWidth: 1,
                },
            ],
        };
    }


    return (
        <div className="pieChart">
            {data && <Pie data={data && data} />}
        </div>
    )
}

export default PieChart;
