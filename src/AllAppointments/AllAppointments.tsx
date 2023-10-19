import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { getAllAppointments } from "../APIs/api-routes.util";
import Header from "../Dashboard/Header";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Date",
    selector: (row: any) => row.Date,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row: any) => row.Name,
    sortable: true,
  },
  {
    name: "Guardian Name",
    selector: (row: any) => row.GuardianName,
    sortable: true,
  },
  {
    name: "Phone",
    selector: (row: any) => row.Phone,
    sortable: true,
  },
];
function AllAppointments() {
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllAppointments().subscribe(
      (res: any) => {
        if ("response" in res && res.response) {
          const response = res.response;
          setData(response);
        } else {
          setErrorMessage("Something went wrong");
          setShowError(true);
        }
      },
      (error) => {
        console.error("Error:", error);
        setErrorMessage("An error occurred while fetching data");
        setShowError(true);
      }
    );
  }, []);

  return (
    <>
      <Header Origin={"Booked Appointments"} />
      <div className="main-container">
        {showError && (
          <Alert
            variant="danger"
            onClose={() => setShowError(false)}
            dismissible
          >
            {errorMessage}
          </Alert>
        )}
        <DataTable
          fixedHeader
          pagination
          responsive
          theme="solarized"
          fixedHeaderScrollHeight={"calc(100vh - 135px)"}
          paginationRowsPerPageOptions={[15, 20, 25, 30, 50]}
          columns={columns}
          data={data}
        />
      </div>
    </>
  );
}

export default AllAppointments;
