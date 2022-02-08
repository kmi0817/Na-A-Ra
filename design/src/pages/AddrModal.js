import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import './modal.css';

const Post = (props) => {
  const address = props.address;
  const setAddress = props.setAddress;
  const { open, close, header } = props;

  const onCompletePost = (data) => {
    console.log(data.address);
    setAddress(data.address);
  };

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              {' '}
              &times;{' '}
            </button>
          </header>
          <main>
            <DaumPostcode
            autoClose
            onComplete={onCompletePost}
            />
            close를 눌러주세요.
          </main>
          <footer>
            <button className="close" onClick={close}>
              {' '}
              close{' '}
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Post;