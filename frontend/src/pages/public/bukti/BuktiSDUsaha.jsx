import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
import logoLurah from "../../../public/img/logo-remove.png";

function BuktiSDUsaha() {
  const [data, setData] = useState(null);
  const { hashed_id } = useParams();

  useEffect(() => {
    fetchData();
  }, [hashed_id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://website.fahri.life/api/lihat-surat-domisili-usaha/${hashed_id}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const generateSuratPDF = async () => {
    const element = document.getElementById("my-content");

    const options = {
      margin: 10,
      filename: `${data.nama} ${data.id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    await html2pdf().from(element).set(options).save();
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="container mx-auto">
        <div className="bg-white shadow-md rounded p-6">
          <div className="mb-4" id="my-content">
            <table className="w-full mb-4">
              <tbody>
                <tr className="flex flex-col lg:flex-row">
                  <td className="w-full lg:w-1/4 text-center lg:text-left mb-4 lg:mb-0">
                    <img
                      src={logoLurah}
                      alt="logo"
                      className="w-20 mx-auto lg:mx-0 mb-5"
                    />
                    <p className="text-black">
                      <span>JL Trikora Sowi</span>
                    </p>
                  </td>
                  <td className="text-center lg:w-3/4">
                    <b>
                      <h5 className="text-black">
                        PEMERINTAH KABUPATEN MANOKWARI
                      </h5>
                      <h5 className="text-black">DISTRIK MANOKWARI BARAT</h5>
                      <h5 className="text-black">KELURAHAN SOWI</h5>
                    </b>
                    <p className="text-right text-black">
                      <span>Kode Pos: 98315</span>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="border-2 border-black p-5">
              <div className="text-center mb-4">
                <h6 className="text-black font-serif">
                  BUKTI PENDAFTARAN LAYANAN ONLINE
                </h6>
              </div>
              <p className="text-black mb-0">Warga Yth,</p>
              <p className="text-black">
                Terima kasih telah mengunakan layanan kami. <br /> Berikut data
                pendaftaran Anda:
              </p>
              <div className="ml-0 lg:ml-12 font-serif text-black">
                <div className="flex flex-col lg:flex-row mb-2">
                  <span className="w-full lg:w-40">Nama</span>
                  <span>: {data.nama}</span>
                </div>
                <div className="flex flex-col lg:flex-row mb-2">
                  <span className="w-full lg:w-40">Keperluan</span>
                  <span>: {data.keperluan}</span>
                </div>
                <div className="flex flex-col lg:flex-row mb-2">
                  <span className="w-full lg:w-40">Tanggal</span>
                  <span>: {formatDate(data.tanggal)}</span>
                </div>
                <div className="flex flex-col lg:flex-row mb-2">
                  <span className="w-full lg:w-40">No Pendaftaran</span>
                  <span>: {data.nomor_surat}</span>
                </div>
              </div>
              <div className="ml-0 lg:ml-12 mt-10 text-black">
                <h6 className="text-black">*Persyaratan</h6>
                <ol className="list-decimal ml-4">
                  <li>Fotocopy KTP</li>
                  <li>Fotocopy Kartu Keluarga</li>
                  <li>Surat Pengantar dari RT/RW</li>
                </ol>
              </div>
              <br />
              <p className="text-black">
                <span className="font-bold">Catatan:</span> <br />
                Silahkan download bukti pendaftaran ini, untuk diperlihatkan ke
                petugas kelurahan dan jangan lupa untuk membawa persyaratannya.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={generateSuratPDF}
            >
              <i className="material-icons mr-2">print</i>
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuktiSDUsaha;
