import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import './modal.css';

const Post = (props) => {
  const address = props.address;
  const setAddress = props.setAddress;
  const { open, close, header } = props;
  const setModalOpen = props.setModalOpen;

  const onCompletePost = (data) => {
    console.log(data.address);
    setAddress(data.address);
    setModalOpen(false);
  };

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>&times;</button>
          </header>
          <main>
          <form className="commentsForm">
            <input type="text" required name="inputId" class="form-control" id="inputId" placeholder="ID" minlength="5" maxlength="20"></input>
            <input type="password" required name="inputPassword" class="form-control" id="inputPassword" placeholder="Password" minlength="7"></input>
            <button id="submitBtn" type="submit">완료</button>
          </form>
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default Post;