import React, { useContext, useEffect, useState } from "react";
// import { PieChart, Pie, Sector, Cell } from "recharts";
import { PieChart } from "react-minimal-pie-chart";
import styled, { ThemeContext } from "styled-components";
import { JsxElement } from "typescript";
import { httpClient } from "utils/asyncUtils";
import { pieChartResponseObject } from "../models/event";

//#region Fuck off recharts
const COLORS: string[] = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN: number = Math.PI / 180;
//helper function to create label
// const renderCustomizedLabel = (inte: any): any => {
//   const {
//     cx,
//     cy,
//     midAngle,
//     innerRadius,
//     outerRadius,
//     percent,
//     index,
//   }: {
//     cx: number;
//     cy: number;
//     midAngle: number;
//     innerRadius: number;
//     outerRadius: number;
//     percent: number;
//     index: number;
//   } = inte;
// const renderCustomizedLabel = (
//   cx: number,
//   cy: number,
//   midAngle: number,
//   innerRadius: number,
//   outerRadius: number,
//   percent: number,
//   index: number
// ): any => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };
//#endregion

const InnerText = styled.div`
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.9vw;
  color: ${(props) => props.theme.body.text};
  z-index: 2;
`;

const PieContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

interface chartProps {
  filter: "os" | "pageView";
  title: string;
}

const segmantsColors: string[] = ["blue", "red", "gray", "green", "orange", "purple"];
const GenericPieChart: React.FC<chartProps> = ({ filter, title }) => {
  const [data, setData] = useState();
  const themeContext = useContext(ThemeContext);
  //#region fuck off recharts
  //   const fake = [
  //     { name: "Group A", value: 400 },
  //     { name: "Group B", value: 300 },
  //     { name: "Group C", value: 500 },
  //     { name: "Group D", value: 600 },
  //   ];

  //   return (
  //     <PieChart width={400} height={400}>
  //       <Pie
  //         data={fake}
  //         cx={200}
  //         cy={200}
  //         labelLine={false}
  //         label={renderCustomizedLabel(200, 200, 100, 30, 30, 100, 1)}
  //         outerRadius={80}
  //         fill="#8884d8"
  //         dataKey="value"
  //       >
  //         {fake.map((entry, index: number) => (
  //           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  //         ))}
  //       </Pie>
  //     </PieChart>
  //   );
  //#endregion

  const fetchData = async () => {
    const { data } = await httpClient.get(`/events/chart/${filter}`);
    data.forEach((obj: pieChartResponseObject, i: number) => (obj.color = segmantsColors[i]));
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <PieContainer>
      <PieChart
        data={data}
        animate={true}
        animationDuration={500}
        animationEasing="ease-out"
        labelStyle={{
          fontSize: "30%",
          fill: "#FFF",
          whiteSpace: "pre-wrap",
        }}
        label={({ dataEntry }) => `${dataEntry.title}\n${Math.round(dataEntry.percentage)}%`}
        labelPosition={70}
        lineWidth={60}
        startAngle={320}
        // center={[25, 50]}
        style={{
          position: "relative",
          backgroundColor: themeContext.chart.background,
          borderRadius: "20px",
          paddingBottom: "10px",
          paddingTop: "10px",
        }}
      />
      <InnerText>
        <b>Events by:</b> <br />
        {title}
      </InnerText>
    </PieContainer>
  );
};
//#endregion

export default GenericPieChart;
