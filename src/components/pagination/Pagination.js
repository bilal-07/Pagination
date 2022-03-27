import React, { useEffect, useState } from "react";
import "./Pagination.css";

const renderData = (data) => {
  return (
    <ul>
      {data.map((item, index) => {
        return <li key={index}>{item.title}</li>;
      })}
    </ul>
  );
};

const Pagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemPerPage); i++) {
    pages.push(i);
  }

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderPages = pages.map((number) => {
    if (number < maxPageLimit + 1 && number > minPageLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const fetchData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const json = await response.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit);
      setMinPageLimit(minPageLimit + pageNumberLimit);
    }
  };

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumberLimit);
      setMinPageLimit(minPageLimit - pageNumberLimit);
    }
  };

  // let pageIncrmentBtn = null;
  // if (pages.length > maxPageLimit) {
  //   pageIncrmentBtn = <li onClick={handleNextClick}>&hellip;</li>;
  // }

  // let pageDecrementBtn = null;
  // if (pages.length > maxPageLimit) {
  //   pageDecrementBtn = <li onClick={handlePrevClick}>&hellip;</li>;
  // }

  const handleLoadMore = () => {
    setItemPerPage(itemPerPage + 5);
  };

  return (
    <div>
      <h1>Todo List</h1>
      {renderData(currentData)}
      <div className="page-numbers">
        <button
          disabled={currentPage === pages[0] ? true : false}
          onClick={handlePrevClick}
          className="prev-btn"
        >
          Prev
        </button>
        {/* {pageDecrementBtn} */}
        {renderPages}
        {/* {pageIncrmentBtn} */}

        <button
          disabled={currentPage === pages[pages.length - 1] ? true : false}
          onClick={handleNextClick}
          className="next-btn"
        >
          Next
        </button>
      </div>
      <button onClick={handleLoadMore} className="load-more">
        Load More
      </button>
    </div>
  );
};

export default Pagination;
