<div>
  <div className="container-fluid position-relative p-0">
    <Navbar />
    {/* <!-- Carousel Start --> */}
    <div id="home" className="header-carousel owl-carousel">
      <div className="header-carousel-item">
        <img src={luarh1} className="img-fluid w-100" alt="Image" />
        <div className="carousel-caption">
          <div className="carousel-caption-content p-3">
            <h5
              className="text-white text-uppercase fw-bold mb-4"
              style={{ letterSpacing: "3px" }}
            >
              Selamat Datang
            </h5>
            <h4 className="display-1 text-capitalize text-white mb-4">
              Pemerintah Kabupaten Manokwari <br /> Distrik Manokwari <br />{" "}
              Keluarhan Sowi
            </h4>
            {/* <a
                  className="btn btn-primary rounded-pill text-white py-3 px-5"
                  href="#"
                >
                  Book Appointment
                </a> */}
          </div>
        </div>
      </div>
    </div>
    {/* <!-- Carousel End --> */}
  </div>

  {/* <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row justify-content-center py-5">
            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
              <h1 className="display-3 text-white animated slideInDown">
                Kontak Kami
              </h1>
            </div>
          </div>
        </div>
      </div> */}
  {/* <!-- Contact Start --> */}
  {/* <!-- Services Start --> */}
  <div className="container-fluid service py-5">
    <div className="container py-5">
      <div className="section-title mb-5 wow fadeInUp" data-wow-delay="0.2s">
        <div className="sub-style mb-4">
          <h4 className="sub-title px-3 mb-0">Kelurahan Sowi</h4>
        </div>

        <p className="mb-0">
          Selamat Datang di Website Resmi Kelurahan Sowi Kami dengan bangga
          mempersembahkan website layanan Kelurahan Sowi yang dirancang untuk
          memudahkan akses informasi dan layanan bagi seluruh warga. Melalui
          platform ini, kami berharap dapat memberikan pelayanan yang lebih
          cepat, transparan, dan efisien. Di website ini, Anda dapat menemukan
          berbagai informasi penting mengenai kelurahan kami, seperti berita
          terkini, program dan kegiatan, serta layanan administrasi yang
          tersedia. Kami juga menyediakan fitur interaktif yang memungkinkan
          Anda untuk mengajukan permohonan, mengurus dokumen, serta memberikan
          masukan dan saran demi kemajuan Kelurahan Sowi. Kami berkomitmen untuk
          terus meningkatkan kualitas layanan dan berharap website ini dapat
          menjadi jembatan yang menghubungkan kelurahan dengan warga secara
          lebih dekat. Mari bersama-sama kita wujudkan Kelurahan Sowi yang lebih
          baik. Terima kasih atas kunjungan Anda, dan selamat menjelajahi
          website kami! Salam hormat, Lurah Sowi
        </p>
      </div>
    </div>
  </div>
  {/* <!-- Services End --> */}
  <div className="container py-5">
    <div className="row">
      <div className="col-12">
        <div className="section-title mb-5 wow fadeInUp" data-wow-delay="0.2s">
          <h4 className="sub-title px-3 mb-0">Berita Terkini</h4>
        </div>
      </div>
      {/* Example of news card usage */}
      <div className="col-md-4 mb-4">
        <NewsCard
          title="Judul Berita 1"
          description="Deskripsi singkat dari berita pertama..."
          link="/news-1"
        />
      </div>
      <div className="col-md-4 mb-4">
        <NewsCard
          title="Judul Berita 2"
          description="Deskripsi singkat dari berita kedua..."
          link="/news-2"
        />
      </div>
      <div className="col-md-4 mb-4">
        <NewsCard
          title="Judul Berita 3"
          description="Deskripsi singkat dari berita ketiga..."
          link="/news-3"
        />
      </div>
    </div>
  </div>
  <div
    id="layanan"
    className="col-12 text-center wow fadeInUp"
    data-wow-delay="0.2s"
  >
    <h4 className="text-black rounded-pill text-white py-3 px-5">Layanan</h4>
  </div>
  <div className="container" style={{ marginBottom: "80px" }}>
    <div className="card">
      <div className="card-body">
        {/* ...Kode lainnya... */}
        <h2>Layanan Online Yang Tersedia</h2>
        {/* Daftar layanan */}
        <br />
        <div>
          <h4>Pilih Layanan:</h4>
          <select value={selectedService} onChange={handleServiceSelection}>
            <option value="">Pilih Layanan</option>
            <option value="surat_ket_tidak_mampu">Surat Ket Tidak Mampu</option>
            <option value="surat_ket_domisili">Surat Ket Domisili Usaha</option>
            {/* <option value="surat_tidak_mampu">Surat Tidak Mampu</option> */}
            <option value="surat_nikah">Surat Nikah</option>
            {/* Tambahkan layanan lain */}
          </select>
        </div>
        {/* Formulir sesuai dengan layanan yang dipilih */}
        {selectedService && renderServiceForm()}
        {/* ...Kode lainnya... */}
      </div>
      <br />
      <br />
    </div>
  </div>
  <h3
    style={{
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
    }}
    id="Kontak"
  >
    Kontak Kami
  </h3>
  <div className="container-xxl py-5" style={{ marginBottom: "100px" }}>
    <div className="container">
      <div className="row g-4">
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
          <div className="d-flex align-items-center mb-4">
            <div
              className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
              style={{ width: "50px", height: "50px" }}
            >
              <i className="fa fa-map-marker-alt text-white"></i>
            </div>
            <div className="ms-3">
              <h5 className="text-primary">Office</h5>
              <p className="mb-0">
                32PP+9JR, Jl. Trikora Taman Ria, Sowi, Distrik Manokwari,
                Kabupaten Manokwari, Papua Bar. 98315
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center mb-4">
            <div
              className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
              style={{ width: "50px", height: "50px" }}
            >
              <i className="fa fa-phone-alt text-white"></i>
            </div>
            <div className="ms-3">
              <h5 className="text-primary">Phone</h5>
              <p className="mb-0">+012 345 67890</p>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div
              className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
              style={{ width: "50px", height: "50px" }}
            >
              <i className="fa fa-envelope-open text-white"></i>
            </div>
            <div className="ms-3">
              <h5 className="text-primary">Email</h5>
              <p className="mb-0">lurahsowi@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
          <iframe
            className="position-relative rounded w-100 h-100"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3288.064561869254!2d134.03394747397195!3d-0.9139987353304737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d53f415a0bbf009%3A0x866bb92bca60446e!2sKantor%20Lurah%20Sowi!5e1!3m2!1sid!2sid!4v1717762982282!5m2!1sid!2sid"
            frameBorder="0"
            style={{ minHeight: "300px", border: "0" }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>

        <div className="col-lg-4 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
          {/* Form Kontak */}
          <div
            className="alert alert-success alert-dismissible fade show d-none my-alert"
            role="alert"
          >
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
            <div className="row g-3">
              <div className="col-md-6">
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
              </div>
              <div className="col-md-6">
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
              </div>

              <div className="col-12">
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
              </div>
              <div className="col-12">
                <button
                  className="btn btn-primary w-100 py-3 btn-kirim"
                  type="submit"
                  onClick={handleFormLoading}
                >
                  Send Message
                </button>
                <button
                  className="w-100 py-3 btn btn-primary d-none btn-loading"
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm "
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
</div>;
