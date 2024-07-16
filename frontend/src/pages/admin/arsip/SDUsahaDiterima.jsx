import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import Sidebar from "../../../components/admin/Sidebar";
import Navbar from "../../../components/admin/Navbar";

function SDUsahaDiterima() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const [selectSurat, setSelectSurat] = useState({
    id: "",
    nama: "",
    nip: "",
    alamat_kantor: "",
    nama_usaha: "",
    alamat_perusahan: "",
    jenis_usaha: "",
    nama_pempinan: "",
    ktp: "",
    alamat: "",
    status_admin: "",
    keperluan: "",
    no_telepon: "",
    email: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://website.fahri.life/api/lihat-surat-diterima-domisili"
      );
      setData(response.data.data.reverse());
    } catch (error) {
      console.error("Error fetching data:", error);
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
        .delete(`https://website.fahri.life/api/hapus-surat-domisili/${id}`)
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
          `https://website.fahri.life/api/update-all-domisili/${id}`,
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
      <Sidebar activeComponent="Arsip" />
      <section id="content" className="flex-1">
        <Navbar />
        <div className="p-6">
          <div className="container mx-auto mt-6 order p-4 bg-white shadow-md rounded-md">
            <h3 className="text-center text-2xl font-bold mb-4">
              Arsip Domisili Usaha
            </h3>
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
                  <th className="border p-2">Alamat Kantor</th>
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
                    <td className="border p-2">{surat.jenis_surat}</td>
                    <td className="border p-2">{surat.alamat_kantor}</td>
                    <td className="border p-2 flex space-x-2">
                      <Link
                        to={`/format-surat-domisili/${surat.id}`}
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
              <span>
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
              <label htmlFor="nip">NIP</label>
              <input
                type="text"
                id="nip"
                name="nip"
                className="form-control  hover:bg-gray-200"
                value={selectSurat.nip}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="alamat_kantor">Alamat Kantor</label>
              <input
                type="text"
                id="alamat_kantor"
                name="alamat_kantor"
                className="form-control  hover:bg-gray-200"
                value={selectSurat.alamat_kantor}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="nama_usaha">Nama Usaha</label>
              <input
                type="text"
                id="nama_usaha"
                name="nama_usaha"
                className="form-control  hover:bg-gray-200"
                value={selectSurat.nama_usaha}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="alamat_perusahan">Alamat Perusahaan</label>
              <input
                type="text"
                id="alamat_perusahan"
                name="alamat_perusahan"
                className="form-control  hover:bg-gray-200"
                value={selectSurat.alamat_perusahan}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="jenis_usaha">Jenis Usaha</label>
              <input
                type="text"
                id="jenis_usaha"
                name="jenis_usaha"
                className="form-control  hover:bg-gray-200"
                value={selectSurat.jenis_usaha}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="nama_pempinan">Nama Pempinan</label>
              <input
                type="text"
                id="nama_pempinan"
                name="nama_pempinan"
                className="form-control  hover:bg-gray-200"
                value={selectSurat.nama_pempinan}
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

export default SDUsahaDiterima;
