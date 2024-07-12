import { useContext,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { store } from '../../Helpers/store';
import '../AddressForm/AddressForm.css'
import updateData from '../../Helpers/PostAPI';
const AddressForm = () => {
    const {addressFormShow,setAddressFormShow} = useContext(store);
    const customerDetail = localStorage.getItem("loginDetails");
    const customer = JSON.parse(customerDetail);
    const [addressDetail, setAddressDetail] = useState({
        CUSTOMERID: customer == null ? null : customer.fld_customerid,
        addressid:null,
        title:"",
        name:"",
        mobileNo:"",
        flatno: "",
        area: "",
        landmark:"",
        country:101,
        state:4035,
        city:131517,
        pincode:"",
        action:"INSERT",
        latitude:"",
        longitude:"",
        gstNumber:""
      });
     
      const handleAddressSubmit = (event)=>{
        event.preventDefault();
        console.log(addressDetail.flatno);
        updateData.postRequest(addressDetail, "AddCustomerAddress").then((result) =>
      result.json().then((obj) => {
        if (result.status == 200 || result.status == 201) {
          console.log(obj);
          setAddressFormShow(false);
          updateData.postRequest({
            whereClause: `where fld_customerid = ${customer.fld_customerid}`
          },"GetCustomerAddress").then((result)=>result.json().then((obj)=>{
            console.log(obj.data)
          }))
        }
      })
    );
      }
  return (
    <Offcanvas show={addressFormShow} onHide={()=>{setAddressFormShow(false)}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='address-title'>Add New Address</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <form>
            <div className="mb-3">
              <label htmlFor="addressLine1" className="form-label">Address Line 1</label>
              <input type="text" className="form-control" id="addressLine1" value={addressDetail.flatno} onChange={(e) => {
                          setAddressDetail((values) => ({
                            ...values,
                            flatno: e.target.value,
                          }));
                        }} required />
            </div>
            <div className="mb-3">
              <label htmlFor="addressLine2" className="form-label">Address Line 2</label>
              <input type="text" className="form-control" id="addressLine2" value={addressDetail.area} onChange={(e) => {
                          setAddressDetail((values) => ({
                            ...values,
                            area: e.target.value,
                          }));
                        }} />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input type="text" className="form-control" id="city" value={addressDetail.city}  required />
            </div>
            <div className="mb-3">
              <label htmlFor="state" className="form-label">State</label>
              <input type="text" className="form-control" id="state" value={addressDetail.state}  required />
            </div>
            <div className="mb-3">
              <label htmlFor="postalCode" className="form-label">Postal Code</label>
              <input type="text" className="form-control" id="postalCode" value={addressDetail.pincode} onChange={(e) => {
                          setAddressDetail((values) => ({
                            ...values,
                            pincode: e.target.value,
                          }));
                        }} required />
            </div>
            <button type="submit" className="btn btn-dark" onClick={handleAddressSubmit}>Add Address</button>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
  );
};

export default AddressForm;
