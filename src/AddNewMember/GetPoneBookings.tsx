import { useEffect } from "react";
import { GetBookedAppointments } from "../APIs/api-routes.util";
import React from "react";
import { ListGroup } from "react-bootstrap";

function GetPoneBookings(props: any) {
  const { phone, handelUpdate } = props;
  const [phoneData, setPhoneData] = React.useState([]);
  const checkPhone = () => {
    GetBookedAppointments(phone).subscribe((res: any) => {
      setPhoneData(res.response?.data);
    });
  };

  useEffect(() => {
    checkPhone();
  }, [phone]);
  return (
    <div className="flex">
      {phoneData?.map((item: any) => {
        return (
          <>
            <ListGroup
              onClick={() => {
                handelUpdate({
                  Name: item.Name,
                  GuardianName: item.GuardianName,
                });
                props.setShowModel(false);
              }}
              style={{ width: "350px", cursor: "pointer" }}
            >
              <ListGroup.Item>{item.Date}</ListGroup.Item>
              <ListGroup.Item>{item.Name}</ListGroup.Item>
              <ListGroup.Item>{item.Phone}</ListGroup.Item>
              <ListGroup.Item>{item.GuardianName}</ListGroup.Item>
            </ListGroup>
            <br />
          </>
        );
      })}
    </div>
  );
}

export default GetPoneBookings;
