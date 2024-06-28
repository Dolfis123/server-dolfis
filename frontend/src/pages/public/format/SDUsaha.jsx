import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "../../../css/public/latters/SuratDomisiliUsaha.css";
import Navbar from "../../../components/public/Navbar";

function SDUsaha() {
  const [nama, setNama] = useState("");
  // const [nip, setNip] = useState("");
  const [alamat_kantor, setAlamatKantor] = useState("");
  const [nama_usaha, setNamaUsaha] = useState("");
  const [alamat_perusahan, setAlamatPerusahan] = useState("");
  const [jenis_usaha, setJenisUsaha] = useState("");
  const [nama_pempinan, setNamaPempinan] = useState("");
  const [ktp, setKtp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [ktpImage, setKtpImage] = useState("");
  const [ktpImagePreview, setKtpImagePreview] = useState(""); // State untuk preview gambar
  const [ktpErrorMessage, setKtpErrorMessage] = useState("");
  // const [nipErrorMessage, setNipErrorMessage] = useState("");
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

    // Membuat URL object untuk gambar preview
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
      setKtp(inputValue);
      setKtpErrorMessage(
        inputValue.length === 16 ? "" : "Nomor KTP harus terdiri dari 16 digit."
      );
    } else {
      setKtpErrorMessage("Nomor KTP harus terdiri dari 16 digit.");
    }
  };

  // const handleChangeNip = (event) => {
  //   const inputValue = event.target.value;

  //   if (/^\d{0,18}$/.test(inputValue)) {
  //     setNip(inputValue);
  //     setNipErrorMessage(
  //       inputValue.length === 18 || inputValue.length === 0
  //         ? ""
  //         : "Nomor NIP harus terdiri dari 18 digit atau bisa dikosongkan."
  //     );
  //   } else {
  //     setNipErrorMessage(
  //       "Nomor NIP harus terdiri dari 18 digit atau bisa dikosongkan."
  //     );
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        !nama ||
        !alamat_kantor ||
        !nama_usaha ||
        !alamat_perusahan ||
        !jenis_usaha ||
        !nama_pempinan ||
        !ktp ||
        !alamat ||
        !ktpImage
      ) {
        alert("Data tidak boleh kosong");
        return;
      }

      // if (ktpErrorMessage || nipErrorMessage) {
      //   alert(
      //     "Terjadi kesalahan pada kolom KTP atau NIP. Periksa kembali input Anda."
      //   );
      //   return;
      // }

      const formData = new FormData();
      formData.append("nama", nama);
      // formData.append("nip", nip);
      formData.append("alamat_kantor", alamat_kantor);
      formData.append("nama_usaha", nama_usaha);
      formData.append("alamat_perusahan", alamat_perusahan);
      formData.append("jenis_usaha", jenis_usaha);
      formData.append("nama_pempinan", nama_pempinan);
      formData.append("ktp", ktp);
      formData.append("alamat", alamat);
      formData.append("ktp_image", ktpImage);

      const response = await axios.post(
        "http://localhost:5050/buat-surat-domisili",
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
          "Surat domisili usaha berhasil dibuat. Menunggu persetujuan admin."
        );
        handleShowNotification();

        setNama("");
        // setNip("");
        setAlamatKantor("");
        setNamaUsaha("");
        setAlamatPerusahan("");
        setJenisUsaha("");
        setNamaPempinan("");
        setKtp("");
        setAlamat("");
        setKtpImage("");
        setKtpImagePreview(""); // Reset gambar preview

        navigate(`/persyaratan-surat-ket-domisili/${newId}`);
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
      <div className="container mx-auto p-4 w-1/2">
        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit} className="block  ">
            <div className="text-center mb-6 mt-16">
              <h5 className="text-blue-600 text-2xl font-bold">
                FORM SURAT KETERANGAN DOMISILI USAHA
              </h5>
            </div>
            <div className="mb-4">
              <label
                htmlFor="nama"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Nama</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full  border border-gray-300 rounded-md shadow-sm p-2"
                id="nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>

            {/* <div className="mb-4">
              <label
                htmlFor="nip"
                className="block text-sm font-medium text-gray-700"
              >
                <b>NIP</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="nip"
                value={nip}
                onChange={handleChangeNip}
              />
              {nipErrorMessage && (
                <div className="text-red-500 mt-2">{nipErrorMessage}</div>
              )}
            </div> */}

            <div className="mb-4">
              <label
                htmlFor="alamat_kantor"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Alamat Kantor</b>
              </label>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="alamat_kantor"
                rows="3"
                value={alamat_kantor}
                onChange={(e) => setAlamatKantor(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="nama_usaha"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Nama Usaha</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="nama_usaha"
                value={nama_usaha}
                onChange={(e) => setNamaUsaha(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="alamat_perusahan"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Alamat Perusahaan</b>
              </label>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="alamat_perusahan"
                rows="3"
                value={alamat_perusahan}
                onChange={(e) => setAlamatPerusahan(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="jenis_usaha"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Jenis Usaha</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="jenis_usaha"
                value={jenis_usaha}
                onChange={(e) => setJenisUsaha(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="nama_pempinan"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Nama Pimpinan</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="nama_pempinan"
                value={nama_pempinan}
                onChange={(e) => setNamaPempinan(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="ktp"
                className="block text-sm font-medium text-gray-700"
              >
                <b>No. KTP</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="ktp"
                value={ktp}
                onChange={handleChangeKtp}
              />
              {ktpErrorMessage && (
                <div className="text-red-500 mt-2">{ktpErrorMessage}</div>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="alamat"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Alamat</b>
              </label>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="alamat"
                rows="3"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              ></textarea>
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
              {ktpImagePreview && ( // Tampilkan gambar preview jika ada
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
              Surat domisili usaha berhasil dibuat. Menunggu persetujuan admin.
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

export default SDUsaha;
