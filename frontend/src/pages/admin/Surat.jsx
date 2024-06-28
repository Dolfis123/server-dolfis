import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaEye, FaTrash } from "react-icons/fa";

function Surat() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSurat, setNewSurat] = useState({
    nama: "",
    nip: "",
    alamat_kantor: "",
    nama_usaha: "",
    alamat_perusahan: "",
    jenis_usaha: "",
    nama_pempinan: "",
    ktp: "",
    alamat: "",
    // status_admin: "",
    keperluan: "",
    no_telepon: "",
    email: "",
    ktp_image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [ktpErrorMessage, setKtpErrorMessage] = useState("");
  const [nipErrorMessage, setNipErrorMessage] = useState("");

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewSurat((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewSurat((prevState) => ({
      ...prevState,
      ktp_image: file,
    }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleChangeKtp = (event) => {
    const inputValue = event.target.value;
    if (/^\d{0,16}$/.test(inputValue)) {
      setNewSurat((prevState) => ({
        ...prevState,
        ktp: inputValue,
      }));
      setKtpErrorMessage(
        inputValue.length === 16 ? "" : "Nomor KTP harus terdiri dari 16 digit."
      );
    } else {
      setKtpErrorMessage("Nomor KTP harus terdiri dari 16 digit.");
    }
  };

  const handleChangeNip = (event) => {
    const inputValue = event.target.value;
    if (/^\d{0,18}$/.test(inputValue)) {
      setNewSurat((prevState) => ({
        ...prevState,
        nip: inputValue,
      }));
      setNipErrorMessage(
        inputValue.length === 18 || inputValue.length === 0
          ? ""
          : "Nomor NIP harus terdiri dari 18 digit atau bisa dikosongkan."
      );
    } else {
      setNipErrorMessage(
        "Nomor NIP harus terdiri dari 18 digit atau bisa dikosongkan."
      );
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in newSurat) {
      formData.append(key, newSurat[key]);
    }
    axios
      .post(
        "https://dolfis.store/api/buat-surat-domisili-diterimasi",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log("Surat berhasil dibuat");
        setShowAddModal(false);
        location.reload();
      })
      .catch((err) => console.error("Error creating surat:", err));
  };

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
    // status_admin: "",
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
        "https://dolfis.store/api/lihat-surat-diterima-domisili"
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
        .delete(`https://dolfis.store/api/hapus-surat-domisili/${id}`)
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
        .put(`https://dolfis.store/api/update-all-domisili/${id}`, selectSurat)
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
      {/* SIDEBAR */}
      <Sidebar activeComponent="Surat" />
      {/* CONTENT */}
      <section id="content" className="flex-1">
        {/* NAVBAR */}
        <Navbar />
        {/* MAIN */}
        <main className="p-6">
          <div className="container mx-auto mt-6 order p-4 bg-white shadow-md rounded-md">
            <h3 className="text-center text-2xl font-bold mb-4">
              Surat Domisili Usaha
            </h3>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded mb-3 flex items-center"
            >
              <FaPlus className="mr-2" /> Tambah Surat
            </Button>
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Tambah Surat Baru</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleAddSubmit}>
                  <Form.Group controlId="formNama">
                    <Form.Label>Nama</Form.Label>
                    <Form.Control
                      type="text"
                      name="nama"
                      className="border-b hover:bg-gray-200"
                      value={newSurat.nama}
                      onChange={handleAddChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formNip">
                    <Form.Label>NIP</Form.Label>
                    <Form.Control
                      type="text"
                      name="nip"
                      value={newSurat.nip}
                      onChange={handleChangeNip}
                      className="border-b hover:bg-gray-200"
                    />
                    {nipErrorMessage && (
                      <div className="text-red-500">{nipErrorMessage}</div>
                    )}
                  </Form.Group>
                  <Form.Group controlId="formAlamatKantor">
                    <Form.Label>Alamat Kantor</Form.Label>
                    <Form.Control
                      as="textarea" // Mengubah tipe dari text menjadi textarea
                      name="alamat_kantor"
                      value={newSurat.alamat_kantor}
                      onChange={handleAddChange}
                      className="border-b hover:bg-gray-200"
                    />
                  </Form.Group>
                  <Form.Group controlId="formNamaUsaha">
                    <Form.Label>Nama Usaha</Form.Label>
                    <Form.Control
                      type="text"
                      name="nama_usaha"
                      value={newSurat.nama_usaha}
                      onChange={handleAddChange}
                      className="border-b hover:bg-gray-200"
                    />
                  </Form.Group>
                  <Form.Group controlId="formAlamatPerusahan">
                    <Form.Label>Alamat Perusahaan</Form.Label>
                    <Form.Control
                      as="textarea" // Mengubah tipe dari text menjadi textarea
                      name="alamat_perusahan"
                      value={newSurat.alamat_perusahan}
                      onChange={handleAddChange}
                      className="border-b hover:bg-gray-200"
                    />
                  </Form.Group>
                  <Form.Group controlId="formJenisUsaha">
                    <Form.Label>Jenis Usaha</Form.Label>
                    <Form.Control
                      type="text"
                      name="jenis_usaha"
                      value={newSurat.jenis_usaha}
                      onChange={handleAddChange}
                      className="border-b hover:bg-gray-200"
                    />
                  </Form.Group>
                  <Form.Group controlId="formNamaPempinan">
                    <Form.Label>Nama Pimpinan</Form.Label>
                    <Form.Control
                      type="text"
                      name="nama_pempinan"
                      value={newSurat.nama_pempinan}
                      onChange={handleAddChange}
                      className="border-b hover:bg-gray-200"
                    />
                  </Form.Group>
                  <Form.Group controlId="formKtp">
                    <Form.Label>KTP</Form.Label>
                    <Form.Control
                      type="text"
                      name="ktp"
                      value={newSurat.ktp}
                      onChange={handleChangeKtp}
                      className="border-b hover:bg-gray-200"
                    />
                    {ktpErrorMessage && (
                      <div className="text-red-500">{ktpErrorMessage}</div>
                    )}
                  </Form.Group>
                  <Form.Group controlId="formAlamat">
                    <Form.Label>Alamat</Form.Label>
                    <Form.Control
                      as="textarea" // Mengubah tipe dari text menjadi textarea
                      name="alamat"
                      value={newSurat.alamat}
                      onChange={handleAddChange}
                      className="border-b hover:bg-gray-200"
                    />
                  </Form.Group>

                  {/* <Form.Group controlId="formStatusAdmin">
                    <Form.Label>Status Admin</Form.Label>
                    <Form.Control
                      type="text"
                      name="status_admin"
                      value={newSurat.status_admin}
                      onChange={handleAddChange}
                      className="border-b hover:bg-gray-200"
                    />
                  </Form.Group> */}
                  <Form.Group controlId="formKeperluan">
                    <Form.Label>Keperluan</Form.Label>
                    <Form.Control
                      type="text"
                      name="keperluan"
                      value={newSurat.keperluan}
                      onChange={handleAddChange}
                      className="border-b hover:bg-gray-200"
                    />
                  </Form.Group>
                  <Form.Group controlId="formNoTelepon">
                    <Form.Label>No Telepon</Form.Label>
                    <Form.Control
                      type="text"
                      name="no_telepon"
                      value={newSurat.no_telepon}
                      onChange={handleAddChange}
                      className="border-b hover:bg-gray-200"
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={newSurat.email}
                      onChange={handleAddChange}
                      className="border-b hover:bg-gray-200"
                    />
                  </Form.Group>
                  <Form.Group controlId="formKtpImage">
                    <Form.Label>Upload KTP</Form.Label>
                    <Form.Control
                      type="file"
                      name="ktp_image"
                      onChange={handleFileChange}
                      className="border-b hover:bg-gray-200"
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ width: "100px", height: "100px" }}
                      />
                    )}
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
          </div>

          <div className="container mx-auto mt-6 order p-4 bg-white shadow-md rounded-md">
            <input
              type="text"
              className="form-control mb-4 p-2 border border-gray-300 rounded w-1/2"
              placeholder="Cari nomor pendaftaran"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 ">
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
                          src={`https://dolfis.store/api/images/${surat.ktp_image}`}
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
        </main>
      </section>

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        backdropClassName="custom-backdrop"
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
            <div className="form-group mb-4">
              <label htmlFor="nama">Nama</label>
              <input
                type="text"
                id="nama"
                name="nama"
                className="form-control p-2 border border-gray-300 rounded w-full border-b hover:bg-gray-200"
                value={selectSurat.nama}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="nip">NIP</label>
              <input
                type="text"
                id="nip"
                name="nip"
                className="form-control p-2 border border-gray-300 rounded border-b hover:bg-gray-200"
                value={selectSurat.nip}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="alamat_kantor">Alamat Kantor</label>
              <input
                type="text"
                id="alamat_kantor"
                name="alamat_kantor"
                className="form-control p-2 border border-gray-300 rounded border-b hover:bg-gray-200"
                value={selectSurat.alamat_kantor}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="nama_usaha">Nama Usaha</label>
              <input
                type="text"
                id="nama_usaha"
                name="nama_usaha"
                className="form-control p-2 border border-gray-300 rounded border-b hover:bg-gray-200"
                value={selectSurat.nama_usaha}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="alamat_perusahan">Alamat Perusahaan</label>
              <input
                type="text"
                id="alamat_perusahan"
                name="alamat_perusahan"
                className="form-control p-2 border border-gray-300 rounded border-b hover:bg-gray-200"
                value={selectSurat.alamat_perusahan}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="jenis_usaha">Jenis Usaha</label>
              <input
                type="text"
                id="jenis_usaha"
                name="jenis_usaha"
                className="form-control p-2 border border-gray-300 rounded border-b hover:bg-gray-200"
                value={selectSurat.jenis_usaha}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="nama_pempinan">Nama Pempinan</label>
              <input
                type="text"
                id="nama_pempinan"
                name="nama_pempinan"
                className="form-control p-2 border border-gray-300 rounded border-b hover:bg-gray-200"
                value={selectSurat.nama_pempinan}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="ktp">KTP</label>
              <input
                type="text"
                id="ktp"
                name="ktp"
                className="form-control p-2 border border-gray-300 rounded border-b hover:bg-gray-200"
                value={selectSurat.ktp}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="alamat">Alamat</label>
              <input
                type="text"
                id="alamat"
                name="alamat"
                className="form-control p-2 border border-gray-300 rounded border-b hover:bg-gray-200"
                value={selectSurat.alamat}
                onChange={handleChange}
              />
            </div>
            {/* <div className="form-group mb-4">
              <label htmlFor="status_admin">Status Admin</label>
              <select
                id="status_admin"
                name="status_admin"
                className="form-control p-2 border border-gray-300 rounded border-b hover:bg-gray-200"
                value={selectSurat.status_admin}
                onChange={handleChange}
              >
                <option value="menunggu">Menunggu</option>
                <option value="diterima">Diterima</option>
              </select>
            </div> */}
            <div className="form-group mb-4">
              <label htmlFor="keperluan">Keperluan</label>
              <input
                type="text"
                id="keperluan"
                name="keperluan"
                className="form-control p-2 border border-gray-300 rounded border-b hover:bg-gray-200"
                value={selectSurat.keperluan}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="no_telepon">No Telepon</label>
              <input
                type="text"
                id="no_telepon"
                name="no_telepon"
                className="form-control p-2 border border-gray-300 rounded border-b hover:bg-gray-200"
                value={selectSurat.no_telepon}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                className="form-control p-2 border border-gray-300 rounded border-b hover:bg-gray-200"
                value={selectSurat.email}
                onChange={handleChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEditModal(false)}
            className="mr-2"
          >
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

export default Surat;
