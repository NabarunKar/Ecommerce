import React, { useEffect, useState } from "react";

function App() {
  const [dummyData, setDummyData] = useState([{}]);
  useEffect(() => {
    fetch("/products")
      .then((res) => res.json())
      .then((data) => {
        setDummyData(data);
      });
  });
  return (
    <div>
      {typeof dummyData.products === "undefined" ? (
        <p>Loading...</p>
      ) : (
        dummyData.products.map((p, id) => {
          return <li key={id}>{p}</li>;
        })
      )}
    </div>
  );
}

export default App;
