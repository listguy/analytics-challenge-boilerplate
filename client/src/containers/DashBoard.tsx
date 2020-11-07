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
  margin: 2vh auto;
  color: ${(props) => props.theme.body.text};
  font-size: 3.5em;
  font-weight: bold;
`;

const SubHeader = styled.div`
  color: ${(props) => props.theme.body.text};
  text-align: center;
  font-size: 3em;
  margin-bottom: 3vh;
`;

const ThemeButton = styled.span`
  position: absolute;
  top: 3vh;
  left: 2vw;
  font-size: 2.5em;
  color: ${(props) => props.theme.body.text};
  cursor: pointer;
`;

const DashBoard: React.FC = () => {
  const [theme, changeTheme, themeLoaded] = useDarkMode();

  const toggleTheme = (): void => changeTheme();

  const currentStyle: object = theme === "light" ? lightTheme : darkTheme;

  return (
    <>
      {themeLoaded ? (
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
              </div>
              <div className="pie-charts">
                <GenericPieChart filter="pageView" title="Pages" />
              </div>
            </PairContainer>
            <SubHeader style={{ marginTop: "10vh" }}>Retention Cohort</SubHeader>
            <div id="retention">
              <RetentionCohort />
            </div>
            <SubHeader>All Events</SubHeader>

            <div id="all-events">
              <AllEventsLog />
            </div>
            <SubHeader>Events On Map</SubHeader>

            <div id="locations">
              <LocationChart />
            </div>
          </ChartsLayout>
        </ThemeProvider>
      ) : null}
    </>
  );
};

export default DashBoard;
