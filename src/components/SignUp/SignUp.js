import { useContext, useState } from "react";
import "./SignUp.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { store } from "../../Helpers/store";
import updateData from "../../Helpers/PostAPI";
import moment from "moment";
const SignUp = () => {
  const { showSignUp, setShowSignUp } = useContext(store);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    mobile: null,
    status: "Website",
    password: "",
    createdon: moment().format("lll"),
    updatedon: moment().format("lll"),
    updatedby: 0,
    // dob: "2000" + "-" + "May" + "-" + "7",
    //             gender: "female",
  });
  const handleClick = (event) => {
    event.preventDefault();
    console.log(userDetails.email);

    updateData.postRequest(userDetails, "AddCustomer").then((result) =>
      result.json().then((obj) => {
        console.log(obj.data);
      })
    );
  };
  return (
    <Modal
      show={showSignUp}
      onHide={() => {
        setShowSignUp(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div class=" rounded">
          <div class="row">
            <div class="col-md-12">
              <div class="h-100 py-5 px-5">
                <form action="" class="row g-4">
                  <div class="col-12">
                    <label>
                      Username<span class="text-danger">*</span>
                    </label>
                    <div class="input-group">
                      <div class="input-group-text">
                        <i class="bi bi-person-fill"></i>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Username"
                        value={userDetails.name}
                        onChange={(e) => {
                          setUserDetails((values) => ({
                            ...values,
                            name: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <label>
                      Email<span class="text-danger">*</span>
                    </label>
                    <div class="input-group">
                      <div class="input-group-text">
                        <i class="bi bi-person-fill"></i>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Email"
                        value={userDetails.email}
                        onChange={(e) => {
                          setUserDetails((values) => ({
                            ...values,
                            email: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <label>
                      Phone<span class="text-danger">*</span>
                    </label>
                    <div class="input-group">
                      <div class="input-group-text">
                        <i class="bi bi-person-fill"></i>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Mobile Number"
                        value={userDetails.mobile}
                        onChange={(e) => {
                          setUserDetails((values) => ({
                            ...values,
                            mobile: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <label>
                      Password<span class="text-danger">*</span>
                    </label>
                    <div class="input-group">
                      <div class="input-group-text">
                        <i class="bi bi-lock-fill"></i>
                      </div>
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Enter Password"
                        value={userDetails.password}
                        onChange={(e) => {
                          setUserDetails((values) => ({
                            ...values,
                            password: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>

                  <div class="col-12">
                    <button
                      type="submit"
                      class="btn btn-success px-4 float-end mt-4"
                      onClick={handleClick}
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignUp;
