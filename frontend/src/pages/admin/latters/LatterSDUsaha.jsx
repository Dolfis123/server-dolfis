import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
import logo from "../../../public/img/logo-remove.png";
import "../../../css/admin/latter/latter.css";

function LatterSDUsaha() {
  const [data, setData] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    fetchEmployees();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://website.fahri.life/api/lihat-surat-domisili-admin/${id}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "https://website.fahri.life/api/api/employees"
      );
      setEmployees(response.data.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const generateSuratPDFK = async () => {
    const element = document.getElementById("my-content");

    const options = {
      margin: 10,
      filename: `${data.nama} ${data.id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value;
    const employee = employees.find(
      (emp) => emp.employee_id === parseInt(employeeId)
    );
    setSelectedEmployee(employee);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="bg-white p-6 rounded shadow-md">
        <div className="mb-4" id="my-content">
          <table className="w-full mb-2 text-black">
            <tbody>
              <tr>
                <td className="w-1/4">
                  <span>
                    <img src={logo} alt="logo" className="w-20 mb-2" />
                  </span>
                  <p
                    className="text-left"
                    style={{ marginTop: "50px", whiteSpace: "nowrap" }}
                  >
                    <span> Jl. Trikora Sowi </span>
                  </p>
                </td>
                <td className="text-center w-1/2">
                  <b className="font-semibold">
                    <h5 className="mb-2">PEMERINTAH KABUPATEN MANOKWARI</h5>
                    <h5 className="mb-2">DISTRIK MANOKWARI BARAT</h5>
                    <h5 className="mb-2">KELURAHAN SOWI</h5>
                  </b>
                </td>
                <td
                  className="text-right w-1/4"
                  style={{ verticalAlign: "top", paddingTop: "150px" }}
                >
                  <span>Kode: Pos 19314</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="border-t-2 border-black pt-4 text-black">
            <div className="text-center mb-4">
              <div className="inline-block">
                <h6
                  className="font-serif text-black"
                  style={{ marginBottom: "10px" }}
                >
                  SURAT KETERANGAN DOMISILI USAHA
                </h6>
                <div
                  className="border-b-2 border-black mt-1"
                  style={{ width: "100%" }}
                ></div>
              </div>

              <p>
                <span className="mr-1">Nomor: </span>
                <span className="ml-12">/ 2024</span>
              </p>
            </div>
            <p className="mb-0 text-black">
              Yang bertanda tangan di bawah ini, menerangkan bahwa:
            </p>
            <div className="ml-12 mt-4">
              <div className="flex mb-2">
                <span className="w-40">Nama</span>
                <span>
                  : {selectedEmployee ? selectedEmployee.full_name : ""}
                </span>
              </div>
              <div className="flex mb-2">
                <span className="w-40">NIP</span>
                <span>: {selectedEmployee ? selectedEmployee.nip : ""}</span>
              </div>
              <div className="flex mb-2">
                <span className="w-40">Jabatan</span>
                <span>
                  : {selectedEmployee ? selectedEmployee.position : ""}
                </span>
              </div>
              <div className="flex mb-2">
                <span className="w-40">Alamat Kantor</span>
                <span>: JL. TRIKORA SOWI IV</span>
              </div>
            </div>
            <p className="mb-0 text-black">Dengan ini menyatakan bahwa :</p>
            <div className="ml-12 mt-4 font-serif">
              <div className="flex mb-2">
                <span className="w-40">Nama Usaha</span>
                <span>: {data.nama_usaha}</span>
              </div>
              <div className="flex mb-2">
                <span className="w-40">Alamat Perusahaan</span>
                <span>: {data.alamat_perusahan}</span>
              </div>
              <div className="flex mb-2">
                <span className="w-40">Jenis Usaha</span>
                <span>: {data.jenis_usaha}</span>
              </div>
              <div className="flex mb-2">
                <span className="w-40">Nama Pempinan</span>
                <span>: {data.nama_pempinan}</span>
              </div>
              <div className="flex mb-2">
                <span className="w-40">No KTP</span>
                <span className="font-serif">: {data.ktp}</span>
              </div>
              <div className="flex mb-2">
                <span className="w-40">Alamat</span>
                <span>: {data.alamat}</span>
              </div>
            </div>

            <p className="mt-4 mb-0 font-serif">
              Adalah benar – benar berdomisili di Kelurahan Sowi, Distrik
              Manokwari Selatan, Kabupaten Manokwari, Provinsi Papua Barat.
            </p>

            <p className="font-serif" style={{ marginLeft: "475px" }}>
              Dikeluarkan di: Manokwari
            </p>
            <p
              className="font-serif"
              style={{ marginLeft: "475px", marginBottom: "12px" }}
            >
              Pada Tanggal: {formatDate(data.tanggal)}
            </p>
            <h6 className="font-serif " style={{ marginLeft: "515px" }}>
              <b> LURAH SOWI</b>
            </h6>
            <br />
            <br />
            <br />
            <div className="inline-block" style={{ marginLeft: "475px" }}>
              <div>
                <h6 style={{ marginBottom: "8px" }}>
                  {selectedEmployee ? selectedEmployee.full_name : ""}
                </h6>
                <div
                  className="border-b-2 border-black mt-1"
                  style={{ width: "100%" }}
                ></div>
              </div>
              <div></div>
              <h6 className="font-serif">
                NIP: {selectedEmployee ? selectedEmployee.nip : ""}{" "}
              </h6>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-8">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
            onClick={generateSuratPDFK}
          >
            <i className="material-icons mr-2">print</i>
            <span className="overflow-hidden whitespace-nowrap text-ellipsis">
              Download Surat
            </span>
          </button>
        </div>
        <div className="inline-block" style={{ marginLeft: "475px" }}>
          <h6 style={{ marginBottom: "10px" }}>
            <select
              className="border p-2"
              onChange={handleEmployeeChange}
              value={selectedEmployee ? selectedEmployee.employee_id : ""}
            >
              <option value="">Pilih Pegawai</option>
              {employees.map((employee) => (
                <option key={employee.employee_id} value={employee.employee_id}>
                  {employee.full_name} - {employee.nip}
                </option>
              ))}
            </select>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default LatterSDUsaha;
