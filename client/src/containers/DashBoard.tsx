import React, { useState } from "react";
import { Interpreter } from "xstate";
import { AuthMachineContext, AuthMachineEvents } from "../machines/authMachine";
import { ChartsLayout } from "../components/ChartsLayout";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { useDarkMode } from "utils/useDarkMode";
import { darkTheme, lightTheme } from "utils/themes";
import SessionsByDaysChart from "components/SessionsByDaysChart";
import SessionsByHoursChart from "components/SessionsByHoursChart";
import GenericPieChart from "components/PieChart";
import RetentionCohort from "components/RetentionCohort";
import AllEventsLog from "components/AllEventsLog";
import LocationChart from "components/LocationsChart";
import { Brightness2Sharp } from "@material-ui/icons";
import WbSunnySharpIcon from "@material-ui/icons/WbSunnySharp";

export interface Props {
  authService: Interpreter<AuthMachineContext, any, AuthMachineEvents, any>;
}

const GlobalStyle = createGlobalStyle`
body{
  transition: all 0.50s linear;
}
`;

const PairContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 5vh 2vw;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    margin: 0 1vw;
  }
`;

const Header = styled.span`
  font-size: 2.5em;
  margin: 2vh auto;
  color: ${(props) => props.theme.body.text};
`;

const ThemeButton = styled.span`
  position: absolute;
  top: 3vh;
  left: 2vw;
  font-size: 2.5em;
  cursor: pointer;
`;

const DashBoard: React.FC = () => {
  const [theme, changeTheme, themeLoaded] = useDarkMode();

  const toggleTheme = (): void => changeTheme();

  const currentStyle: object = theme === "light" ? lightTheme : darkTheme;

  return (
    <>
      <ThemeProvider theme={currentStyle}>
        <GlobalStyle />
        <ChartsLayout>
          <Header>Stats & Analytics</Header>
          <ThemeButton onClick={toggleTheme}>
            {theme === "light" ? (
              <WbSunnySharpIcon fontSize={"inherit"} color={"inherit"} />
            ) : (
              <Brightness2Sharp fontSize={"inherit"} color={"inherit"} />
            )}
          </ThemeButton>
          <PairContainer>
            <div id="chart1" className="line-charts">
              <SessionsByHoursChart />
            </div>
            <div className="pie-charts">
              <GenericPieChart filter="os" title="Operating System" />
            </div>
          </PairContainer>
          <PairContainer>
            <div id="chart2" className="line-charts">
              <SessionsByDaysChart />
              {/* <SessionsByHoursChart className="chart2" /> */}
            </div>
            <div className="pie-charts">
              <GenericPieChart filter="pageView" title="Pages" />
            </div>
          </PairContainer>
          <div id="retention">
            <RetentionCohort />
          </div>
          <div id="all-events">
            <AllEventsLog />
          </div>
          <div id="locations">
            <LocationChart />
          </div>
          {/* <div className="chart1">a</div>
          <div className="chart2">a</div>
          <div className="chart3">a</div>
          <div className="chart4">a</div>
          <div className="chart5">a</div> */}
        </ChartsLayout>
      </ThemeProvider>
    </>
  );
};

export default DashBoard;
