import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../css/admin/pesan.css";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [pesan, setPesan] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [ucapanList, setUcapanList] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setPesan("");
    setImage(null);
    setImageUrl("");
  };

  const handleShowEditModal = (ucapan) => {
    setEditId(ucapan.id);
    setPesan(ucapan.pesan);
    setImage(null);
    setImageUrl(`https://website.fahri.life/api/images/${ucapan.image}`);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setPesan("");
    setImage(null);
    setImageUrl("");
  };

  const handlePesanChange = (value) => setPesan(value);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const fetchUcapan = async () => {
    try {
      const response = await axios.get(
        "https://website.fahri.life/api/lihat-ucapan"
      );
      setUcapanList(response.data.Result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUcapan();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pesan", pesan);
    formData.append("image", image);

    try {
      await axios.post("https://website.fahri.life/api/ucapan", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchUcapan();
      handleCloseModal();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pesan", pesan);
    if (image) formData.append("image", image);

    try {
      await axios.put(
        `https://website.fahri.life/api/edit-ucapan/${editId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchUcapan();
      handleCloseEditModal();
    } catch (error) {
      console.error("Error editing data:", error);
    }
  };

  return (
    <div className="flex-auto">
      <Sidebar activeComponent="Dashboard" />
      <section id="content" className="flex-grow">
        <Navbar />
        <div className="p-4">
          {/* <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <button
              onClick={handleShowModal}
              className="bg-blue-500 text-white rounded-md py-2 px-4"
            >
              Tambah Data Ucapan
            </button>
          </div> */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="w-1/12 px-6 py-3 border-b border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    #
                  </th>
                  <th className="w-2/12 px-6 py-3 border-b border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Gambar
                  </th>
                  <th className="w-6/12 px-6 py-3 border-b border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Pesan
                  </th>
                  <th className="w-3/12 px-6 py-3 border-b border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {ucapanList.map((ucapan, index) => (
                  <tr key={ucapan.id}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                      <img
                        src={`https://website.fahri.life/api/images/${ucapan.image}`}
                        alt="foto"
                        className="w-24 h-24 object-cover"
                      />
                    </td>
                    <td
                      className="px-6 py-4 whitespace-no-wrap border-b border-gray-300"
                      dangerouslySetInnerHTML={{ __html: ucapan.pesan }}
                    ></td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                      <button
                        onClick={() => handleShowEditModal(ucapan)}
                        className="bg-yellow-500 text-white rounded-md py-2 px-4"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tambah Data Ucapan Modal */}
          {showModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Tambah Data Ucapan
                        </h3>
                        <div className="mt-2">
                          <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Pesan
                              </label>
                              <ReactQuill
                                theme="snow"
                                value={pesan}
                                onChange={handlePesanChange}
                                modules={{
                                  toolbar: [
                                    [
                                      { header: "1" },
                                      { header: "2" },
                                      { font: [] },
                                    ],
                                    [{ list: "ordered" }, { list: "bullet" }],
                                    ["bold", "italic", "underline"],
                                    [{ color: [] }, { background: [] }],
                                    [{ align: [] }],
                                    ["link", "image", "video"],
                                    ["clean"],
                                  ],
                                }}
                                formats={[
                                  "header",
                                  "font",
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
                                ]}
                                required
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Gambar
                              </label>
                              <input
                                type="file"
                                onChange={handleImageChange}
                                className="w-full py-2 px-3 border rounded-lg"
                                required
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
                            </div>
                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={handleCloseModal}
                                className="bg-gray-500 text-white rounded-md py-2 px-4 mr-2"
                              >
                                Batal
                              </button>
                              <button
                                type="submit"
                                className="bg-blue-500 text-white rounded-md py-2 px-4"
                              >
                                Simpan
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Edit Data Ucapan Modal */}
          {showEditModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Edit Data Ucapan
                        </h3>
                        <div className="mt-2">
                          <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Pesan
                              </label>
                              <ReactQuill
                                theme="snow"
                                value={pesan}
                                onChange={handlePesanChange}
                                modules={{
                                  toolbar: [
                                    [
                                      { header: "1" },
                                      { header: "2" },
                                      { font: [] },
                                    ],
                                    [{ list: "ordered" }, { list: "bullet" }],
                                    ["bold", "italic", "underline"],
                                    [{ color: [] }, { background: [] }],
                                    [{ align: [] }],
                                    ["link", "image", "video"],
                                    ["clean"],
                                  ],
                                }}
                                formats={[
                                  "header",
                                  "font",
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
                                ]}
                                required
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Gambar
                              </label>
                              <input
                                type="file"
                                onChange={handleImageChange}
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                              <p className="text-sm text-gray-500 mt-1">
                                Kosongkan jika tidak ingin mengubah gambar.
                              </p>
                              {imageUrl && (
                                <div>
                                  <img
                                    src={imageUrl}
                                    alt="preview"
                                    className="w-24 h-24 object-cover mt-2"
                                  />
                                </div>
                              )}
                            </div>
                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={handleCloseEditModal}
                                className="bg-gray-500 text-white rounded-md py-2 px-4 mr-2"
                              >
                                Batal
                              </button>
                              <button
                                type="submit"
                                className="bg-blue-500 text-white rounded-md py-2 px-4"
                              >
                                Simpan
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
