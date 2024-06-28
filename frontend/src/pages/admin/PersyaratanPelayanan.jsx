import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Table } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";

function PersyaratanPelayanan() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [pelayanan, setPelayanan] = useState("");
  const [pelayananList, setPelayananList] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowEditModal = (pelayanan) => {
    setEditId(pelayanan.id);
    setPelayanan(pelayanan.pelayanan);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => setShowEditModal(false);

  const handlePalayananChange = (value) => setPelayanan(value);

  const fetchPelayanan = async () => {
    try {
      const response = await axios.get("https://dolfis.store/api/pelayanan");
      setPelayananList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPelayanan();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { pelayanan };

    try {
      await axios.post("https://dolfis.store/api/pelayanan", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchPelayanan();
      handleCloseModal();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = { pelayanan };

    try {
      await axios.put(
        `https://dolfis.store/api/pelayanan/${editId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fetchPelayanan();
      handleCloseEditModal();
    } catch (error) {
      console.error("Error editing data:", error);
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "list",
    "bullet",
    "bold",
    "italic",
    "underline",
    "color",
    "background",
    "align",
    "link",
    "image",
    "video",
  ];

  return (
    <div className="flex-auto">
      <Sidebar activeComponent="Persyaratan" />
      <section id="content" className="flex-grow">
        <Navbar />
        <div className="p-4">
          {/* <Button
            variant="primary"
            onClick={handleShowModal}
            style={{ marginTop: "20px" }}
          >
            Tambah Data pelayanan
          </Button> */}

          <Table striped bordered hover style={{ marginTop: "20px" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Pelayanan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pelayananList.map((pelayanan, index) => (
                <tr key={pelayanan.id}>
                  <td>{index + 1}</td>
                  <td
                    dangerouslySetInnerHTML={{
                      __html: pelayanan.pelayanan,
                    }}
                  ></td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleShowEditModal(pelayanan)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal
            show={showModal}
            onHide={handleCloseModal}
            className="custom-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title>Tambah Data Pelayanan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formPelayanan">
                  <Form.Label>Pelayanan</Form.Label>
                  <ReactQuill
                    theme="snow"
                    value={pelayanan}
                    onChange={handlePalayananChange}
                    modules={quillModules}
                    formats={quillFormats}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Simpan
                </Button>
              </Form>
            </Modal.Body>
          </Modal>

          <Modal
            show={showEditModal}
            onHide={handleCloseEditModal}
            className="custom-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Data Pelayanan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleEditSubmit}>
                <Form.Group controlId="formPelayanan">
                  <Form.Label>Pelayanan</Form.Label>
                  <ReactQuill
                    theme="snow"
                    value={pelayanan}
                    onChange={handlePalayananChange}
                    modules={quillModules}
                    formats={quillFormats}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Simpan
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </section>
    </div>
  );
}

export default PersyaratanPelayanan;
