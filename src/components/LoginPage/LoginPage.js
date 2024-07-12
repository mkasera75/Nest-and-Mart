import { useContext, useState } from "react";
import "../LoginPage/LoginPage.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { store } from "../../Helpers/store";
import updateData from "../../Helpers/PostAPI";
import moment from "moment";
const LoginPage = () => {
  const { show, setShow, setShowSignUp } = useContext(store);
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
    action: "Login",
    actiondate: moment(new Date()).format(),
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userDetail.email);

    updateData.postRequest(userDetail, "AddwebsiteLogin").then((result) =>
      result.json().then((obj) => {
        if (result.status == 200 || result.status == 201) {
          console.log(obj.data[0]);
          localStorage.setItem("loginDetails", JSON.stringify(obj.data[0]));
          localStorage.setItem("loginToken", obj.token);
          setShow(false);
        }
      })
    );
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSignUp(true);
  };
  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
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
                        value={userDetail.email}
                        onChange={(e) => {
                          setUserDetail((values) => ({
                            ...values,
                            email: e.target.value,
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
                        value={userDetail.password}
                        onChange={(e) => {
                          setUserDetail((values) => ({
                            ...values,
                            password: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>

                  <div class="col-sm-6">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineFormCheck"
                      />
                      <label class="form-check-label" for="inlineFormCheck">
                        Remember me
                      </label>
                    </div>
                  </div>

                  <div class="col-sm-6">
                    <a href="#" class="float-end text-success">
                      Forgot Password?
                    </a>
                  </div>

                  <div class="col-12">
                    <button
                      type="submit"
                      class="btn btn-success px-4 float-end mt-4 ms-4"
                      onClick={handleSignUp}
                    >
                      Sign Up
                    </button>
                    <button
                      type="submit"
                      class="btn btn-success px-4 float-end mt-4"
                      onClick={handleSubmit}
                    >
                      Login
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

export default LoginPage;
