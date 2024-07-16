import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import Sidebar from "../../../components/admin/Sidebar";
import Navbar from "../../../components/admin/Navbar";

function ArsipAhliWaris() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const [selectSurat, setSelectSurat] = useState({
    id: "",
    nama_pemberi: "",
    tanggal: "",
    jenis_kelamin_pemberi: "",
    tempat_lahir_pemberi: "",
    tanggal_lahir_pemberi: "",
    pekerjaan_pemberi: "",
    agama_pemberi: "",
    alamat_pemberi: "",
    status_admin: "",
    nama_penerima: "",
    jenis_kelamin_penerima: "",
    tempat_lahir_penerima: "",
    tanggal_lahir_penerima: "",
    pekerjaan_penerima: "",
    agama_penerima: "",
    alamat_penerima: "",
    keperluan: "",
    ktp_image: "",
    no_telepon: "",
    email: "",
    alamat: "",
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
        "http://localhost:5050/api/lihat-surat-diterima-ahli-waris"
      );

      const sortedData = response.data.data.sort(
        (a, b) => new Date(a.tanggal) - new Date(b.tanggal)
      );

      const reversedData = sortedData.reverse();

      setData(reversedData);
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
        .delete(`http://localhost:5050/api/hapus-surat-ahli-waris/${id}`)
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
          `http://localhost:5050/api/update-all-surat-ahli-waris/${id}`,
          selectSurat
        )
        .then((res) => {
          console.log("Data berhasil diubah");
          setShowEditModal(false);
          fetchData();
          location.reload();
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
            <h3 className="text-center text-2xl font-bold mb-4">
              Arsip Surat Keterangan Ahli Waris
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
                  <th className="border p-2">Nama Pemberi</th>
                  <th className="border p-2">Nama Penerima</th>
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
                          src={`http://localhost:5050/api/images/${surat.ktp_image}`}
                          alt={surat.nama_pemberi}
                          className="w-16 h-16 object-cover"
                        />
                      )}
                    </td>
                    <td className="border p-2">{surat.nomor_surat}</td>
                    <td className="border p-2">
                      {new Date(surat.tanggal).toLocaleDateString()}
                    </td>
                    <td className="border p-2">{surat.nama_pemberi}</td>
                    <td className="border p-2">{surat.nama_penerima}</td>
                    <td className="border p-2">{surat.alamat_pemberi}</td>
                    <td className="border p-2 flex space-x-2">
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
              <label htmlFor="nama_pemberi">Nama Pemberi</label>
              <input
                type="text"
                id="nama_pemberi"
                name="nama_pemberi"
                className="form-control hover:bg-gray-200"
                value={selectSurat.nama_pemberi}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="tempat_lahir_pemberi">Tempat Lahir Pemberi</label>
              <input
                type="text"
                id="tempat_lahir_pemberi"
                name="tempat_lahir_pemberi"
                className="form-control hover:bg-gray-200"
                value={selectSurat.tempat_lahir_pemberi}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="tanggal_lahir_pemberi">
                Tanggal Lahir Pemberi
              </label>
              <input
                type="date"
                id="tanggal_lahir_pemberi"
                name="tanggal_lahir_pemberi"
                className="form-control hover:bg-gray-200"
                value={selectSurat.tanggal_lahir_pemberi}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="jenis_kelamin_pemberi">
                Jenis Kelamin Pemberi
              </label>
              <input
                type="text"
                id="jenis_kelamin_pemberi"
                name="jenis_kelamin_pemberi"
                className="form-control hover:bg-gray-200"
                value={selectSurat.jenis_kelamin_pemberi}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="agama_pemberi">Agama Pemberi</label>
              <input
                type="text"
                id="agama_pemberi"
                name="agama_pemberi"
                className="form-control hover:bg-gray-200"
                value={selectSurat.agama_pemberi}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pekerjaan_pemberi">Pekerjaan Pemberi</label>
              <input
                type="text"
                id="pekerjaan_pemberi"
                name="pekerjaan_pemberi"
                className="form-control hover:bg-gray-200"
                value={selectSurat.pekerjaan_pemberi}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="alamat_pemberi">Alamat Pemberi</label>
              <input
                type="text"
                id="alamat_pemberi"
                name="alamat_pemberi"
                className="form-control hover:bg-gray-200"
                value={selectSurat.alamat_pemberi}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="nama_penerima">Nama Penerima</label>
              <input
                type="text"
                id="nama_penerima"
                name="nama_penerima"
                className="form-control hover:bg-gray-200"
                value={selectSurat.nama_penerima}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="tempat_lahir_penerima">
                Tempat Lahir Penerima
              </label>
              <input
                type="text"
                id="tempat_lahir_penerima"
                name="tempat_lahir_penerima"
                className="form-control hover:bg-gray-200"
                value={selectSurat.tempat_lahir_penerima}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="tanggal_lahir_penerima">
                Tanggal Lahir Penerima
              </label>
              <input
                type="date"
                id="tanggal_lahir_penerima"
                name="tanggal_lahir_penerima"
                className="form-control hover:bg-gray-200"
                value={selectSurat.tanggal_lahir_penerima}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="jenis_kelamin_penerima">
                Jenis Kelamin Penerima
              </label>
              <input
                type="text"
                id="jenis_kelamin_penerima"
                name="jenis_kelamin_penerima"
                className="form-control hover:bg-gray-200"
                value={selectSurat.jenis_kelamin_penerima}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="agama_penerima">Agama Penerima</label>
              <input
                type="text"
                id="agama_penerima"
                name="agama_penerima"
                className="form-control hover:bg-gray-200"
                value={selectSurat.agama_penerima}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pekerjaan_penerima">Pekerjaan Penerima</label>
              <input
                type="text"
                id="pekerjaan_penerima"
                name="pekerjaan_penerima"
                className="form-control hover:bg-gray-200"
                value={selectSurat.pekerjaan_penerima}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="alamat_penerima">Alamat Penerima</label>
              <input
                type="text"
                id="alamat_penerima"
                name="alamat_penerima"
                className="form-control hover:bg-gray-200"
                value={selectSurat.alamat_penerima}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="keperluan">Keperluan</label>
              <input
                type="text"
                id="keperluan"
                name="keperluan"
                className="form-control hover:bg-gray-200"
                value={selectSurat.keperluan}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ktp_image">KTP Image</label>
              <input
                type="text"
                id="ktp_image"
                name="ktp_image"
                className="form-control hover:bg-gray-200"
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
                className="form-control hover:bg-gray-200"
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
                className="form-control hover:bg-gray-200"
                value={selectSurat.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="status_admin">Status Admin</label>
              <select
                id="status_admin"
                name="status_admin"
                className="form-control hover:bg-gray-200"
                value={selectSurat.status_admin}
                onChange={handleChange}
              >
                <option value="menunggu">Menunggu</option>
                <option value="diterima">Diterima</option>
              </select>
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

export default ArsipAhliWaris;
