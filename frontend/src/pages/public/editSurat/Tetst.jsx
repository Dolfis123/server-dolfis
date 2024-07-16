import React, { useState, useEffect } from "react";
import Footer from "../../../components/public/Footer";
import "../../../css/public/latters/SuratTidakMampu.css";
import ReactDatePicker from "react-datepicker";
import { format } from "date-fns";
import axios from "axios";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io("http://localhost:3041");
import { useNavigate } from "react-router-dom";

function EditSDUsaha() {
  const [nama, setNama] = useState("");
  const [nip, setNip] = useState("");
  const [tanggal, setTanggal] = useState(null);
  const [alamatKantor, setAlamatKantor] = useState("");
  const [namaUsaha, setNamaUsaha] = useState("");
  const [alamatPerusahaan, setAlamatPerusahaan] = useState("");
  const [jenisUsaha, setJenisUsaha] = useState("");
  const [namaPempinan, setNamaPempinan] = useState("");
  const [ktp, setKtp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [ktpImage, setKtpImage] = useState("");
  const [ktpImagePreview, setKtpImagePreview] = useState("");
  const [nomorSurat, setNomorSurat] = useState("");
  const [data, setData] = useState(null);
  const { hashed_id } = useParams();
  const [ktpErrorMessage, setKtpErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [hashed_id]);

  const handleChange = (event) => {
    const inputValue = event.target.value;

    if (/^\d{0,16}$/.test(inputValue)) {
      setKtp(inputValue);
      setKtpErrorMessage("");
    } else {
      setKtpErrorMessage("Nomor KTP harus terdiri dari 16 digit.");
    }
  };

  const handleTanggalChange = (date) => {
    setTanggal(date);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setKtpImage(file);
    setKtpImagePreview(URL.createObjectURL(file));
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://website.fahri.life/api/lihat-surat-domisili-usaha/${hashed_id}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching domisili data:", error);
    }
  };

  useEffect(() => {
    if (data) {
      setNama(data.nama);
      setNip(data.nip);
      setTanggal(data.tanggal);
      setAlamatKantor(data.alamat_kantor);
      setNamaUsaha(data.nama_usaha);
      setAlamatPerusahaan(data.alamat_perusahan);
      setJenisUsaha(data.jenis_usaha);
      setNamaPempinan(data.nama_pempinan);
      setKtp(data.ktp);
      setAlamat(data.alamat);
      setKtpImage(data.ktp_image);
      setKtpImagePreview(data.ktp_image);
      setNomorSurat(data.nomor_surat);
    }
  }, [data]);

  useEffect(() => {
    socket.on("connect", () => {
      socket.on("welcome", (data) => {
        console.log("msg from server", data);
      });
      socket.emit("msg", "Thanks for connecting!!");
    });

    socket.on("newFormSubmission", (formData) => {
      console.log("New form submission received:", formData);
    });

    return () => {
      socket.off("connect");
      socket.off("newFormSubmission");
    };
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = format(tanggal, "yyyy-MM-dd");

    try {
      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("nip", nip);
      formData.append("tanggal", formattedDate);
      formData.append("alamat_kantor", alamatKantor);
      formData.append("nama_usaha", namaUsaha);
      formData.append("alamat_perusahan", alamatPerusahaan);
      formData.append("jenis_usaha", jenisUsaha);
      formData.append("nama_pempinan", namaPempinan);
      formData.append("ktp", ktp);
      formData.append("alamat", alamat);
      formData.append("ktp_image", ktpImage);

      const response = await axios.put(
        `https://website.fahri.life/api/update-surat-domisili-usaha-user/${hashed_id}`,
        formData
      );

      socket.emit("formSubmitted", {
        nama,
        nip,
        tanggal: formattedDate,
        alamat_kantor: alamatKantor,
        nama_usaha: namaUsaha,
        alamat_perusahan: alamatPerusahaan,
        jenis_usaha: jenisUsaha,
        nama_pempinan: namaPempinan,
        ktp,
        alamat,
        ktp_image: ktpImage,
        nomor_surat: nomorSurat,
      });

      console.log(response.data);
      alert("Data berhasil di update");
      navigate(`/confir-data-domisili-usaha/${hashed_id}`);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-body-secondary">
      <br />
      <div className="container">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <div className="row mb-3">
                <label htmlFor="nama" className="col-sm-2 col-form-label">
                  <b>Nama</b>
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    id="nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="nip" className="col-sm-2 col-form-label">
                  <b>NIP</b>
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    id="nip"
                    value={nip}
                    onChange={(e) => setNip(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="tanggal" className="col-sm-2 col-form-label">
                  <b>Tanggal</b>
                </label>
                <div className="col-sm-5">
                  <ReactDatePicker
                    selected={tanggal ? new Date(tanggal) : null}
                    onChange={handleTanggalChange}
                    dateFormat="dd-MM-yyyy"
                    className="form-control"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={30}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label
                  htmlFor="alamatKantor"
                  className="col-sm-2 col-form-label"
                >
                  <b>Alamat Kantor</b>
                </label>
                <div className="col-sm-5">
                  <textarea
                    className="form-control"
                    id="alamatKantor"
                    rows="3"
                    value={alamatKantor}
                    onChange={(e) => setAlamatKantor(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="namaUsaha" className="col-sm-2 col-form-label">
                  <b>Nama Usaha</b>
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    id="namaUsaha"
                    value={namaUsaha}
                    onChange={(e) => setNamaUsaha(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label
                  htmlFor="alamatPerusahaan"
                  className="col-sm-2 col-form-label"
                >
                  <b>Alamat Perusahaan</b>
                </label>
                <div className="col-sm-5">
                  <textarea
                    className="form-control"
                    id="alamatPerusahaan"
                    rows="3"
                    value={alamatPerusahaan}
                    onChange={(e) => setAlamatPerusahaan(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="jenisUsaha" className="col-sm-2 col-form-label">
                  <b>Jenis Usaha</b>
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    id="jenisUsaha"
                    value={jenisUsaha}
                    onChange={(e) => setJenisUsaha(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label
                  htmlFor="namaPempinan"
                  className="col-sm-2 col-form-label"
                >
                  <b>Nama Pempinan</b>
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    id="namaPempinan"
                    value={namaPempinan}
                    onChange={(e) => setNamaPempinan(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="ktp" className="col-sm-2 col-form-label">
                  <b>KTP</b>
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    id="ktp"
                    value={ktp}
                    onChange={handleChange}
                    maxLength="16"
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
                    className="form-control"
                    id="alamat"
                    rows="3"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="ktpImage" className="col-sm-2 col-form-label">
                  <b>Gambar KTP</b>
                </label>
                <div className="col-sm-5">
                  <input
                    type="file"
                    className="form-control"
                    id="ktpImage"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {ktpImagePreview && (
                    <img
                      src={ktpImagePreview}
                      alt="Preview KTP"
                      style={{ width: "100%", marginTop: "10px" }}
                    />
                  )}
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditSDUsaha;
