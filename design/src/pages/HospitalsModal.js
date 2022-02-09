import React, { useEffect, useState } from "react";
import './modal.css';

const Post = (props) => {
  const { open, close, header, data } = props;

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
            {data.name}
            {data.addr}
            {
              open ? <p>close를 눌러주세요</p> : null
            }
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