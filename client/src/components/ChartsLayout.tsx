import { props } from "bluebird";
import styled from "styled-components";

export const ChartsLayout = styled.div`
  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.theme.body.background};
  /* display: grid; */
  /* grid-template-areas:
    "."
    "line-chart pie-chart"
    "line-chart pie-chart"
    "."
    "."; */

  /* grid-template-rows: minmax(400px, 50vw); */
  left: 50%;
  margin-top: -10vh;
  margin-left: -40vw;
  max-width: 100vw;
  min-width: 600px;
  position: relative;
  right: 50%;
  width: 80vw;

  .line-charts {
    width: 60%;
    height: 48vh;
    margin: 5vh 2vw 0 0;
    grid-area: line-chart;
    @media only screen and (max-width: 1000px) {
      margin: 5vh auto;
      width: 100%;
    }
    /* background-color: ${(props) => props.theme.body.background};
    color: ${(props) => props.theme.body.text}; */
  }
  #chart2 {
    /* width: 45%;
    height: 40vh; */
    /* background-color: ${(props) => props.theme.body.background};
    color: ${(props) => props.theme.body.text}; */
    /* grid-area: chart2; */
  }
  .pie-charts {
    width: 40%;
    height: 48vh;
    grid-area: pie-chart;
    @media only screen and (max-width: 1000px) {
      margin: 5vh auto;
      width: 70%;
    }
  }

  #retention {
    width: 95%;
    height: 75vh;
    margin: 5vh auto;
    overflow-x: auto;
  }
  #all-events {
    width: 95%;
    height: 35%;
    margin: 5vh auto 5vh;
    /* background-color: green;
    grid-area: chart4; */
  }
  #locations {
    margin: 5vh 0;
    width: 100%;
    height: 100%;
  }
`;
