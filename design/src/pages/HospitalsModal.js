import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import './modal.css';

const Post = (props) => {
  const { open, close, data } = props;
  

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {data.name}
            <button className="close" onClick={close}>
              {' '}
              &times;{' '}
            </button>
          </header>
          <main>
            <span>{data.type_code}</span>
            <p>{data.addr}</p>
            <p>{data.coord}</p>
            <p>{data.postNo}</p>
            <p>{data.telno}</p>
            <p>{data.hospUrl}</p>
            <p>{data.estbed}</p>
            <p>{data.drTotCnt}</p>

            <span>치과일반의: {data.detyGdrCnt} </span>
            <span>치과인턴: {data.detyIntnCnt} </span>
            <span>치과레지던트: {data.detyResdntCnt} </span>
            <span>치과전문의: {data.detySdrCnt} </span>
            <p></p>
            <span>의과일반의: {data.mdeptGdrCnt} </span>
            <span>의과인턴: {data.mdeptIntnCnt} </span>
            <span>의과레지던트: {data.mdeptResdntCnt} </span>
            <span>의과전문의: {data.mdeptSdrCnt} </span>
          </main>
          <footer>
            <button className="close" onClick={close}>
              {' '}
              close{' '}
            </button>
            <button className="DetailBtn">상세페이지
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Post;