import React from "react";
import "../../css/public/latters/SuratTidakMampu.css";
import "../../css/admin/detail/detail-surat-domisili.css";
import logoLurah from "../../public/img/logo-remove.png";

function KopSuratBuktiPendaftaran() {
  return (
    <div>
      <table className="kop-surat">
        <tbody>
          <tr>
            <td
              style={{
                width: "5px",
              }}
            >
              <img
                src={logoLurah}
                alt="logo"
                style={{
                  width: "55px",
                  marginBottom: "0px",
                  marginLeft: "0px",
                }}
              />
              <p
                style={{
                  width: "170px",
                  textAlign: "left",
                  paddingBottom: "0",
                  marginBottom: "6px",
                }}
              >
                <span className="test">JL Gunung Salju. Amban</span>
              </p>
            </td>
            <td
              className="tengah"
              style={{
                marginRight: "190px",
                marginLeft: "0px",
              }}
            >
              <span>
                <b>
                  <h5 style={{ marginRight: "120px" }}>
                    PEMERINTAH KABUPATEN MANOKWARI
                  </h5>
                  <h5 style={{ marginRight: "120px" }}>
                    DISTRIK MANOKWARI BARAT
                  </h5>
                  <h5 style={{ marginRight: "120px" }}>KELURAHAN AMBAN</h5>
                </b>
              </span>
              <p
                style={{
                  padding: "0px",
                  textAlign: "right",
                  marginBottom: "0",
                  marginRight: "12px",
                }}
              >
                <span className="test">Kode : Pos 19314</span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default KopSuratBuktiPendaftaran;
