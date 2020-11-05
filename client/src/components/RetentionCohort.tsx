import { TextField } from "@material-ui/core";
import { Event, weeklyRetentionObject } from "models";
import React, { useContext, useEffect, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { httpClient } from "utils/asyncUtils";
import { nowString, oneWeekMs, todayMs } from "utils/timeUtils";

interface StyledRegularCell {
  retention?: number;
}

// const RetentionChartWrapper = styled.div.attrs<StyledThemedComponent>(({ theme }) => ({
//   style: {
//     color: theme.chart.background,
//   },
// }))``;

// background-color: ${(props) => props.theme.chart.axis};
const RetentionChartWrapper = styled.div`
  color: ${(props) => props.theme.chart.text};
  max-height: 100%;
  width: 100%;
`;
/* display: grid;
  grid-auto-flow: column;
  grid-template-columns: 25% repeat(auto-fill, 10%); */
// background-color: ${(props) => props.theme.chart.background};
// column-gap: 3px;
/* padding: 5px 0 5px 10px; */
const RetentionChartRow = styled.div`
  display: flex;
  margin: 3px auto;
  min-height: 60px;
  height: 60px;
  font-size: 14px;

  @media screen and (max-width: 700px) {
    font-size: 1.1em;
  }
`;

const LeftColumnCell = styled.div`
  background-color: ${(props) => props.theme.chart.background};
  display: flex;
  flex-direction: column;
  min-width: 300px;
  width: 300px;
  font-size: 18px;
  font-weight: bold;
  padding-top: 1vh;
  padding-left: 1vw;
  margin-right: 3px;

  @media screen and (max-width: 700px) {
    font-size: 1.3em;
  }

  .users-number {
    font-style: italic;
    font-weight: initial;
    font-size: 12px;
  }
`;

const RegulatCell = styled.div.attrs<StyledRegularCell>(({ retention }) => ({
  style: {
    opacity: giveColor(retention!),
  },
}))<StyledRegularCell>`
  background: ${(props) => props.theme.chart.graph};
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 90px;
  height: 100%;
  margin-right: 3px;
  transition: 0.3s ease-in-out;

  :hover {
    translate: (2px, 2px);
  }
`;

const FrameCell = styled(RegulatCell)`
  background-color: rgba(160, 160, 160, 0.5);
`;

const MyTextField = styled(TextField)`
  label,
  input {
    color: ${(props) => props.theme.body.text};
  }
  width: 75%;
`;

const Header = styled.div`
  color: ${(props) => props.theme.body.text};
  text-align: center;
  font-size: 3em;
  margin-bottom: 3vh;
`;

const RetentionCohort: React.FC = () => {
  const [data, setData] = useState<weeklyRetentionObject[]>([]);
  const [dayZero, setDayZero] = useState<number>(todayMs() - 5 * oneWeekMs);
  const themeContext = useContext(ThemeContext);

  const fetchData = async (): Promise<void> => {
    const { data }: { data: weeklyRetentionObject[] } = await httpClient.get(`/events/retention`, {
      params: { dayZero: dayZero },
    });
    setData(data);
  };

  const handleDatePick = (event: any): void => {
    const newDayZero: number = new Date(event.target.value).getTime();
    const now: number = todayMs();
    if (now < newDayZero) {
      alert("Pick a time in the present or past");
      return;
    }
    setDayZero(newDayZero);
  };

  useEffect(() => {
    fetchData();
  }, [dayZero]);

  console.log(data);
  return (
    <>
      <Header>Retention Cohort</Header>
      <RetentionChartWrapper>
        <RetentionChartRow theme={themeContext} style={{ padding: 0 }}>
          <LeftColumnCell style={{ backgroundColor: "rgba(160,160,160,0.5)" }}>
            <MyTextField
              label="start-day"
              type="date"
              onChange={handleDatePick}
              value={dayZero ? new Date(dayZero).toISOString().slice(0, 10) : nowString()}
            />
          </LeftColumnCell>
          {data.map((week: weeklyRetentionObject, i) => (
            <FrameCell>Week {week.registrationWeek - 1}</FrameCell>
          ))}
        </RetentionChartRow>
        <RetentionChartRow theme={themeContext}>
          <LeftColumnCell>
            <span>All Users</span>
            <span className="users-number">
              {data.reduce((sum: number, cur: weeklyRetentionObject) => sum + cur.newUsers, 0)}{" "}
              users
            </span>
          </LeftColumnCell>
          {/* {data.map()} */}
        </RetentionChartRow>
        {data.map((week: weeklyRetentionObject) => (
          <RetentionChartRow theme={themeContext}>
            <LeftColumnCell>
              <span>{`${week.start} - ${week.end} `}</span>
              <span className="users-number">{`${week.newUsers} users`}</span>
            </LeftColumnCell>
            {week.weeklyRetention.map((retention: number, i) =>
              i === 0 ? (
                <FrameCell>{`${retention}%`}</FrameCell>
              ) : (
                <RegulatCell retention={retention}>{`${retention}%`}</RegulatCell>
              )
            )}
          </RetentionChartRow>
        ))}
      </RetentionChartWrapper>
    </>
  );
};

export default RetentionCohort;

//helpers
const giveColor = (precentage: number): number => {
  return 0.6 + Math.floor(precentage / 20) * 0.15;
};
