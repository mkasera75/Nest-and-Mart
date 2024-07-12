export default function Footer(){
    return <footer className="text-center text-lg-start bg-body-tertiary text-muted pt-3">
      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
              <img src="/images/logo.svg" width="auto" height={60} />
              </h6>
              <p>
              Awesome grocery store website template
              </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Useful Links
              </h6>
              <p>
                <a href="#!" className="text-reset text-decoration-none">About Us</a>
              </p>
              <p>
                <a href="#!" className="text-reset text-decoration-none">Delivery Information</a>
              </p>
              <p>
                <a href="#!" className="text-reset text-decoration-none">Privacy Policy</a>
              </p>
              <p>
                <a href="#!" className="text-reset text-decoration-none">Terms and Conditions</a>
              </p>
              <p>
                <a href="#!" className="text-reset text-decoration-none">Contact Us</a>
              </p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p><i className="fas fa-home me-3"></i>5171 W Campbell Ave
              Kent, Utah 53127,</p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                sale@Nest.com
              </p>
              <p><i className="fas fa-phone me-3"></i> (+91) - 540-025-124553</p>
            </div>
          </div>
        </div>
      </section>
      <div className=" p-4 d-flex " style={{"background-color": "rgba(0, 0, 0, 0.05)"}}>
        <a className="text-reset text-decoration-none" href="#">Design <span className="fw-bold">Megha Kasera.</span> </a>
        <div className="ms-auto">
             <a className="text-reset text-decoration-none" href="#">2024 <span className="fw-bold"> Nest - HTML.</span> All Rights Reserved.</a>
        </div>
      </div>
    </footer>

}