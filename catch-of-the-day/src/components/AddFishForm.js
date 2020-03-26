import React, { useRef } from "react";
import PropTypes from "prop-types";

const AddFishForm = ({ addFish }) => {
  // declare ref variables using the `useRef()` hook
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const statusRef = useRef(null);
  const descRef = useRef(null);
  const imageRef = useRef(null);

  const createFish = event => {
    // 1.  stop the form from submitting
    event.preventDefault();

    const fish = {
      name: nameRef.current.value,
      // use Number to replace `parseFloat() for performance and consistency
      price: Number(priceRef.current.value),
      status: statusRef.current.value,
      desc: descRef.current.value,
      image: imageRef.current.value
    };

    addFish(fish);

    // refresh the form
    event.currentTarget.reset();
  };

  return (
    <form className="fish-edit" onSubmit={createFish}>
      <input name="name" ref={nameRef} type="text" placeholder="Name" />

      <input
        name="price"
        ref={priceRef}
        type="text"
        placeholder="Price"
      />

      <select name="status" ref={statusRef}>
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>

      <textarea name="desc" ref={descRef} placeholder="Desc" />

      <input
        name="image"
        ref={imageRef}
        type="text"
        placeholder="Image"
      />

      <button type="submit">+ Add Fish</button>
    </form>
  );
}

AddFishForm.propTypes = {
  addFish: PropTypes.func
};

export default AddFishForm;
