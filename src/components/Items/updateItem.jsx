import React, { useState, useEffect, useRef } from "react";
import "./items.css";
import GetItems from "../Items/getItems";
import axios from "axios";
import { TbPhotoEdit } from "react-icons/tb";

const updateItem = () => {
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);
  const selectRef = useRef(null);
  const { allProducts } = GetItems();
  const [text, setText] = useState("");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [isPopular, setIsPopular] = useState(false);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleImgSubmit = (e) => {
    fileInputRef.current.click();
  };

  const handleInputSubmit = () => {
    inputRef.current.click();
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    setImageUrl(file);
  };

  useEffect(() => {
    id
      ? (setText(
          <div className="manage-item">
            <div className="centerthis">
              <form>
                <div className="manage-item_content">
                  <input
                    type="file"
                    style={{ display: "none" }}
                    name="image"
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                  />
                </div>
                <div className="manage-item_content">
                  <input
                    type="text"
                    placeholder={`${title} < modify title`}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="manage-item_content">
                  <input
                    type="text"
                    placeholder={`${price} < modify price`}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="manage-item_content">
                  <input
                    type="text"
                    placeholder={`${description} < modify description`}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="manage-item_content">
                  <input
                    type="number"
                    placeholder={`${amount} < modify amount`}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <div className="manage-item_content">
                    <label>Popular item:</label>
                    <input
                      type="radio"
                      value={true}
                      checked={isPopular === true}
                      onChange={() => setIsPopular(true)}
                    />
                    <label>True</label>
                    <input
                      type="radio"
                      value={false}
                      checked={isPopular === false}
                      onChange={() => setIsPopular(false)}
                    />
                    <label>False</label>
                  </div>
                  <div className="manage-item_content">
                    <select
                      defaultValue=""
                      name="sortField"
                      id="sortField"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      <option value="Software">Software</option>
                      <option value="PC Parts and Hardware">
                        PC Parts and Hardware
                      </option>
                      <option value="Video Games">Video Games</option>
                      <option value="Cell Phones">Cell Phones</option>
                      <option value="Television and Video">
                        Television and video
                      </option>
                    </select>
                  </div>
                </div>
              </form>
              <div>
                <input
                  onClick={handleInputSubmit}
                  type="submit"
                  value="Update"
                />
                <input
                  onClick={() => (
                    setId(null),
                    setIsVisible(null),
                    (selectRef.current.value = "")
                  )}
                  type="submit"
                  value="Cancel"
                />
              </div>
            </div>
          </div>
        ),
        image,
        setIsVisible(true))
      : setText(
          <span style={{ color: "white" }}>
            Select the item you'd like to update
          </span>
        );
  }, [id, title, price, description, image, isPopular, amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      setText(
        <span style={{ color: "red" }}>Please select an item to update</span>
      );
    } else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", imageUrl);
      formData.append("amount", amount);
      formData.append("isPopular", isPopular);
      formData.append("category", category);

      await axios.patch(`/items/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsVisible(false);
      setText(
        <div>
          <span className="flex-bg" style={{ color: "black" }}>
            {title}
          </span>{" "}
          has been updated. Page will reload in 1s.
        </div>
      );
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const handleChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setId(selectedOption.dataset.id);
    setImage(selectedOption.dataset.image);
    setTitle(selectedOption.dataset.title);
    setPrice(selectedOption.dataset.price);
    setDescription(selectedOption.dataset.description);
    setAmount(selectedOption.dataset.amount);
    setIsPopular(selectedOption.dataset.ispopular);
    setCategory(selectedOption.dataset.category);
  };

  return (
    <div className="manage-item">
      <h1>Update Item</h1>
      <div className="manage-item_content">
        <form onSubmit={handleSubmit}>
          <select ref={selectRef} defaultValue="" onChange={handleChange}>
            <option value="" disabled>
              Select...
            </option>
            {allProducts.map((product) => (
              <option
                key={product._id}
                value={product._id}
                data-id={product._id}
                data-image={product.image}
                data-title={product.title}
                data-price={product.price}
                data-description={product.description}
                data-amount={product.amount}
                data-ispopular={product.isPopular}
                data-category={product.category}
              >
                {product.title}
              </option>
            ))}
          </select>
          <input
            style={{ display: "none" }}
            type="submit"
            value="Update"
            ref={inputRef}
          />
        </form>
        <div className="success">
          <div style={{ padding: "1rem" }}>{text}</div>
          <div
            onClick={handleImgSubmit}
            style={{ cursor: "pointer", position: "relative" }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                position: "absolute",
                background: "black",
                opacity: 0.5,
                top: "0%",
                left: "0%",
              }}
            ></div>
            {/**/}
            <div className={isVisible ? "visible" : "notvisible"}>
              <img src={image} alt={title} style={{ borderRadius: "50%" }} />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <TbPhotoEdit size="3rem" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default updateItem;
