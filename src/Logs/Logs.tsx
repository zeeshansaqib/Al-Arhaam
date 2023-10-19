import { useEffect, useState } from "react";
import { getLogs } from "../APIs/api-routes.util";
import Header from "../Dashboard/Header";
import DataTable from "react-data-table-component";
const columns = [
  {
    name: "Time Stamp",
    width:'5%',
    selector: (row: any) => row.timestamp,
    sortable: true,
  },
  {
    name: "Params",
    width:'5%',

    selector: (row: any) => row.get_params,
    sortable: true,
  },
  {
    name: "Post Body",
    width:'90%',
    selector: (row: any) => <strong style={{wordBreak: 'break-all'}}>{row.post_body}</strong>,
    sortable: true,
  },
];
function Logs() {
  const [data, setData] = useState([]);
  const getAllLogs = () => {
    getLogs().subscribe((res: any) => {
      if ("response" in res && res.response) {
        const response = res.response;
        setData(response);
      }
    });
  };

  useEffect(() => {
    getAllLogs();
  }, []);

  return (
    <>
      <Header Origin={"Logs"} />
      <div className="main-container">
        <DataTable
          fixedHeader
          pagination
          // subHeader={true}
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

export default Logs;
