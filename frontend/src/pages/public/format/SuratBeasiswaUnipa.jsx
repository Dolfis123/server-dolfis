import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "../../../css/public/latters/SuratTidakMampu.css";
import Navbar from "../../../components/public/Navbar";

function SuratKetBeasiswaUnipa() {
  const [namaTua, setNamaTua] = useState("");
  const [jenisKelaminTua, setJenisKelaminTua] = useState("");
  const [tempatLahirTua, setTempatLahirTua] = useState("");
  const [tanggalLahirTua, setTanggalLahirTua] = useState("");
  const [pekerjaanTua, setPekerjaanTua] = useState("");
  const [agamaTua, setAgamaTua] = useState("");
  const [alamatTua, setAlamatTua] = useState("");
  const [umurTua, setUmurTua] = useState("");
  const [penghasilanTua, setPenghasilanTua] = useState("");
  const [namaAnak, setNamaAnak] = useState("");
  const [jenisKelaminAnak, setJenisKelaminAnak] = useState("");
  const [tempatLahirAnak, setTempatLahirAnak] = useState("");
  const [tanggalLahirAnak, setTanggalLahirAnak] = useState("");
  const [agamaAnak, setAgamaAnak] = useState("");
  const [alamatAnak, setAlamatAnak] = useState("");
  const [nim, setNim] = useState("");
  const [fakultas, setFakultas] = useState("");
  const [prodi, setProdi] = useState("");
  const [ktpImage, setKtpImage] = useState("");
  const [ktpImagePreview, setKtpImagePreview] = useState("");
  const [ktpErrorMessage, setKtpErrorMessage] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:3040", {
      transports: ["websocket", "polling"],
    });

    socket.on("newFormNotification", (formData) => {
      setNotificationCount((prevCount) => prevCount + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setKtpImage(imageFile);

    if (imageFile) {
      const imagePreviewUrl = URL.createObjectURL(imageFile);
      setKtpImagePreview(imagePreviewUrl);
    }
  };

  const handleShowNotification = () => setShowNotification(true);

  const handleCloseNotification = () => setShowNotification(false);

  const handleChangeKtp = (event) => {
    const inputValue = event.target.value;

    if (/^\d{0,16}$/.test(inputValue)) {
      setNoTelepon(inputValue);
      setKtpErrorMessage(
        inputValue.length === 16 ? "" : "Nomor KTP harus terdiri dari 16 digit."
      );
    } else {
      setKtpErrorMessage("Nomor KTP harus terdiri dari 16 digit.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        !namaTua ||
        !tempatLahirTua ||
        !tanggalLahirTua ||
        !jenisKelaminTua ||
        !agamaTua ||
        !alamatTua ||
        !umurTua ||
        !penghasilanTua ||
        !namaAnak ||
        !tempatLahirAnak ||
        !tanggalLahirAnak ||
        !jenisKelaminAnak ||
        !agamaAnak ||
        !alamatAnak ||
        !nim ||
        !fakultas ||
        !prodi ||
        !ktpImage
      ) {
        alert("Data tidak boleh kosong");
        return;
      }

      if (ktpErrorMessage) {
        alert("Terjadi kesalahan pada kolom KTP. Periksa kembali input Anda.");
        return;
      }

      const formData = new FormData();
      formData.append("nama_tua", namaTua);
      formData.append("jenis_kelamin_tua", jenisKelaminTua);
      formData.append("tempat_lahir_tua", tempatLahirTua);
      formData.append("tanggal_lahir_tua", tanggalLahirTua);
      formData.append("pekerjaan_tua", pekerjaanTua);
      formData.append("agama_tua", agamaTua);
      formData.append("alamat_tua", alamatTua);
      formData.append("umur_tua", umurTua);
      formData.append("penghasilan_tua", penghasilanTua);
      formData.append("nama_anak", namaAnak);
      formData.append("jenis_kelamin_anak", jenisKelaminAnak);
      formData.append("tempat_lahir_anak", tempatLahirAnak);
      formData.append("tanggal_lahir_anak", tanggalLahirAnak);
      formData.append("agama_anak", agamaAnak);
      formData.append("alamat_anak", alamatAnak);
      formData.append("nim", nim);
      formData.append("fakultas", fakultas);
      formData.append("prodi", prodi);
      formData.append("ktp_image", ktpImage);

      const response = await axios.post(
        "http://localhost:5050/api/buat-surat-beasiswa",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Data added successfully:", response.data);

      if (response.data.newId) {
        const newId = response.data.newId;
        alert(
          "Surat keterangan beasiswa berhasil dibuat. Menunggu persetujuan admin."
        );
        handleShowNotification();

        setNamaTua("");
        setJenisKelaminTua("");
        setTempatLahirTua("");
        setTanggalLahirTua("");
        setPekerjaanTua("");
        setAgamaTua("");
        setAlamatTua("");
        setUmurTua("");
        setPenghasilanTua("");
        setNamaAnak("");
        setJenisKelaminAnak("");
        setTempatLahirAnak("");
        setTanggalLahirAnak("");
        setAgamaAnak("");
        setAlamatAnak("");
        setNim("");
        setFakultas("");
        setProdi("");
        setKtpImage("");
        setKtpImagePreview("");

        navigate(`/persyaratan-surat-beasiswa/${newId}`);
      } else {
        alert("Terjadi kesalahan dalam mendapatkan ID dari server.");
      }
    } catch (error) {
      console.error("Error adding data:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      alert(`Error submitting form: ${error.message}`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4 w-full">
        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit} className="block">
            <div className="text-center mb-6 mt-16">
              <h5 className="text-blue-600 text-2xl font-bold">
                FORM SURAT KETERANGAN BEASISWA UNIPA
              </h5>
              <p>
                Surat ini bertujuan untuk keterangan tidak mampu bertujuan untuk
                menerimah beasiswa
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="nama_tua"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Nama Orang Tua</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="nama_tua"
                value={namaTua}
                onChange={(e) => setNamaTua(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="tempat_lahir_tua"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Tempat Lahir Orang Tua</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="tempat_lahir_tua"
                value={tempatLahirTua}
                onChange={(e) => setTempatLahirTua(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="tanggal_lahir_tua"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Tanggal Lahir Orang Tua</b>
              </label>
              <input
                type="date"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="tanggal_lahir_tua"
                value={tanggalLahirTua}
                onChange={(e) => setTanggalLahirTua(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="jenis_kelamin_tua"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Jenis Kelamin Orang Tua</b>
              </label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="jenis_kelamin_tua"
                value={jenisKelaminTua}
                onChange={(e) => setJenisKelaminTua(e.target.value)}
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="pria">Pria</option>
                <option value="wanita">Wanita</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="agama_tua"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Agama Orang Tua</b>
              </label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="agama_tua"
                value={agamaTua}
                onChange={(e) => setAgamaTua(e.target.value)}
              >
                <option value="">Pilih Agama</option>
                <option value="kristen">Kristen</option>
                <option value="islam">Islam</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="pekerjaan_tua"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Pekerjaan Orang Tua</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="pekerjaan_tua"
                value={pekerjaanTua}
                onChange={(e) => setPekerjaanTua(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="alamat_tua"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Alamat Orang Tua</b>
              </label>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="alamat_tua"
                rows="3"
                value={alamatTua}
                onChange={(e) => setAlamatTua(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="umur_tua"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Umur Orang Tua</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="umur_tua"
                value={umurTua}
                onChange={(e) => setUmurTua(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="penghasilan_tua"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Penghasilan Orang Tua</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="penghasilan_tua"
                value={penghasilanTua}
                onChange={(e) => setPenghasilanTua(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="nama_anak"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Nama Anak</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="nama_anak"
                value={namaAnak}
                onChange={(e) => setNamaAnak(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="tempat_lahir_anak"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Tempat Lahir Anak</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="tempat_lahir_anak"
                value={tempatLahirAnak}
                onChange={(e) => setTempatLahirAnak(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="tanggal_lahir_anak"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Tanggal Lahir Anak</b>
              </label>
              <input
                type="date"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="tanggal_lahir_anak"
                value={tanggalLahirAnak}
                onChange={(e) => setTanggalLahirAnak(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="jenis_kelamin_anak"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Jenis Kelamin Anak</b>
              </label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="jenis_kelamin_anak"
                value={jenisKelaminAnak}
                onChange={(e) => setJenisKelaminAnak(e.target.value)}
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="pria">Pria</option>
                <option value="wanita">Wanita</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="agama_anak"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Agama Anak</b>
              </label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="agama_anak"
                value={agamaAnak}
                onChange={(e) => setAgamaAnak(e.target.value)}
              >
                <option value="">Pilih Agama</option>
                <option value="kristen">Kristen</option>
                <option value="islam">Islam</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="alamat_anak"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Alamat Anak</b>
              </label>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="alamat_anak"
                rows="3"
                value={alamatAnak}
                onChange={(e) => setAlamatAnak(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="nim"
                className="block text-sm font-medium text-gray-700"
              >
                <b>NIM</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="nim"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="fakultas"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Fakultas</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="fakultas"
                value={fakultas}
                onChange={(e) => setFakultas(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="prodi"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Program Studi</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="prodi"
                value={prodi}
                onChange={(e) => setProdi(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="ktpImage"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Upload KTP</b>
              </label>
              <input
                type="file"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="ktpImage"
                accept="image/*"
                onChange={handleImageChange}
              />
              {ktpImagePreview && (
                <img
                  src={ktpImagePreview}
                  alt="Preview KTP"
                  className="mt-2 rounded-md"
                  style={{ maxWidth: "200px" }}
                />
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md py-2 px-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {showNotification && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-lg font-bold">Notifikasi</h5>
              <button
                onClick={handleCloseNotification}
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="fa fa-times"></span>
              </button>
            </div>
            <div>
              Surat keterangan beasiswa berhasil dibuat. Menunggu persetujuan
              admin.
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseNotification}
                className="bg-gray-500 text-white rounded-md py-2 px-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SuratKetBeasiswaUnipa;
