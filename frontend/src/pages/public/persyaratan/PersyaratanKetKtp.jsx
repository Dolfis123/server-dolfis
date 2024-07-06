import React, { useState, useEffect } from "react";
import Footer from "../../../components/public/Footer";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Navbar from "../../../components/public/Navbar";

const socket = io("http://localhost:3041");

function PersyaratanKetKtp() {
  const [formData, setFormData] = useState({
    no_telepon: "",
    email: "",
    keperluan: "",
  });
  const [noTeleponErrorMessage, setNoTeleponErrorMessage] = useState("");

  const navigate = useNavigate();
  const { hashed_id } = useParams(); // Menggunakan hashed_id dari useParams
  const [data, setData] = useState(null);

  useEffect(() => {
    if (hashed_id) {
      fetchData();
    }
  }, [hashed_id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/lihat-surat-ket-ktp/${hashed_id}`
      );
      setData(response.data.data);
      setFormData({
        no_telepon: response.data.data.no_telepon || "",
        email: response.data.data.email || "",
        keperluan: response.data.data.keperluan || "",
      });
    } catch (error) {
      console.error("Error fetching domisili data:", error);
    }
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "no_telepon") {
      if (/^\d{0,13}$/.test(value)) {
        setFormData({ ...formData, [name]: value });
        setNoTeleponErrorMessage(
          value.length === 11 || value.length === 12 || value.length === 13
            ? ""
            : "Nomor telepon harus terdiri dari 11, 12, atau 13 digit."
        );
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (noTeleponErrorMessage) {
      alert(
        "Terjadi kesalahan pada kolom nomor telepon. Periksa kembali input Anda."
      );
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5050/api/update-nomor-email-ktp/${hashed_id}`,
        formData
      );

      socket.emit("formSubmitted", formData);

      console.log(response.data);
      navigate(`/bukti-ket-ktp/${hashed_id}`);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold">
              Permintaan Surat Keterangan Domisili Usaha
            </h3>
            <div className="mt-6 text-left ml-10">
              <h4 className="font-semibold">Persyaratan</h4>
              <ol className="list-decimal list-inside">
                <li>Fotocopy KTP</li>
                <li>Fotocopy Kartu Keluarga</li>
              </ol>
            </div>
            <br />
            <p className="ml-10 font-semibold">
              <b> Mohon untuk di isi data di bawah ini:</b>
            </p>
            <p className="ml-10">Data ini akan kami gunakan untuk</p>
            <p className="ml-10">Mempermudah dalam menghubungi anda</p>
          </div>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="no_telepon"
                  className="block text-sm font-medium text-gray-700"
                >
                  <b>No Hp/Wa</b>
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  id="no_telepon"
                  name="no_telepon"
                  value={formData.no_telepon}
                  onChange={handleInputChange}
                />
                {noTeleponErrorMessage && (
                  <div className="text-red-500 mt-2">
                    {noTeleponErrorMessage}
                  </div>
                )}
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
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="keperluan"
                  className="block text-sm font-medium text-gray-700"
                >
                  <b>Keperluan</b>
                </label>
                <textarea
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  name="keperluan"
                  id="keperluan"
                  rows="3"
                  value={formData.keperluan}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <br />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md py-2 px-4"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
}

export default PersyaratanKetKtp;
