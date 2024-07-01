import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import { FaEdit, FaTrash } from "react-icons/fa";

function MarkerRw() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama_RW: "",
    latLong: "",
    nama_ketua_rw: "",
    jumlah_pria: "",
    jumlah_wanita: "",
    jumlah_kk: "",
    no_hp: "",
    deskripsi: "",
    image_rw: null,
  });
  const [imageUrl, setImageUrl] = useState("");
  const [rwData, setRWData] = useState([]);
  const [selectedRW, setSelectedRW] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setFormData({
      nama_RW: "",
      latLong: "",
      nama_ketua_rw: "",
      jumlah_pria: "",
      jumlah_wanita: "",
      jumlah_kk: "",
      no_hp: "",
      deskripsi: "",
      image_rw: null,
    });
    setImageUrl("");
    setSelectedRW(null);
  };

  const handleChangeNumberHp = (event) => {
    const { name, value } = event.target;
    if (!isNaN(value)) {
      if (value.length <= 13) {
        setFormData({ ...formData, [name]: value });
      } else {
        setFormData({
          ...formData,
          no_hpError: "Nomor HP hanya bisa 13 karakter",
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, image_rw: file }));
    setImageUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.no_hp.length !== 13) {
      alert("Nomor HP harus tepat 13 digit.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("nama_RW", formData.nama_RW);
      formDataToSend.append("latLong", formData.latLong);
      formDataToSend.append("nama_ketua_rw", formData.nama_ketua_rw);
      formDataToSend.append("jumlah_pria", formData.jumlah_pria);
      formDataToSend.append("jumlah_wanita", formData.jumlah_wanita);
      formDataToSend.append("jumlah_kk", formData.jumlah_kk);
      formDataToSend.append("no_hp", formData.no_hp);
      formDataToSend.append("deskripsi", formData.deskripsi);

      if (formData.image_rw) {
        formDataToSend.append("image_rw", formData.image_rw);
      }

      if (selectedRW) {
        await axios.put(
          `https://website.fahri.life/api/rw/${selectedRW.id_RW}`,
          formDataToSend
        );
        alert("Data berhasil diperbarui");
      } else {
        await axios.post("https://website.fahri.life/api/add", formDataToSend);
        alert("Data berhasil ditambahkan");
      }

      setFormData({
        nama_RW: "",
        latLong: "",
        nama_ketua_rw: "",
        jumlah_pria: "",
        jumlah_wanita: "",
        jumlah_kk: "",
        no_hp: "",
        deskripsi: "",
        image_rw: null,
      });
      setImageUrl("");
      setSelectedRW(null);
      handleClose();
      fetchData();
    } catch (error) {
      console.error("Gagal mengirim data:", error);
      alert("Gagal mengirim data");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("https://website.fahri.life/api/rw");
      setRWData(response.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (rw) => {
    setSelectedRW(rw);
    setFormData({
      nama_RW: rw.nama_RW,
      latLong: rw.latLong,
      nama_ketua_rw: rw.nama_ketua_rw || "",
      jumlah_pria: rw.jumlah_pria || "",
      jumlah_wanita: rw.jumlah_wanita || "",
      jumlah_kk: rw.jumlah_kk || "",
      no_hp: rw.no_hp || "",
      deskripsi: rw.deskripsi || "",
      image_rw: null,
    });
    setImageUrl(`https://website.fahri.life/api/images/${rw.image_rw}`);
    setOpen(true);
  };

  const handleOpenConfirm = (id) => {
    setIdToDelete(id);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setIdToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://website.fahri.life/api/rw/${idToDelete}`);
      alert("Data berhasil dihapus");
      setIdToDelete(null);
      setOpenConfirm(false);
      fetchData();
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      alert("Gagal menghapus data");
    }
  };

  const filteredRWData = rwData.filter((rw) =>
    rw.nama_RW.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRWData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredRWData.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="flex-auto">
      <Sidebar activeComponent="Peta Wilayah" />
      <section id="content" className="flex-grow">
        <Navbar activeComponent={"Peta Wilayah"} />
        <div className="p-4">
          <div className="container mx-auto mt-6 order p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold text-center">Data RW</h2>
            <button
              onClick={handleOpen}
              className="bg-blue-500 text-white rounded-md py-2 px-4"
            >
              Tambah Data
            </button>
          </div>
          <div className="container mx-auto mt-6 order p-4 bg-white shadow-md rounded-md">
            <input
              type="text"
              className="mb-4 p-2 border border-gray-300 rounded w-1/2"
              placeholder="Search Nama RW"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">No</th>
                  <th className="border p-2">Foto</th>
                  <th className="border p-2">Nama RW</th>
                  <th className="border p-2">Latitude Longitude</th>
                  <th className="border p-2">Nama Ketua RW</th>
                  <th className="border p-2">Nomor HP</th>
                  <th className="border p-2">Jumlah Pria</th>
                  <th className="border p-2">Jumlah Wanita</th>
                  <th className="border p-2">Jumlah KK</th>
                  <th className="border p-2">Deskripsi</th>
                  <th className="border p-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((rw, index) => (
                  <tr key={rw.id_RW}>
                    <td className="border p-2 text-center">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </td>
                    <td className="border p-2">
                      <img
                        src={`https://website.fahri.life/api/images/${rw.image_rw}`}
                        alt="rw"
                        className="w-24 h-24 object-cover"
                      />
                    </td>
                    <td className="border p-2">{rw.nama_RW}</td>
                    <td className="border p-2">{rw.latLong}</td>
                    <td className="border p-2">{rw.nama_ketua_rw}</td>
                    <td className="border p-2">{rw.no_hp}</td>
                    <td className="border p-2">{rw.jumlah_pria}</td>
                    <td className="border p-2">{rw.jumlah_wanita}</td>
                    <td className="border p-2">{rw.jumlah_kk}</td>
                    <td className="border p-2">{rw.deskripsi}</td>
                    <td className="border p-2 flex space-x-2">
                      <button
                        onClick={() => handleEdit(rw)}
                        className="text-yellow-500 hover:text-yellow-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleOpenConfirm(rw.id_RW)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center items-center mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-96">
              <h2>{selectedRW ? "Edit Data RW" : "Tambah Data RW"}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="latLong"
                  placeholder="Latitude Longitude"
                  value={formData.latLong}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
                <input
                  type="text"
                  name="nama_RW"
                  placeholder="Nama RW"
                  value={formData.nama_RW}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
                <input
                  type="text"
                  name="nama_ketua_rw"
                  placeholder="Nama Ketua RW"
                  value={formData.nama_ketua_rw}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
                <input
                  type="text"
                  name="jumlah_pria"
                  placeholder="Jumlah Pria"
                  value={formData.jumlah_pria}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
                <input
                  type="text"
                  name="jumlah_wanita"
                  placeholder="Jumlah Wanita"
                  value={formData.jumlah_wanita}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
                <input
                  type="text"
                  name="jumlah_kk"
                  placeholder="Jumlah KK"
                  value={formData.jumlah_kk}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
                <input
                  type="text"
                  name="no_hp"
                  placeholder="Nomor Hp"
                  value={formData.no_hp}
                  onChange={handleChangeNumberHp}
                  className="w-full px-4 py-2 border rounded"
                />
                {formData.no_hpError && (
                  <div className="text-red-500">{formData.no_hpError}</div>
                )}
                <textarea
                  name="deskripsi"
                  placeholder="Deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                ></textarea>
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleFileChange}
                  className="w-full"
                />
                {imageUrl && (
                  <div>
                    <img
                      src={imageUrl}
                      alt="preview"
                      className="w-24 h-24 object-cover mt-2"
                    />
                  </div>
                )}
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}

        {openConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-lg font-semibold">Konfirmasi Hapus</h2>
              <p>
                Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak
                dapat dibatalkan.
              </p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleCloseConfirm}
                  className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default MarkerRw;
