import React from "react";

function Footer() {
  return (
    <div>
      {/* <!-- Footer Start --> */}
      <div
        className="container-fluid footer py-3 wow fadeIn"
        data-wow-delay="0.2s"
      >
        <div className="container py-3">
          <div className="row g-5">
            {/* <div className="col-md-6 col-lg-6 col-xl-3">
              <div className="footer-item d-flex flex-column">
                <h4 className="mb-4 text-white">Terapia Services</h4>
                <a href="">
                  <i className="fas fa-angle-right me-2"></i> All Services
                </a>
                <a href="">
                <i className="fas fa-angle-right me-2"></i> Physiotherapy
                </a>
                <a href="">
                  <i className="fas fa-angle-right me-2"></i> Diagnostics
                </a>
                <a href="">
                  <i className="fas fa-angle-right me-2"></i> Manual Therapy
                </a>
                <a href="">
                  <i className="fas fa-angle-right me-2"></i> Massage Therapy
                </a>
                <a href="">
                  <i className="fas fa-angle-right me-2"></i> Rehabilitation
                </a>
              </div>
            </div> */}
            <div className="col-md-6 col-lg-6 col-xl-3">
              <div className="footer-item d-flex flex-column">
                <h4 className="mb-4 text-white">Info Kontak</h4>
                <a href="">
                  <i className="fa fa-map-marker-alt me-2"></i> 32PP+9JR, Jl.
                  5357+4VW, Jl. Gn. Salju, Amban, Kec. Manokwari Bar., Kabupaten
                  Manokwari, Papua Bar. 98312
                </a>
                <a href="">
                  <i className="fas fa-envelope me-2"></i> lurahamban@gmail.com
                </a>

                <a href="" className="mb-3">
                  <i className="fas fa-print me-2"></i> +012 345 67890
                </a>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-3">
              <div className="footer-item d-flex flex-column">
                <h4 className="mb-4 text-white">Info Kontak</h4>
                <a href="">
                  <i className="fa fa-map-marker-alt me-2"></i> 5357+4VW, Jl.
                  Gn. Salju, Amban, Kec. Manokwari Bar., Kabupaten Manokwari,
                  Papua Bar. 98312
                </a>
                <a href="">
                  <i className="fas fa-envelope me-2"></i> lurahamban@gmail.com
                </a>

                <a href="" className="mb-3">
                  <i className="fas fa-print me-2"></i> +012 345 67890
                </a>
              </div>
              <div className="d-flex align-items-center">
                <i className="fas fa-share fa-2x text-white me-2"></i>
                <a
                  className="btn-square btn btn-primary text-white rounded-circle mx-1"
                  href=""
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  className="btn-square btn btn-primary text-white rounded-circle mx-1"
                  href=""
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  className="btn-square btn btn-primary text-white rounded-circle mx-1"
                  href=""
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  className="btn-square btn btn-primary text-white rounded-circle mx-1"
                  href=""
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Footer End --> */}
    </div>
  );
}

export default Footer;
