import './App.css';
import axios from "axios";
import { useEffect, useState } from "react";
import MainComponent from "./MainComponent";

function App() {

  const [Data, setData] = useState(null);
  const [Limit, setLimit] = useState(10)
  const [Offset, setOffset] = useState(0)
  const [SearchKeyword, setSearchKeyword] = useState("")
  const [SortingVal, setSortingVal] = useState(null)
  const [SortingDir, setSortingDir] = useState(null)

  const getProfiles = (limit = Limit, offset = Offset, search = SearchKeyword) => {

    let URI = `http://localhost:4000/profile/?limit=${limit}&offset=${offset}&search=${search}`

    if (SortingVal !== "" && SortingVal) {
      URI = URI + `&sortval=${SortingVal}`
    }
    if (SortingDir !== "" && SortingDir) {
      URI = URI + `&sortdir=${SortingDir}`
    }
    axios
      .get(URI)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data)
          console.log(res.data)
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };


  const changePage = (page_no) => {
    const offset = (page_no - 1) * Limit + 1
    setOffset(offset);
    getProfiles(Limit, offset)
  }

  const setSortingValues = (obj) => {
    setSortingVal(obj.key)
    setSortingDir(obj.direction)
  }

  useEffect(() => {
    getProfiles()
  }, [Limit, Offset, SearchKeyword, SortingDir, SortingVal])


  return (
    <div>
      {Data ?
        <MainComponent data={Data} setSortingValues={setSortingValues} setSearchKeyword={setSearchKeyword} SearchKeyword={SearchKeyword} setLimit={setLimit} limit={Limit} changePage={changePage} />
        : (
          <div className='d-flex justify-content-center align-content-center mx-auto' style={{ marginTop: "40vh" }}>
            <div className='d-flex justify-content-center align-content-center flex-column'>
              <div class="loader mx-auto mb-3"></div>
              <span>Please Start The Backend For Visuals!</span>
            </div>
          </div>
        )}
    </div>
  );
}

export default App;
