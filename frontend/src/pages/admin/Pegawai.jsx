import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import axios from "axios";
import "../../css/admin/pesan.css";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

function Pegawai() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [full_name, setFullName] = useState("");
  const [nip, setNip] = useState("");
  const [address, setAddress] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [join_date, setJoinDate] = useState("");
  const [employment_status, setEmploymentStatus] = useState("active");
  // const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");
  const [marital_status, setMaritalStatus] = useState("");
  const [education, setEducation] = useState("");
  const [blood_type, setBloodType] = useState("");
  const [retirement_date, setRetirementDate] = useState("");
  const [nationality, setNationality] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
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

  const handleShowEditModal = (employee) => {
    console.log("Editing Employee:", employee); // Tambahkan log untuk melihat data pegawai
    setEditId(employee.employee_id);
    setFullName(employee.full_name);
    setNip(employee.nip);
    setAddress(employee.address);
    setBirthDate(employee.birth_date);
    setPhoneNumber(employee.phone_number);
    setEmail(employee.email);
    setPosition(employee.position);
    setJoinDate(employee.join_date);
    setEmploymentStatus(employee.employment_status);
    // setDepartment(employee.department);
    setGender(employee.gender);
    setMaritalStatus(employee.marital_status);
    setEducation(employee.education);
    setBloodType(employee.blood_type);
    setRetirementDate(employee.retirement_date);
    setNationality(employee.nationality);
    setPhoto(null);
    setPhotoUrl(`https://website.fahri.life/api/uploads/${employee.photo}`);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setPhotoUrl("");
    resetForm();
  };

  const handleShowDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
    setPhotoUrl(URL.createObjectURL(e.target.files[0]));
  };

  const resetForm = () => {
    setFullName("");
    setNip("");
    setAddress("");
    setBirthDate("");
    setPhoneNumber("");
    setEmail("");
    setPosition("");
    setJoinDate("");
    setEmploymentStatus("active");
    // setDepartment("");
    setGender("");
    setMaritalStatus("");
    setEducation("");
    setBloodType("");
    setRetirementDate("");
    setNationality("");
    setPhoto(null);
    setPhotoUrl("");
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "https://website.fahri.life/api/employees"
      );
      setEmployeeList(
        Array.isArray(response.data.data) ? response.data.data : []
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      setEmployeeList([]);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!full_name || !nip || !join_date || !employment_status) {
      console.error("Validation error: Missing required fields");
      return;
    }

    const formData = new FormData();
    formData.append("full_name", full_name);
    formData.append("nip", nip);
    formData.append("address", address);
    formData.append("birth_date", birth_date);
    formData.append("phone_number", phone_number);
    formData.append("email", email);
    formData.append("position", position);
    formData.append("join_date", join_date);
    formData.append("employment_status", employment_status);
    // formData.append("department", department);
    formData.append("gender", gender);
    formData.append("marital_status", marital_status);
    formData.append("education", education);
    formData.append("blood_type", blood_type);
    formData.append("retirement_date", retirement_date);
    formData.append("nationality", nationality);
    if (photo) formData.append("photo", photo);

    try {
      await axios.post("https://website.fahri.life/api/employees", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchEmployees();
      handleCloseModal();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("full_name", full_name);
    formData.append("nip", nip);
    formData.append("address", address);
    formData.append("birth_date", birth_date);
    formData.append("phone_number", phone_number);
    formData.append("email", email);
    formData.append("position", position);
    formData.append("join_date", join_date);
    formData.append("employment_status", employment_status);
    // formData.append("department", department);
    formData.append("gender", gender);
    formData.append("marital_status", marital_status);
    formData.append("education", education);
    formData.append("blood_type", blood_type);
    formData.append("retirement_date", retirement_date);
    formData.append("nationality", nationality);
    if (photo) formData.append("photo", photo);

    try {
      await axios.put(
        `https://website.fahri.life/api/employees/${editId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchEmployees();
      handleCloseEditModal();
    } catch (error) {
      console.error("Error editing data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://website.fahri.life/api/employees/${deleteId}`
      );
      fetchEmployees();
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const filteredEmployeeList = Array.isArray(employeeList)
    ? employeeList.filter((employee) =>
        employee.full_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEmployeeList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredEmployeeList.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="flex-auto">
      <Sidebar activeComponent="Pegawai" />
      <section id="content" className="flex-grow">
        <Navbar />
        <div className="p-4">
          <div className="container mx-auto mt-6 order p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold text-center">
              Pegawai Kelurahan Sowi
            </h2>
            <button
              onClick={handleShowModal}
              className="bg-blue-500 text-white rounded-md py-2 px-4"
            >
              Tambah Pegawai
            </button>
          </div>
          <div className="container mx-auto mt-6 order p-4 bg-white shadow-md rounded-md">
            <input
              type="text"
              className="mb-4 p-2 border border-gray-300 rounded w-1/2"
              placeholder="Search name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">No</th>
                  <th className="border p-2">Photo</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">NIP</th>
                  <th className="border p-2">Position</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((employee, index) => (
                  <tr key={employee.employee_id}>
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2">
                      <img
                        src={`https://website.fahri.life/api/uploads/${employee.photo}`}
                        alt="Employee"
                        className="w-24 h-24 object-cover"
                      />
                    </td>
                    <td className="border p-2">{employee.full_name}</td>
                    <td className="border p-2">{employee.nip}</td>
                    <td className="border p-2">{employee.position}</td>

                    <td className="border p-2 flex space-x-2">
                      <button
                        onClick={() => handleShowEditModal(employee)}
                        className="text-yellow-500 hover:text-yellow-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() =>
                          handleShowDeleteModal(employee.employee_id)
                        }
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

          {/* Add Employee Modal */}
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
                          Tambah Pegawai
                        </h3>
                        <br />
                        <div className="mt-2">
                          <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Nama lengkap
                              </label>
                              <input
                                type="text"
                                value={full_name}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                                required
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Nomor Induk Pegawai
                              </label>
                              <input
                                type="text"
                                value={nip}
                                onChange={(e) => setNip(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                                required
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Alamat tempat tinggal
                              </label>
                              <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Tanggal lahir
                              </label>
                              <input
                                type="date"
                                value={birth_date}
                                onChange={(e) => setBirthDate(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Nomor telepon
                              </label>
                              <input
                                type="text"
                                value={phone_number}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Alamat email
                              </label>
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Jabatan karyawan
                              </label>
                              <input
                                type="text"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Tanggal bergabung
                              </label>
                              <input
                                type="date"
                                value={join_date}
                                onChange={(e) => setJoinDate(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                                required
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                status kepegawaian
                              </label>
                              <select
                                value={employment_status}
                                onChange={(e) =>
                                  setEmploymentStatus(e.target.value)
                                }
                                className="w-full py-2 px-3 border rounded-lg"
                              >
                                <option value="aktif">aktif</option>
                                <option value="tidak aktif">tidak aktif</option>
                              </select>
                            </div>
                            {/* <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Nama departemen
                              </label>
                              <input
                                type="text"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                            </div> */}
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Jenis kelamin
                              </label>
                              <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              >
                                <option value="laki-laki">laki-laki</option>
                                <option value="wanita">wanita</option>
                              </select>
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Status pernikahan
                              </label>
                              <select
                                value={marital_status}
                                onChange={(e) =>
                                  setMaritalStatus(e.target.value)
                                }
                                className="w-full py-2 px-3 border rounded-lg"
                              >
                                <option value="Lajang">Lajang</option>
                                <option value="Telah menikah">
                                  Telah menikah
                                </option>
                                <option value="Cerai">Cerai</option>
                              </select>
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Tingkat pendidikan terakhir
                              </label>
                              <input
                                type="text"
                                value={education}
                                onChange={(e) => setEducation(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Golongan darah
                              </label>
                              <select
                                value={blood_type}
                                onChange={(e) => setBloodType(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              >
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="AB">AB</option>
                                <option value="O">O</option>
                              </select>
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Tanggal pensiun
                              </label>
                              <input
                                type="date"
                                value={retirement_date}
                                onChange={(e) =>
                                  setRetirementDate(e.target.value)
                                }
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                            </div>
                            {/* <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Kewarganegaraan
                              </label>
                              <input
                                type="text"
                                value={nationality}
                                onChange={(e) => setNationality(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                            </div> */}

                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Kewarganegaraan
                              </label>
                              <select
                                value={nationality}
                                onChange={(e) => setNationality(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              >
                                <option value="WNI">WNI</option>
                                <option value="WNA">WNA</option>
                              </select>
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Photo
                              </label>
                              <input
                                type="file"
                                onChange={handlePhotoChange}
                                className="w-full py-2 px-3 border rounded-lg"
                                required
                              />
                              {photoUrl && (
                                <div>
                                  <img
                                    src={photoUrl}
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
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="bg-blue-500 text-white rounded-md py-2 px-4"
                              >
                                Save
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

          {/* Edit Employee Modal */}
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
                          Edit Employee
                        </h3>
                        <div className="mt-2">
                          <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Nama lengkap
                              </label>
                              <input
                                type="text"
                                value={full_name}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                                required
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Nomor Induk Pegawai
                              </label>
                              <input
                                type="text"
                                value={nip}
                                onChange={(e) => setNip(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                                required
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Alamat tempat tinggal
                              </label>
                              <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Tanggal lahir
                              </label>
                              <input
                                type="date"
                                value={birth_date}
                                onChange={(e) => setBirthDate(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Nomor telepon
                              </label>
                              <input
                                type="text"
                                value={phone_number}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Alamat email
                              </label>
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Jabatan karyawan
                              </label>
                              <input
                                type="text"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Tanggal bergabung
                              </label>
                              <input
                                type="date"
                                value={join_date}
                                onChange={(e) => setJoinDate(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                                required
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Status pekerjaan
                              </label>
                              <select
                                value={employment_status}
                                onChange={(e) =>
                                  setEmploymentStatus(e.target.value)
                                }
                                className="w-full py-2 px-3 border rounded-lg"
                              >
                                <option value="aktif">Aktif</option>
                                <option value="tidak aktif">tidak aktif</option>
                              </select>
                            </div>
                            {/* <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Department
                              </label>
                              <input
                                type="text"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                            </div> */}
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Jenis kelamin
                              </label>
                              <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              >
                                <option value="laki-laki">Laki-laki</option>
                                <option value="wanita">Wanita</option>
                              </select>
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Status pernikahan
                              </label>
                              <select
                                value={marital_status}
                                onChange={(e) =>
                                  setMaritalStatus(e.target.value)
                                }
                                className="w-full py-2 px-3 border rounded-lg"
                              >
                                <option value="Lajang">Lajang</option>
                                <option value="Menikah">Menikah</option>
                                <option value="Cerai">Cerai</option>
                              </select>
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Tingkat pendidikan terakhir
                              </label>
                              <input
                                type="text"
                                value={education}
                                onChange={(e) => setEducation(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Golongan darah
                              </label>
                              <select
                                value={blood_type}
                                onChange={(e) => setBloodType(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              >
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="AB">AB</option>
                                <option value="O">O</option>
                              </select>
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Tanggal pensiun
                              </label>
                              <input
                                type="date"
                                value={retirement_date}
                                onChange={(e) =>
                                  setRetirementDate(e.target.value)
                                }
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Kewarganegaraan
                              </label>
                              <input
                                type="text"
                                value={nationality}
                                onChange={(e) => setNationality(e.target.value)}
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Photo
                              </label>
                              <input
                                type="file"
                                onChange={handlePhotoChange}
                                className="w-full py-2 px-3 border rounded-lg"
                              />
                              <p className="text-sm text-gray-500 mt-1">
                                Leave empty if you don't want to change the
                                photo.
                              </p>
                              {photoUrl && (
                                <div>
                                  <img
                                    src={photoUrl}
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
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="bg-blue-500 text-white rounded-md py-2 px-4"
                              >
                                Save
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

          {/* Confirm Delete Modal */}
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
                          <p>Apakah Anda yakin ingin menghapus karyawan ini?</p>
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
                        Tidak
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

export default Pegawai;
