import { TextField } from "@material-ui/core";
import React, { createRef, useContext, useEffect, useRef, useState } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
import styled, { ThemeContext } from "styled-components";
import { httpClient } from "utils/asyncUtils";
import { nowString, todayMs, oneDayMs } from "../utils/timeUtils";

const Head = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.chart.background};
  padding: 2vh 1vw;
  align-items: flex-start;

  h1 {
    font-weight: 500;
    font-size: auto;
    text-decoration: underline;
    color: ${(props) => props.theme.body.text};
  }

  .date-picker {
    margin-left: auto;
  }
`;

const MyTextField = styled(TextField)`
  label,
  input {
    color: ${(props) => props.theme.body.text};
  }
  width: 25%;
`;

const SessionsByDaysChart: React.FC = () => {
  const [data, setData] = useState<Event[]>();
  const [offset, setOffset] = useState<number>(0);
  const themeContext = useContext(ThemeContext);

  const fetchData = async () => {
    const { data }: { data: Event[] } = await httpClient.get(`/events/by-days/${offset}`);
    setData(data);
  };

  const handleDatePick = (event: React.ChangeEvent<{ value: string }>): void => {
    const pickInMs: number = new Date(event.target.value).getTime();
    const now: number = todayMs();
    if (now < pickInMs) {
      alert("Pick a time in the present");
      return;
    }
    const newOffset: number = Math.floor((now - pickInMs) / oneDayMs);

    setOffset(newOffset);
  };
  useEffect(() => {
    fetchData();
  }, [offset]);

  return data ? (
    <>
      <Head>
        <h1>Unique Sessions By Week</h1>
        <MyTextField
          label="Pick Day"
          type="date"
          className="date-picker"
          onChange={handleDatePick}
          value={
            offset
              ? new Date(todayMs() - oneDayMs * offset).toISOString().slice(0, 10)
              : nowString()
          }
          style={{ backgroundColor: themeContext.chart.background, borderRadius: "10px" }}
        />
      </Head>
      <ResponsiveContainer width={"100%"} height={"80%"}>
        <LineChart
          data={data}
          style={{
            backgroundColor: themeContext.chart.background,
            fontSize: "1em",
          }}
        >
          <XAxis dataKey="date" stroke={themeContext.chart.axis} />
          <YAxis stroke={themeContext.chart.axis} />
          <Line type="monotone" dataKey="count" stroke={themeContext.chart.graph} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </>
  ) : (
    <div>loading</div>
  );
};

export default SessionsByDaysChart;
