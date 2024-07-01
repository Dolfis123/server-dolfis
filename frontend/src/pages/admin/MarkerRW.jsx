import React, { useState, useEffect } from "react";
import axios from "axios";
// import Topnavbar from "../../components/admin/Topnavbar";
import Navbar from "../../components/admin/Navbar";
// import Footer from "../../components/admin/Footer";

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
        console.log("URL endpoint:", "https://website.fahri.life/api/add");
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

  return (
    <div>
      {/* <Topnavbar /> */}
      <Navbar activeComponent={"Peta Wilayah"} />
      <div className="text-center mb-40">
        <div className="mt-3">
          <button
            onClick={handleOpen}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            <span className="material-symbols-outlined">add_location</span>{" "}
            Tambah Data
          </button>
        </div>
        {open && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-96">
              <h2>{selectedRW ? "Edit Maps" : "Tambah Maps"}</h2>
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
                    <img src={imageUrl} alt="preview" className="w-24 mt-2" />
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
        <div className="ml-64 mt-6">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Foto</th>
                <th className="border border-gray-300 px-4 py-2">Nama RW</th>
                <th className="border border-gray-300 px-4 py-2">
                  Latitude Longitude
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Nama Ketua RW
                </th>
                <th className="border border-gray-300 px-4 py-2">Nomor Hp</th>
                <th className="border border-gray-300 px-4 py-2">
                  Jumlah Pria
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Jumlah Wanita
                </th>
                <th className="border border-gray-300 px-4 py-2">Jumlah KK</th>
                <th className="border border-gray-300 px-4 py-2">Deskripsi</th>
                <th className="border border-gray-300 px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {rwData.map((rw) => (
                <tr key={rw.id_RW}>
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={`https://website.fahri.life/api/images/${rw.image_rw}`}
                      alt="rw"
                      className="w-24"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {rw.nama_RW}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {rw.latLong}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {rw.nama_ketua_rw}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {rw.no_hp}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {rw.jumlah_pria}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {rw.jumlah_wanita}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {rw.jumlah_kk}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {rw.deskripsi}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleEdit(rw)}
                      className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                    >
                      <span className="material-symbols-outlined">edit</span>{" "}
                      Edit
                    </button>
                    <button
                      onClick={() => handleOpenConfirm(rw.id_RW)}
                      className="bg-red-500 text-white py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {openConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-lg font-semibold">Confirm Delete</h2>
              <p>
                Are you sure you want to delete this data? This action cannot be
                undone.
              </p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleCloseConfirm}
                  className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                >
                  No
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default MarkerRw;
