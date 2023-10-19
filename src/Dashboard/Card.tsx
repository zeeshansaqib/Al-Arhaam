import React from "react";
import { Link } from "react-router-dom";
// import { PixelIcon, PixelAlert } from 'pixel-base'
import { Alert } from "react-bootstrap";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface IProps {
  cardHeading: string;
  icon: IconDefinition;
  variant: string;
  link?: string;
  handelClick?: () => void;
}
const MainCard = ({
  cardHeading,
  icon,
  variant,
  link,
  handelClick,
}: IProps) => {
  return (
    <Card onClick={handelClick} variant={variant}>
      <Link
        style={{ textDecoration: "none", height: "100%", width: "100%" }}
        to={link ? link : '/dashboard'}
      >
        <CardRow>
          <CardInfo>
            <Label>
              <FontAwesomeIcon
                style={{
                  height: "50px",
                  width: "50px",
                }}
                icon={icon}
                color={variant}
              />
            </Label>
          </CardInfo>
          <Name className="alert">{cardHeading}</Name>
        </CardRow>
      </Link>
    </Card>
  );
};
const Card = styled(Alert)`
  display: flex;
  flex-direction: columns;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  width: 100%;
  max-width: 27%;
  padding: 16px;
  color: #fff6cd;
  border: 1px solid #dadce0;
  margin-bottom: 15px;
  cursor: pointer;
  overflow: auto;
  border-radius: 10px;
  box-shadow: 0 0 2px #ccc;
  height: 250px;
  &:hover {
    box-shadow: 0 0 10px #ccc !important;
  }
`;
const Name = styled.p`
  font-size: 30px;
  font-weight: 400;
  margin-top: 20px;
`;

const CardRow = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  width: 100%;
`;
const CardInfo = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Label = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 20px;
  color: #2f3c4d;
  margin-bottom: 5px;
`;
export default MainCard;
