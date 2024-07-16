import React, { useState, useEffect } from "react";
import axios from "axios";
// import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import Sidebar from "../../../components/admin/Sidebar";
import Navbar from "../../../components/admin/Navbar";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaEye, FaTrash } from "react-icons/fa";

function ArsipKetTidakMampuPendidikan() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const [selectSurat, setSelectSurat] = useState({
    id: "",
    nama: "",
    tempat_lahir: "",
    tempat_tanggal_lahir: "",
    jenis_kelamin: "",
    agama: "",
    pekerjaan: "",
    alamat: "",
    rt_rw: "",
    status_admin: "",
    keperluan: "",
    ktp: "",
    ktp_image: "",
    no_telepon: "",
    email: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://website.fahri.life/api/lihat-surat-tidak-mampu-pendidikan-terima"
      );

      if (response.data && response.data.skckData) {
        const sortedData = response.data.skckData.sort(
          (a, b) => new Date(a.tanggal) - new Date(b.tanggal)
        );

        const reversedData = sortedData.reverse();

        setData(reversedData);
      } else {
        console.error("Data format error:", response.data);
        alert("Invalid data format received from server.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Please try again later.");
    }
  };

  const showDeleteConfirmation = (data) => {
    setSelectSurat(data);
    setShowDeleteModal(true);
  };

  const handleDeleteClick = () => {
    if (selectSurat.id) {
      const id = selectSurat.id;
      axios
        .delete(
          `https://website.fahri.life/api/hapus-surat-domisili-umum/${id}`
        )
        .then((res) => {
          console.log("Data berhasil dihapus");
          setShowDeleteModal(false);
          fetchData();
        })
        .catch((err) => console.log(err));
    }
  };

  const showEditModalHandler = (data) => {
    setSelectSurat(data);
    setShowEditModal(true);
  };

  const handleEditClick = () => {
    if (selectSurat.id) {
      const id = selectSurat.id;
      axios
        .put(
          `https://website.fahri.life/api/update-all-surat-tidak-mampu/${id}`,
          selectSurat
        )
        .then((res) => {
          console.log("Data berhasil diubah");
          setShowEditModal(false);
          fetchData();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectSurat((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const filteredData = data.filter((surat) =>
    surat.nomor_surat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="flex-auto">
      <Sidebar activeComponent="Permintaan" />
      <section id="content" className="flex-auto">
        <Navbar />
        <div className="p-6">
          <div className="container mx-auto mt-6 order p-4 bg-white shadow-md rounded-md">
            <h3 className="text-center text-2xl font-bold mb-4">Arsip</h3>
            <input
              type="text"
              className="form-control mb-4 p-2 border border-gray-300 rounded w-1/2"
              placeholder="Cari nomor pendaftaran"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">No</th>
                  <th className="border p-2">Gambar</th>
                  <th className="border p-2">No Pendaftaran</th>
                  <th className="border p-2">Tanggal</th>
                  <th className="border p-2">Nama</th>
                  <th className="border p-2">Jenis Surat</th>
                  <th className="border p-2">Alamat</th>
                  <th className="border p-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((surat, index) => (
                  <tr key={surat.id} className="border-b hover:bg-gray-200">
                    <td className="border p-2">
                      {index + 1 + indexOfFirstItem}
                    </td>
                    <td className="border p-2">
                      {surat.ktp_image && (
                        <img
                          src={`https://website.fahri.life/api/images/${surat.ktp_image}`}
                          alt={surat.nama}
                          className="w-16 h-16 object-cover"
                        />
                      )}
                    </td>
                    <td className="border p-2">{surat.nomor_surat}</td>
                    <td className="border p-2">
                      {new Date(surat.tanggal).toLocaleDateString()}
                    </td>
                    <td className="border p-2">{surat.nama}</td>
                    <td className="border p-2">{surat.surat_tidak_mampu}</td>
                    <td className="border p-2">{surat.alamat}</td>
                    <td className="border p-2 flex space-x-2">
                      <Link
                        to={`/format-surat-tidak-mampu-pendidikan/${surat.id}`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEye />
                      </Link>
                      <button
                        onClick={() => showEditModalHandler(surat)}
                        className="text-yellow-500 hover:text-yellow-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => showDeleteConfirmation(surat)}
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
                className="btn btn-primary"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Sebelumnya
              </button>
              <span className="mx-4">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-primary"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </section>

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        backdropClassName="custom-backdrop"
        style={{ color: "black" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus Surat</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda yakin ingin menghapus surat ini?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleDeleteClick}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        backdropClassName="custom-backdrop"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Surat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="nama">Nama</label>
              <input
                type="text"
                id="nama"
                name="nama"
                className="form-control  hover:bg-gray-200"
                value={selectSurat.nama}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="tempat_lahir">Tempat Lahir</label>
              <input
                type="text"
                id="tempat_lahir"
                name="tempat_lahir"
                className="form-control  hover:bg-gray-200"
                value={selectSurat.tempat_lahir}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="tempat_tanggal_lahir">Tanggal Lahir</label>
              <input
                type="text"
                id="tempat_tanggal_lahir"
                name="tempat_tanggal_lahir"
                className="form-control  hover:bg-gray-200"
                value={selectSurat.tempat_tanggal_lahir}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="jenis_kelamin">Jenis Kelamin</label>
              <input
                type="text"
                id="jenis_kelamin"
                name="jenis_kelamin"
                className="form-control  hover:bg-gray-200"
                value={selectSurat.jenis_kelamin}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="agama">Agama</label>
              <input
                type="text"
                id="agama"
                name="agama"
                className="form-control  hover:bg-gray-200"
                value={selectSurat.agama}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pekerjaan">Pekerjaan</label>
              <input
                type="text"
                id="pekerjaan"
                name="pekerjaan"
                className="form-control  hover:bg-gray-200"
                value={selectSurat.pekerjaan}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="alamat">Alamat</label>
              <input
                type="text"
                id="alamat"
                name="alamat"
                className="form-control  hover:bg-gray-200"
                value={selectSurat.alamat}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="rt_rw">RT/RW</label>
              <input
                type="text"
                id="rt_rw"
                name="rt_rw"
                className="form-control  hover:bg-gray-200"
                value={selectSurat.rt_rw}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="status_admin">Status Admin</label>
              <select
                id="status_admin"
                name="status_admin"
                className="form-control  hover:bg-gray-200"
                value={selectSurat.status_admin}
                onChange={handleChange}
              >
                <option value="menunggu">Menunggu</option>
                <option value="diterima">Diterima</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="keperluan">Keperluan</label>
              <input
                type="text"
                id="keperluan"
                name="keperluan"
                className="form-control  hover:bg-gray-200"
                value={selectSurat.keperluan}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ktp">KTP</label>
              <input
                type="text"
                id="ktp"
                name="ktp"
                className="form-control  hover:bg-gray-200"
                value={selectSurat.ktp}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ktp_image">KTP Image</label>
              <input
                type="text"
                id="ktp_image"
                name="ktp_image"
                className="form-control  hover:bg-gray-200"
                value={selectSurat.ktp_image}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="no_telepon">No Telepon</label>
              <input
                type="text"
                id="no_telepon"
                name="no_telepon"
                className="form-control  hover:bg-gray-200"
                value={selectSurat.no_telepon}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                className="form-control  hover:bg-gray-200"
                value={selectSurat.email}
                onChange={handleChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleEditClick}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ArsipKetTidakMampuPendidikan;
