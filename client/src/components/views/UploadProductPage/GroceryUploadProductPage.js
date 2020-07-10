import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

function GroceyUploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState("");
  const [DescriptionValue, setDescriptionValue] = useState("");
  const [PriceValue, setPriceValue] = useState(0);
  const [EmailValue, setEmailValue] = useState("");
  const [PhoneNumberValue, setPhoneNumberValue] = useState("");
  const [AddressValue, setAddressValue] = useState("");

  const [Images, setImages] = useState([]);

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };

  const onPriceChange = (event) => {
    setPriceValue(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const onEmail = (event) => {
    setEmailValue(event.currentTarget.value);
  };
  const onPhoneNumber = (event) => {
    setPhoneNumberValue(event.currentTarget.value);
  };
  const onAddress = (event) => {
    setAddressValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!TitleValue || !DescriptionValue || !PriceValue || !Images) {
      return alert("fill all the fields first!");
    }

    const variables = {
      writer: props.user.userData._id,
      title: TitleValue,
      description: DescriptionValue,
      price: PriceValue,
      images: Images,
      phoneNumber: PhoneNumberValue,
      address: AddressValue,
      email: EmailValue,
    };

    Axios.post("/api/groceryRoute/uploadGrocery", variables).then(
      (response) => {
        if (response.data.success) {
          alert("Product Successfully Uploaded");
          props.history.push("/grocery");
        } else {
          alert("Failed to upload Product");
        }
      }
    );
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Upload Grocery Product</Title>
      </div>

      <Form onSubmit={onSubmit}>
        {/* DropZone */}
        <FileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={TitleValue} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={DescriptionValue} />
        <br />
        <br />
        <label>Price</label>
        <Input onChange={onPriceChange} value={PriceValue} />
        <br />
        <label>Address</label>
        <Input onChange={onAddress} value={AddressValue} />
        <label>Email</label>
        <Input onChange={onEmail} value={EmailValue} />
        <label>Phone number</label>
        <Input onChange={onPhoneNumber} value={PhoneNumberValue} />

        <br />

        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  );
}

export default GroceyUploadProductPage;
