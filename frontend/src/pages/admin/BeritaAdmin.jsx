import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../css/admin/pesan.css";
import { FaPlus, FaEdit, FaEye, FaTrash } from "react-icons/fa";

function BeritaAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  // const [tags, setTags] = useState("");
  const [status, setStatus] = useState("draft");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [newsList, setNewsList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleShowEditModal = (news) => {
    setEditId(news.id);
    setTitle(news.title);
    setContent(news.content);
    setAuthor(news.author);
    setCategory(news.category);
    // setTags(news.tags);
    setStatus(news.status);
    setImage(null);
    setImageUrl(`http://localhost:5050/images/${news.image_url}`);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setImageUrl("");
    resetForm();
  };

  const handleShowDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setAuthor("");
    setCategory("");
    // setTags("");
    setStatus("draft");
    setImage(null);
    setImageUrl("");
  };

  const fetchNews = async () => {
    try {
      const response = await axios.get("http://localhost:5050/news");
      setNewsList(response.data.Result.reverse());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);
    formData.append("category", category);
    // formData.append("tags", tags);
    formData.append("status", status);
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:5050/news", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchNews();
      handleCloseModal();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);
    formData.append("category", category);
    // formData.append("tags", tags);
    formData.append("status", status);
    if (image) formData.append("image", image);

    try {
      await axios.put(`http://localhost:5050/news/${editId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchNews();
      handleCloseEditModal();
    } catch (error) {
      console.error("Error editing data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5050/news/${deleteId}`);
      fetchNews();
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const filteredNewsList = newsList.filter((news) =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNewsList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredNewsList.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="flex-auto">
      <Sidebar activeComponent="Berita" />
      <section id="content" className="flex-grow">
        <Navbar />
        <div className="p-4">
          <div className="container mx-auto mt-6 order p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold text-center">
              Berita & Pengumuman
            </h2>
            <button
              onClick={handleShowModal}
              className="bg-blue-500 text-white rounded-md py-2 px-4"
            >
              Tambah Berita
            </button>
          </div>
          <div className="container mx-auto mt-6 order p-4 bg-white shadow-md rounded-md">
            <input
              type="text"
              className="mb-4 p-2 border border-gray-300 rounded w-1/2"
              placeholder="Search title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">No</th>
                  <th className="border p-2">Image</th>
                  <th className="border p-2">Title</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Author</th>
                  <th className="border p-2">Category</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((news, index) => (
                  <tr key={news.id}>
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2">
                      <img
                        src={`http://localhost:5050/images/${news.image_url}`}
                        alt="News"
                        className="w-24 h-24 object-cover"
                      />
                    </td>
                    <td className="border p-2">{news.title}</td>
                    <td className="border p-2">
                      {new Date(news.created_at).toLocaleDateString()}
                    </td>
                    <td className="border p-2">{news.author}</td>
                    <td className="border p-2">{news.category}</td>

                    <td className="border p-2 flex space-x-2">
                      <button
                        onClick={() => handleShowEditModal(news)}
                        className="text-yellow-500 hover:text-yellow-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleShowDeleteModal(news.id)}
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

          {/* Tambah Berita Modal */}
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
                          Tambah Berita
                        </h3>
                        <br />
                        <br />
                        <div className="mt-2">
                          <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Judul
                              </label>
                              <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                                required
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Konten
                              </label>
                              <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
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
                                Penulis
                              </label>
                              <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Kategori
                              </label>
                              <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                            </div>
                            {/* <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Tag
                              </label>
                              <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                            </div> */}
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Status
                              </label>
                              <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                              </select>
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

          {/* Edit Berita Modal */}
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
                          Edit Berita
                        </h3>
                        <div className="mt-2">
                          <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Judul
                              </label>
                              <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                                required
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Konten
                              </label>
                              <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
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
                                Penulis
                              </label>
                              <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Kategori
                              </label>
                              <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                            </div>
                            {/* <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Tag
                              </label>
                              <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                            </div> */}
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Status
                              </label>
                              <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                              </select>
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

          {/* Konfirmasi Hapus Modal */}
          {showDeleteModal && (
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
                          Konfirmasi Hapus
                        </h3>
                        <div className="mt-2">
                          <p>Apakah Anda yakin ingin menghapus berita ini?</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-600 text-white rounded-md py-2 px-4 ml-3"
                      >
                        Hapus
                      </button>
                      <button
                        type="button"
                        onClick={handleCloseDeleteModal}
                        className="bg-gray-500 text-white rounded-md py-2 px-4"
                      >
                        Batal
                      </button>
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

export default BeritaAdmin;
