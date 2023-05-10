import './App.css';
import React from "react";
import ReactPaginate from "react-paginate";
import SortUp from './Assets/sort-up.png'
import SortDown from './Assets/caret-down.png'
import Sort from './Assets/sort.png'

const MainComponent = ({ data, setSortingValues, setLimit, setSearchKeyword, SearchKeyword, limit, changePage }) => {
    const [sortConfig, setSortConfig] = React.useState(null);

    const requestSort = (key) => {
        let direction = 'asc';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'asc'
        ) {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        setSortingValues({ key, direction });
    };

    const getArrows = (attr) => {
       if(sortConfig !== null){
        if (attr === sortConfig.key && sortConfig.direction === "asc") {
            return <img style={{height:"12px"}} src={SortUp} alt="sort-up"/>;
        } else if (attr === sortConfig.key && sortConfig.direction === "desc") {
            return <img style={{height:"12px"}} src={SortDown} alt="sort-down"/>;
        } else {
            return <img style={{opacity: 0.4}} src={Sort} alt="sort"/>;
        }
       }
       return <img style={{opacity: 0.4}} src={Sort} alt="sort"/>;
    }

    return (
        <div>
            <div className="container">
                <h1 className="mb-3">Profiles</h1>
                <div className="d-flex mb-3 justify-content-between">
                    <span className="d-flex align-items-center">
                        Show
                        <select disabled={!data?.profile?.length} onChange={(e) => setLimit(e.target.value)} className="form-select mx-1">
                            <option >10</option>
                            <option >20</option>
                            <option >50</option>
                            <option >100</option>
                        </select>
                        entries
                    </span>
                    <span className="d-flex align-items-center">Search: <input type="text" value={SearchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} className="form-control ms-1 w-100" /></span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => requestSort("name")}>
                                Name <span className="arrow text-right"> {getArrows("name")}</span>
                            </th>
                            <th onClick={() => requestSort("position")}>
                                Position <span className="arrow"> {getArrows("position")} </span>
                            </th>
                            <th onClick={() => requestSort("office")}>
                                Office  <span className="arrow">{getArrows("office")} </span>
                            </th>
                            <th onClick={() => requestSort("age")}>
                                Age <span className="arrow">{getArrows("age")} </span>
                            </th>
                            <th onClick={() => requestSort("startDate")}>
                                Start Date <span className="arrow">{getArrows("startDate")}</span>
                            </th>
                            <th onClick={() => requestSort("salary")}>
                                Salary <span className="arrow">{getArrows("salary")}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.profile.map((item, key) => (
                            <tr key={key}>
                                <th>{item.name}</th>
                                <td>{item.position}</td>
                                <td>{item.office}</td>
                                <td>{item.age}</td>
                                <td>{item.startDate}</td>
                                <td>${`${item.salary}`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!data.profile.length && (
                    <h2 className="d-flex mt-5 justify-content-center align-items-center mx-auto">
                        No Entries Found!
                    </h2>
                )}
                {data?.profile?.length ?
                    <div className="d-flex justify-content-end mt-3">
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={(e) => changePage(e.selected + 1)}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={Math.ceil(data.count / limit)}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    </div>
                    : ""}
            </div>

        </div>
    );
}


export default MainComponent