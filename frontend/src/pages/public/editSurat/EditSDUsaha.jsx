import React, { useState, useEffect } from "react";
import Footer from "../../../components/public/Footer";
import ReactDatePicker from "react-datepicker";
import { format } from "date-fns";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3041");

function EditSDUsaha() {
  const [nama, setNama] = useState("");
  // const [nip, setNip] = useState("");
  const [tanggal, setTanggal] = useState(null);
  const [alamatKantor, setAlamatKantor] = useState("");
  const [namaUsaha, setNamaUsaha] = useState("");
  const [alamatPerusahaan, setAlamatPerusahaan] = useState("");
  const [jenisUsaha, setJenisUsaha] = useState("");
  const [namaPempinan, setNamaPempinan] = useState("");
  const [ktp, setKtp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [email, setEmail] = useState("");
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

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/lihat-surat-domisili-usaha/${hashed_id}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching domisili data:", error);
    }
  };

  useEffect(() => {
    if (data) {
      setNama(data.nama);
      // setNip(data.nip);
      setTanggal(data.tanggal);
      setAlamatKantor(data.alamat_kantor);
      setNamaUsaha(data.nama_usaha);
      setAlamatPerusahaan(data.alamat_perusahan);
      setJenisUsaha(data.jenis_usaha);
      setNamaPempinan(data.nama_pempinan);
      setKtp(data.ktp);
      setAlamat(data.alamat);
      setKeperluan(data.keperluan);
      setNoTelepon(data.no_telepon);
      setEmail(data.email);
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
      const response = await axios.put(
        `http://localhost:5050/api/update-surat-domisili-usaha-user/${hashed_id}`,
        {
          nama,
          // nip,
          tanggal: formattedDate,
          alamat_kantor: alamatKantor,
          nama_usaha: namaUsaha,
          alamat_perusahan: alamatPerusahaan,
          jenis_usaha: jenisUsaha,
          nama_pempinan: namaPempinan,
          ktp,
          alamat,
          keperluan,
          no_telepon: noTelepon,
          email,
        }
      );

      socket.emit("formSubmitted", {
        no_telepon: noTelepon,
        email,
        keperluan,
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
    <div className="bg-gray-100 min-h-screen py-8  w-full">
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleFormSubmit} className="">
            <div className="mb-4">
              <label
                htmlFor="nama"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Nama</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 hover:bg-gray-200"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 hover:bg-gray-200"
                id="nip"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
              />
            </div> */}
            {/* <div className="mb-4">
              <label
                htmlFor="tanggal"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Tanggal</b>
              </label>
              <ReactDatePicker
                selected={tanggal ? new Date(tanggal) : null}
                onChange={handleTanggalChange}
                dateFormat="dd-MM-yyyy"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={30}
              />
            </div> */}
            <div className="mb-4">
              <label
                htmlFor="alamatKantor"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Alamat Kantor</b>
              </label>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 hover:bg-gray-200"
                id="alamatKantor"
                rows="3"
                value={alamatKantor}
                onChange={(e) => setAlamatKantor(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="namaUsaha"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Nama Usaha</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 hover:bg-gray-200"
                id="namaUsaha"
                value={namaUsaha}
                onChange={(e) => setNamaUsaha(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="alamatPerusahaan"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Alamat Perusahaan</b>
              </label>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 hover:bg-gray-200"
                id="alamatPerusahaan"
                rows="3"
                value={alamatPerusahaan}
                onChange={(e) => setAlamatPerusahaan(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="jenisUsaha"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Jenis Usaha</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 hover:bg-gray-200"
                id="jenisUsaha"
                value={jenisUsaha}
                onChange={(e) => setJenisUsaha(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="namaPempinan"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Nama Pempinan</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 hover:bg-gray-200"
                id="namaPempinan"
                value={namaPempinan}
                onChange={(e) => setNamaPempinan(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="ktp"
                className="block text-sm font-medium text-gray-700"
              >
                <b>KTP</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 hover:bg-gray-200"
                id="ktp"
                value={ktp}
                onChange={handleChange}
                maxLength="16"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 hover:bg-gray-200"
                id="alamat"
                rows="3"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="keperluan"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Keperluan</b>
              </label>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 hover:bg-gray-200"
                id="keperluan"
                rows="3"
                value={keperluan}
                onChange={(e) => setKeperluan(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="noTelepon"
                className="block text-sm font-medium text-gray-700"
              >
                <b>No Telepon</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 hover:bg-gray-200"
                id="noTelepon"
                value={noTelepon}
                onChange={(e) => setNoTelepon(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Email</b>
              </label>
              <input
                type="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 hover:bg-gray-200"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* <button className="bg-red-500 text-white rounded-md py-2 px-4">
              <Link to={`/confir-data-domisili-usaha/${hashed_id}}`}>
                Batal
              </Link>
            </button> */}
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md py-2 px-4"
            >
              Update
            </button>
          </form>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default EditSDUsaha;
