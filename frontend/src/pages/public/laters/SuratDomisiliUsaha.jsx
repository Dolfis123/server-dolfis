import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Modal, Button } from "react-bootstrap";
import io from "socket.io-client";
import "../../../css/public/latters/SuratDomisiliUsaha.css";
import Navbar from "../../../components/public/Navbar";

function SuratDomisiliUsaha() {
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
      setKtpErrorMessage("");
    } else {
      setKtpErrorMessage("Nomor KTP harus terdiri dari 16 digit.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        !nama ||
        // !nip ||
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

      if (ktpErrorMessage) {
        alert("Terjadi kesalahan pada kolom KTP. Periksa kembali input Anda.");
        return;
      }

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
        "https://dolfis.store/api/buat-surat-domisili",
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
      <div className="container">
        <div className="card">
          <div className="card-header text-center">
            <h5 style={{ color: "#3468C0" }}>
              FORM SURAT KETERANGAN DOMISILI USAHA
            </h5>
          </div>
          <br />
          <div className="card-body">
            <form onSubmit={handleSubmit} className="label">
              <div className="row mb-3">
                <label htmlFor="nama" className="col-sm-2 col-form-label">
                  <b>Nama</b>
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control label"
                    id="nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                </div>
              </div>

              {/* <div className="row mb-3">
                <label htmlFor="nip" className="col-sm-2 col-form-label">
                  <b>NIP</b>
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control label"
                    id="nip"
                    value={nip}
                    onChange={(e) => setNip(e.target.value)}
                  />
                </div>
              </div> */}
              <div className="row mb-3">
                <label
                  htmlFor="alamat_kantor"
                  className="col-sm-2 col-form-label"
                >
                  <b>Alamat Kantor</b>
                </label>
                <div className="col-sm-5">
                  <textarea
                    className="form-control label"
                    id="alamat_kantor"
                    rows="3"
                    value={alamat_kantor}
                    onChange={(e) => setAlamatKantor(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="row mb-3">
                <label htmlFor="nama_usaha" className="col-sm-2 col-form-label">
                  <b>Nama Usaha</b>
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control label"
                    id="nama_usaha"
                    value={nama_usaha}
                    onChange={(e) => setNamaUsaha(e.target.value)}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label
                  htmlFor="alamat_perusahan"
                  className="col-sm-2 col-form-label"
                >
                  <b>Alamat Perusahaan</b>
                </label>
                <div className="col-sm-5">
                  <textarea
                    className="form-control label"
                    id="alamat_perusahan"
                    rows="3"
                    value={alamat_perusahan}
                    onChange={(e) => setAlamatPerusahan(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="row mb-3">
                <label
                  htmlFor="jenis_usaha"
                  className="col-sm-2 col-form-label"
                >
                  <b>Jenis Usaha</b>
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control label"
                    id="jenis_usaha"
                    value={jenis_usaha}
                    onChange={(e) => setJenisUsaha(e.target.value)}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label
                  htmlFor="nama_pempinan"
                  className="col-sm-2 col-form-label"
                >
                  <b>Nama Pimpinan</b>
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control label"
                    id="nama_pempinan"
                    value={nama_pempinan}
                    onChange={(e) => setNamaPempinan(e.target.value)}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label htmlFor="ktp" className="col-sm-2 col-form-label">
                  <b>No. KTP</b>
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control label"
                    id="ktp"
                    value={ktp}
                    onChange={handleChangeKtp}
                  />
                  {ktpErrorMessage && (
                    <div className="text-danger">{ktpErrorMessage}</div>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <label htmlFor="alamat" className="col-sm-2 col-form-label">
                  <b>Alamat</b>
                </label>
                <div className="col-sm-5">
                  <textarea
                    className="form-control label"
                    id="alamat"
                    rows="3"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="row mb-3">
                <label htmlFor="ktpImage" className="col-sm-2 col-form-label">
                  <b>Upload KTP</b>
                </label>
                <div className="col-sm-5">
                  <input
                    type="file"
                    className="form-control "
                    id="ktpImage"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {ktpImagePreview && ( // Tampilkan gambar preview jika ada
                    <img
                      src={ktpImagePreview}
                      alt="Preview KTP"
                      className="img-thumbnail mt-2"
                      style={{ maxWidth: "200px" }}
                    />
                  )}
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <Modal show={showNotification} onHide={handleCloseNotification}>
        <Modal.Header closeButton>
          <Modal.Title>Notifikasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Surat domisili usaha berhasil dibuat. Menunggu persetujuan admin.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNotification}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SuratDomisiliUsaha;
