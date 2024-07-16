import React, { useEffect, useState } from "react";
import "../../../css/public/latters/SuratTidakMampu.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
import "../../../css/admin/detail/detail-surat-domisili.css";
import KopSuratBuktiPendaftaran from "../../../components/public/KopSuratBuktiPendaftaran";

function BuktiBeasiswaUnipa() {
  const [data, setData] = useState(null);
  const { hashed_id } = useParams(); // Menggunakan hashed_id sebagai parameter

  useEffect(() => {
    fetchData();
  }, [hashed_id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://website.fahri.life/api/lihat-surat-beasiswa/${hashed_id}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching surat domisili data:", error);
    }
  };
  const generateSuratPDFK = async (skck) => {
    const element = document.getElementById("my-content");

    // Konfigurasi untuk format A4
    const options = {
      margin: 10,
      filename: `${data.nama} ${data.id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Mengonversi elemen HTML menjadi PDF dengan opsi konfigurasi
    const pdf = await html2pdf(element, options);

    // Menyimpan file PDF
    pdf.save();
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  return (
    <div className="back">
      <div className="container">
        <div className="card">
          <div className="kopsurat" id="my-content">
            <KopSuratBuktiPendaftaran />
            <div
              style={{
                border: "0.5px solid black",
                padding: "20px",
              }}
            >
              <div className="nomor">
                {/* Bagian setelah garis hitam */}
                <div className="h6-p-container">
                  <h6
                    className="test"
                    style={{
                      marginBottom: "0",
                      marginLeft: "60px",
                      fontFamily: "Times New Roman",
                    }}
                  >
                    BUKTI PENDAFTARAN LAYANAN ONLINE
                  </h6>
                </div>
              </div>
              <p className="test" style={{ marginBottom: "0" }}>
                Warga Yth,
              </p>
              <p className="test">
                Terima kasih telah mengunakan layanan kami data pendaftaran
                anda:
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "50px",
                  fontFamily: "Times New Roman",
                }}
              >
                <div style={{ display: "flex", marginBottom: "5px" }}>
                  <span className="test" style={{ flex: "0 0 150px" }}>
                    No Pendaftaran
                  </span>
                  <span className="test">: {data.nomor_surat}</span>{" "}
                </div>
                <div style={{ display: "flex", marginBottom: "5px" }}>
                  <span className="test" style={{ flex: "0 0 150px" }}>
                    Tanggal
                  </span>
                  <span className="test">: {formatDate(data.tanggal)}</span>
                </div>
                <div style={{ display: "flex", marginBottom: "5px" }}>
                  <span
                    className="test"
                    style={{ color: "#000000", flex: "0 0 150px" }}
                  >
                    Nama
                  </span>
                  <span style={{ color: "#000000" }} className="test">
                    : {data.nama_anak}
                  </span>
                </div>
                <div style={{ display: "flex", marginBottom: "5px" }}>
                  <span
                    className="test"
                    style={{ color: "#000000", flex: "0 0 150px" }}
                  >
                    Keperluan
                  </span>
                  <span style={{ color: "#000000" }} className="test">
                    : {data.keperluan}
                  </span>
                </div>
              </div>

              <div
                style={{
                  fontFamily: "sans-serif",
                  marginLeft: "60px",
                  marginTop: "60px",
                }}
              >
                <h6 style={{ color: "#000000" }}>*Persyaratan</h6>
                <ol>
                  <li style={{ color: "#000000" }} className="test">
                    Fotocopy KTP
                  </li>
                  <li style={{ color: "#000000" }} className="test">
                    Fotocopy Kartu Keluarga
                  </li>
                  <li style={{ color: "#000000" }} className="test">
                    Surat Pengantar dari RT/RW
                  </li>
                </ol>
              </div>
              <br />
              <p style={{ color: "#000000" }} className="test">
                *Silahkan download bukti pendaftaran ini, untuk di perlihatkan
                ke petugas kelurahan dan jagan lupa untuk membawa
                persyaratannya.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px", // Adjust the margin as needed
            }}
          >
            <button
              style={{
                display: "flex",
                alignItems: "center",
                width: "100px", // Adjust the width as needed
                borderRadius: "5px",
              }}
              className="btn btn-primary"
              onClick={generateSuratPDFK}
            >
              Download
            </button>
            <br />
            <br />
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default BuktiBeasiswaUnipa;
