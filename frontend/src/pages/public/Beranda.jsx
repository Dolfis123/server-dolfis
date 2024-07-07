import React, { useEffect, useState } from "react";
import Navbar from "../../components/public/Navbar";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "jquery";
import "owl.carousel";
import luarh1 from "../../public/img/lurah-1.jpeg";
import axios from "axios";
import Footer from "../../components/public/Footer";
import { Link } from "react-router-dom";
// import "../../css/public/beranda.css"; // Import the updated CSS file

function Beranda() {
  const [showServices, setShowServices] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [newsList, setNewsList] = useState([]);
  const [ucapanList, setUcapanList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleServices = () => {
    setShowServices(!showServices);
  };

  const handleServiceSelection = (event) => {
    setSelectedService(event.target.value);
  };

  const renderServiceForm = () => {
    if (selectedService === "surat_ket_domisili") {
      return <SuratDomisiliUsaha />;
    } else if (selectedService === "surat_nikah") {
      return (
        <div>
          <h3 className="text-center">Surat Nikah</h3>
        </div>
      );
    }
  };

  useEffect(() => {
    $(".header-carousel").owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      items: 1,
    });
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/news");
        if (response.data.Result) {
          setNewsList(response.data.Result.reverse());
        } else {
          console.error("No data found in the API response");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const fetchUcapan = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/api/lihat-ucapan"
        );
        if (response.data.Result) {
          setUcapanList(response.data.Result);
        } else {
          console.error("No data found in the API response");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUcapan();
  }, []);

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyDtdplcpeeUFd6f1GB2orm4ZOznZ4goIAF4tSDTjg3pQIBSvFMtxVx6D6GwkBi65wV/exec";

  const handleSubmit = async (e) => {
    const btnKirim = document.querySelector(".btn-kirim");
    const btnLoading = document.querySelector(".btn-loading");
    const btnAlert = document.querySelector(".my-alert");
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        btnLoading.classList.toggle("d-none");
        btnKirim.classList.toggle("d-none");
        btnAlert.classList.toggle("d-none");
        form.reset();
        setSubmitStatus("Success!");
      } else {
        setSubmitStatus("Error! " + response.statusText);
      }
    } catch (error) {
      setSubmitStatus("Error! " + error.message);
    }
  };

  const handleFormLoading = () => {
    const btnKirim = document.querySelector(".btn-kirim");
    const btnLoading = document.querySelector(".btn-loading");
    const btnAlert = document.querySelector(".my-alert");

    btnLoading.classList.toggle("d-none");
    btnKirim.classList.toggle("d-none");
  };

  const NewsCard = ({ title, date, content, link, imageUrl }) => (
    <div className="card bg-white shadow-md rounded-lg p-4">
      <img
        src={imageUrl}
        className="card-img-top w-full h-48 object-contain rounded-t-lg"
        alt={title}
      />
      <div className="card-body">
        <p className="text-gray-600 mb-2">{date}</p> {/* Menambahkan tanggal */}
        <h5 className="card-title font-bold text-lg">{title}</h5>
        <p
          className="card-text text-gray-700"
          dangerouslySetInnerHTML={{
            __html: content.substring(0, 100) + "...",
          }}
        ></p>
        <Link to={link} className="text-blue-500">
          Selengkapnya..
        </Link>
      </div>
    </div>
  );

  const itemsPerPage = 3;
  const totalPages = Math.ceil(newsList.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNewsList = newsList.slice(startIndex, startIndex + itemsPerPage);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <div>
      <div className="container-fluid position-relative p-0">
        <Navbar />
        <div id="home" className="header-carousel owl-carousel">
          <div className="header-carousel-item">
            <img src={luarh1} className="img-fluid w-100" alt="Image" />
            <div className="carousel-caption">
              <div className="carousel-caption-content p-3">
                <h5
                  className="text-white text-uppercase fw-bold mb-8"
                  style={{ letterSpacing: "4px", fontSize: "25px" }}
                >
                  Selamat Datang
                </h5>
                <h4 className="display-1 text-capitalize text-white mb-4">
                  Pemerintah Kabupaten Manokwari <br /> Distrik Manokwari Barat{" "}
                  <br /> Kelurahan Amban
                </h4>
                <br />
                <br />
                <div className="flex justify-center">
                  <button
                    className="btn bg-primary text-white mb-4 py-2 px-2"
                    onClick={toggleServices}
                  >
                    <span className="me-1" style={{ fontSize: "15px" }}>
                      🚀
                    </span>
                    {showServices
                      ? "Sembunyikan Layanan"
                      : "layanan Online Yang Tersedia, Klik Disini."}
                    <span className="ms-2">{showServices ? "▲" : "▼"}</span>
                  </button>
                </div>
                {showServices && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                    <Link
                      to="/surat-ket-domisili-usaha"
                      className="btn bg-primary text-white py-2 px-4 rounded"
                    >
                      Surat Ket Domisili Usaha
                    </Link>
                    <Link
                      to="/surat-ket-domisili-umum"
                      className="btn bg-primary text-white py-2 px-4 rounded"
                    >
                      Surat Ket Domisili
                    </Link>
                    <Link
                      to="/tidak-mampu-pendidikan"
                      className="btn bg-primary text-white py-2 px-4 rounded"
                    >
                      Surat Ket Tidak Mampu Untuk Pendidikan
                    </Link>
                    <Link
                      to="/surat-ket-ktp"
                      className="btn bg-primary text-white py-2 px-4 rounded"
                    >
                      Surat Ket KTP
                    </Link>
                    <Link
                      to="/surat-ket-kk"
                      className="btn bg-primary text-white py-2 px-4 rounded"
                    >
                      Surat Ket KK
                    </Link>
                    <Link
                      to="/tidak-mampu-pendidikan"
                      className="btn bg-primary text-white py-2 px-4 rounded"
                    >
                      Surat Ket Usaha
                    </Link>
                    <Link
                      to="/tidak-mampu-pendidikan"
                      className="btn bg-primary text-white py-2 px-4 rounded"
                    >
                      Surat Ket Kematian
                    </Link>
                    <Link
                      to="/surat-ket-ahli-waris"
                      className="btn bg-primary text-white py-2 px-4 rounded"
                    >
                      Surat Ket Ahli Waris
                    </Link>
                    <Link
                      to="/surat-ket-ahli-waris"
                      className="btn bg-primary text-white py-2 px-4 rounded"
                    >
                      Surat Ket KK
                    </Link>
                    <Link
                      to="/tidak-mampu-pendidikan"
                      className="btn bg-primary text-white py-2 px-4 rounded"
                    >
                      Surat Ket KK
                    </Link>
                    <Link
                      to="/tidak-mampu-pendidikan"
                      className="btn bg-primary text-white py-2 px-4 rounded"
                    >
                      Surat Ket KK
                    </Link>
                    <Link
                      to="/tidak-mampu-pendidikan"
                      className="btn bg-primary text-white py-2 px-4 rounded"
                    >
                      Surat Ket KK
                    </Link>
                    <Link
                      to="/tidak-mampu-pendidikan"
                      className="btn bg-primary text-white py-2 px-4 rounded"
                    >
                      Surat Ket KK
                    </Link>
                    <Link
                      to="/tidak-mampu-pendidikan"
                      className="btn bg-primary text-white py-2 px-4 rounded"
                    >
                      Surat Ket KK
                    </Link>
                    <Link
                      to="/tidak-mampu-pendidikan"
                      className="btn bg-primary text-white py-2 px-4 rounded"
                    >
                      Surat Ket KK
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-5">
        {ucapanList.map((ucapan) => (
          <div key={ucapan.id} className="mb-5">
            <div className="card bg-white shadow-md rounded-lg p-4 flex flex-row items-center">
              <img
                className="rounded-full w-32 h-32 object-cover mr-4"
                src={`http://localhost:5050/api/images/${ucapan.image}`}
                alt=""
              />
              <div>
                <h4 className="text-xl font-bold">Kelurahan Amban</h4>
                <p
                  className="text-gray-700 mt-2 text-justify"
                  dangerouslySetInnerHTML={{ __html: ucapan.pesan }}
                ></p>
              </div>
            </div>
          </div>
        ))}

        <div className="my-10">
          <h4 className="text-2xl font-bold mb-4">Berita Terkini</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentNewsList.map((news) => (
              <NewsCard
                key={news.id}
                date={formatDate(news.created_at)}
                title={news.title}
                content={news.content.substring(0, 100) + "..."}
                link={`/news/${news.id}`}
                imageUrl={`http://localhost:5050/api/images/${news.image_url}`}
              />
            ))}
          </div>
          <div className="flex justify-center items-center mt-4">
            <button
              className="btn btn-primary"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-primary"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>

        <div className="container py-5">
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="d-flex items-center mb-4">
                <div className="flex items-center justify-center bg-primary text-white rounded-full w-12 h-12">
                  <i className="fa fa-map-marker-alt"></i>
                </div>
                <div className="ml-3">
                  <h5 className="text-primary">Office</h5>
                  <p className="text-gray-700">
                    5357+4VW, Jl. Gn. Salju, Amban, Kec. Manokwari Bar.,
                    Kabupaten Manokwari, Papua Bar. 98312
                  </p>
                </div>
              </div>
              <div className="d-flex items-center mb-4">
                <div className="flex items-center justify-center bg-primary text-white rounded-full w-12 h-12">
                  <i className="fa fa-phone-alt"></i>
                </div>
                <div className="ml-3">
                  <h5 className="text-primary">Phone</h5>
                  <p className="text-gray-700">+012 345 67890</p>
                </div>
              </div>
              <div className="d-flex items-center">
                <div className="flex items-center justify-center bg-primary text-white rounded-full w-12 h-12">
                  <i className="fa fa-envelope-open"></i>
                </div>
                <div className="ml-3">
                  <h5 className="text-primary">Email</h5>
                  <p className="text-gray-700">lurahamban@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <iframe
                className="w-full h-72 rounded"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3994.650942606982!2d134.06212037397145!3d-0.8421236352998912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d540b025081f9eb%3A0x1cc8b5d44a4f1b0c!2sKantor%20Lurah%20Amban!5e0!3m2!1sid!2sid!4v1720118447832!5m2!1sid!2sid"
                frameBorder="0"
                style={{ minHeight: "300px", border: "0" }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="alert alert-success hidden my-alert" role="alert">
                <strong> {submitStatus && <p>{submitStatus}</p>}</strong>
                <strong>Terima kasih</strong> Pesan anda sudah kami terima.
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
              <form name="submit-to-google-sheet" onSubmit={handleSubmit}>
                <div className="grid gap-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Nama Anda"
                      name="nama"
                    />
                    <label htmlFor="name">Your Name</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email Anda"
                    />
                    <label htmlFor="email">Your Email</label>
                  </div>
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      placeholder="Pesan Anda"
                      id="message"
                      name="pesan"
                      style={{ height: "100px" }}
                    ></textarea>
                    <label htmlFor="message">Message</label>
                  </div>
                  <div>
                    <button
                      className="btn bg-primary text-white w-full py-3 btn-kirim"
                      type="submit"
                      onClick={handleFormLoading}
                    >
                      Send Message
                    </button>
                    <button
                      className="w-full py-3 btn bg-primary text-white hidden btn-loading"
                      type="button"
                      disabled
                    >
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Loading...
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Beranda;
