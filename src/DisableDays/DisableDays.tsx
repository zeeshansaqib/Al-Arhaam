import { useEffect, useState } from "react";
import { getDisableDays } from "../APIs/api-routes.util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import Header from "../Dashboard/Header";
import DataTable from "react-data-table-component";

function DisableDays() {
  const [data, setData] = useState([]);
  const getAllDay = () => {
    getDisableDays().subscribe((res: any) => {
      if ("response" in res && res.response) {
        const response = res.response;
        setData(response);
      }
    });
  };
  const columns = [
    {
      name: "Day",
      selector: (row: any) => row.Day,
      sortable: true,
    },
    {
      name: "Day Status",
      selector: (row: any) => row.DayStatus,
      sortable: true,
    },
    {
      name: "Start Time",
      selector: (row: any) => (
        <text>{row?.StartTime ? row.StartTime : "--"}</text>
      ),
      sortable: true,
    },
    {
      name: "End Time",
      selector: (row: any) => <text>{row?.EndTime ? row.EndTime : "--"}</text>,
      sortable: true,
    },
    {
      name: "Appointment Close",
      selector: (row: any) => (
        <FontAwesomeIcon
          icon={row.AppointmentClose === "1" ? faCheck : faXmark}
        />
      ),
      sortable: true,
    },
  ];

  useEffect(() => {
    getAllDay();
  }, []);

  return (
    <>
      <Header Origin={"Disable Days"} />
      <div className="main-container">
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

export default DisableDays;
