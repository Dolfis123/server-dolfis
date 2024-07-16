import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function ConfirmasiDataSDUsaha() {
  const [data, setData] = useState(null);
  const { hashed_id } = useParams(); // Menggunakan hashed_id sebagai parameter

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

  if (!data) {
    return <div>Loading...</div>;
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div className="w-full">
      <div className="bg-gray-100 min-h-screen py-8 w-full">
        <div className="container mx-auto p-4 ">
          <div className="bg-white shadow-md rounded-lg p-6 w-full">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-blue-600">
                DETAIL BIODATA SURAT DOMISILI USAHA
              </h3>
            </div>
            <p className="mb-6 text-center">
              Mohon Untuk Periksa Kembali Biodata yang Telah diisi Sebelum
              Mengirim Ke admin.
            </p>
            <div className="space-y-4">
              <div className="flex">
                <span className="w-1/3 font-semibold">Nama</span>
                <span>: {data.nama}</span>
              </div>
              {/* <div className="flex">
                <span className="w-1/3 font-semibold">NIP</span>
                <span>: {data.nip}</span>
              </div> */}
              <div className="flex">
                <span className="w-1/3 font-semibold">Tanggal</span>
                <span>: {formatDate(data.tanggal)}</span>
              </div>
              <div className="flex">
                <span className="w-1/3 font-semibold">Alamat Kantor</span>
                <span>: {data.alamat_kantor}</span>
              </div>
              <div className="flex">
                <span className="w-1/3 font-semibold">Nama Usaha</span>
                <span>: {data.nama_usaha}</span>
              </div>
              <div className="flex">
                <span className="w-1/3 font-semibold">Alamat Perusahaan</span>
                <span>: {data.alamat_perusahan}</span>
              </div>
              <div className="flex">
                <span className="w-1/3 font-semibold">Jenis Usaha</span>
                <span>: {data.jenis_usaha}</span>
              </div>
              <div className="flex">
                <span className="w-1/3 font-semibold">Nama Pimpinan</span>
                <span>: {data.nama_pempinan}</span>
              </div>
              <div className="flex">
                <span className="w-1/3 font-semibold">KTP</span>
                <span>: {data.ktp}</span>
              </div>
              <div className="flex">
                <span className="w-1/3 font-semibold">Alamat</span>
                <span>: {data.alamat}</span>
              </div>
              <div className="flex">
                <span className="w-1/3 font-semibold">No Telepon</span>
                <span>: {data.no_telepon}</span>
              </div>
              <div className="flex">
                <span className="w-1/3 font-semibold">Email</span>
                <span>: {data.email}</span>
              </div>
              <div className="flex">
                <span className="w-1/3 font-semibold">Jenis Surat</span>
                <span>: {data.jenis_surat}</span>
              </div>
              <div className="flex">
                <span className="w-1/3 font-semibold">Keperluan</span>
                <span>: {data.keperluan}</span>
              </div>
              <div className="flex">
                <span className="w-1/3 font-semibold">KTP Image</span>
                <div className="flex-1">
                  {data.ktp_image && (
                    <img
                      src={`https://website.fahri.life/api/images/${data.ktp_image}`}
                      className="mt-2 rounded-md"
                      alt={data.nama}
                      style={{ maxWidth: "200px" }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-4">
              <Link to={`/edit-domisili-usaha/${data.hashed_id}`}>
                <button className="bg-green-500 text-white rounded-md py-2 px-4">
                  Edit
                </button>
              </Link>
              Confirmasi
              <Link to={`/bukti-surat-domisili-usaha/${data.hashed_id}`}>
                <button className="bg-blue-500 text-white rounded-md py-2 px-4">
                  Submit
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmasiDataSDUsaha;
