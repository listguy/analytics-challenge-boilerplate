import React, { useState, useCallback, useContext, useRef } from "react";
import useInfiniteScroll from "utils/useInfinteScroll";
import { browser, Event, eventName, Filter, os } from "../models/event";
import styled, { ThemeContext } from "styled-components";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  TextField,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { convertToDate } from "utils/timeUtils";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    // backgroundColor: "rgba(0, 0, 0, .33)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const LogsWrapper = styled.div`
  background-color: ${(props) => props.theme.chart.material};
  display: flex;
  height: 400px;
  font-size: "20px";

  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

const SortingColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  margin: 0 auto;
  @media screen and (max-width: 700px) {
    display: grid;
    grid-template-columns: 2fr repeat(3, 1fr);
    width: 100%;
  }
`;

const Logs = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  margin-left: auto;
  width: 65%;
  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

const Header = styled.div`
  color: ${(props) => props.theme.body.text};
  text-align: center;
  font-size: 3em;
  margin-bottom: 3vh;
`;

//constant filters
const operatingSystems: os[] = ["windows", "mac", "linux", "ios", "android", "other"];
const browsers: browser[] = ["chrome", "safari", "edge", "firefox", "ie", "other"];
const pages: eventName[] = ["login", "signup", "admin", "/"];

const AllEventsLog: React.FC = () => {
  //#region  bla
  // //   const [step, setStep] = useState<number>(0);
  // const curr:string[] = [];
  //   const data = [
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //     "1",
  //   ];
  //   //   const [items, setItems] = useState<string[]>([]);
  //   const [hasMore, setHasMore] = useState<boolean>(true);

  //   const loadMore = (): void => {
  //     // setItems(data.slice(step * 10, (step + 1) * 10 + 1));
  //     // setStep((step) => step + 1);
  // curr = data.slice()
  //   };

  //   const items = data.slice(step * 10, (step + 1) * 10 + 1).map((item) => <div>{item}</div>);
  //   console.log(items);

  //   const [data, setData] = useState<any[]>([
  //     <div>{1}</div>,
  //     <div>{1}</div>,
  //     <div>{1}</div>,
  //     <div>{1}</div>,
  //     <div>{1}</div>,
  //     <div>{1}</div>,
  //     <div>{1}</div>,
  //   ]);
  //   const [hasMore, setHasMore] = useState<boolean>(true);
  //   const logs: any = [];

  //   const loadMore = async () => {
  //     const { data } = await httpClient.get(`events/all-filtered`, {
  //       params: { sorting: "-date", offset: 10 },
  //     });
  //     const eventLogs: Event[] = data.events;
  //     const more: boolean = data.more;
  //     console.log(data);
  //     // logs.concat(eventLogs.map((log: Event) => <div>{log._id}</div>));
  //     setData(eventLogs.map((log: Event) => <div style={{ fontSize: "30px" }}>{log._id}</div>));
  //     setHasMore(more);
  //   };
  //   if (data.length > 0) {
  //   }
  //   console.log(logs);
  //   return (
  //     <div style={{ height: "300px", backgroundColor: "red", overflow: "auto" }}>
  //       <InfiniteScroll
  //         pageStart={0}
  //         loadMore={loadMore}
  //         hasMore={hasMore}
  //         loader={<div>loadin....</div>}
  //         useWindow={false}
  //       >
  //         {data}
  //       </InfiniteScroll>
  //     </div>
  //   );
  //#endregion
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [query, setQuery] = useState<Filter>({
    sorting: "-date",
    offset: 10,
  });
  const {
    data,
    hasMore,
    loading,
    error,
  }: { data: Array<any>; hasMore: boolean; loading: boolean; error: boolean } = useInfiniteScroll(
    query,
    pageNumber,
    `/events/all-filtered`
  );
  const themeContext = useContext(ThemeContext);

  // The Magic
  //   const observer = createRef<any>();
  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      //@ts-ignore
      if (observer.current) observer.current.disconnect();
      //@ts-ignore
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      //@ts-ignore
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleSearch = (e: any): void => {
    //@ts-ignore
    const newSearchQuery: string = e.target.value;
    const newQuery: Filter = { ...query };
    newQuery.search = newSearchQuery;
    setQuery(newQuery);
    setPageNumber(0);
  };

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleSelect = (e: any): void => {
    const newOption: os | browser | eventName | "All" = e.target.value;
    const trigger: string = e.target.name; //how to use Filter interface as a new type | interface?
    const newQuery: Filter = { ...query };
    if (newOption === "All") {
      //@ts-ignore
      delete newQuery[trigger];
    } else {
      //@ts-ignore
      newQuery[trigger] = newOption;
    }
    setPageNumber(0);
    setQuery(newQuery);
  };

  // const logs = data.map((event: Event) => event._id);

  return (
    <>
      <Header>All Events Log</Header>
      <LogsWrapper>
        <SortingColumn>
          <TextField label="Search" onChange={handleSearch} />
          <FormControl>
            <InputLabel>Event Type</InputLabel>
            <Select
              value={query?.type ? query.type : "All"}
              name="type"
              onChange={handleSelect}
              autoWidth
            >
              <MenuItem value={"All"}>All</MenuItem>
              {pages.map((page: eventName) => (
                <MenuItem value={page}>{page}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Browser</InputLabel>
            <Select
              value={query.browser ? query.browser : "All"}
              name="browser"
              onChange={handleSelect}
              autoWidth
            >
              <MenuItem value="All">All</MenuItem>
              {browsers.map((browser: browser) => (
                <MenuItem value={browser}>{browser}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Operating System</InputLabel>
            <Select value={query.os ? query.os : "All"} name="os" onChange={handleSelect} autoWidth>
              <MenuItem value="All">All</MenuItem>
              {operatingSystems.map((os: os) => (
                <MenuItem value={os}>{os}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </SortingColumn>
        <Logs>
          {data.map((log: Event, i: number) => {
            if (data.length === i + 1) {
              return (
                <Accordion
                  square
                  expanded={expanded === `panel${i}`}
                  onChange={handleChange(`panel${i}`)}
                >
                  <AccordionSummary
                    style={{
                      backgroundColor: themeContext.chart.background,
                      color: themeContext.chart.text,
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${i}a-content`}
                    id={`panel${i}d-header`}
                    ref={lastBookElementRef}
                    key={`log${i}`}
                  >
                    <Typography>User {log.distinct_user_id}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <b>Event Name: </b> {log.name}
                      <br />
                      <b>Date: </b> {convertToDate(log.date)}
                      <br />
                      <b>Browser: </b>
                      {log.browser}
                      <br />
                      <b>Operating System: </b> {log.os}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            } else {
              return (
                <Accordion
                  square
                  expanded={expanded === `panel${i}`}
                  onChange={handleChange(`panel${i}`)}
                >
                  <AccordionSummary
                    style={{
                      backgroundColor: themeContext.chart.background,
                      color: themeContext.chart.text,
                    }}
                    expandIcon={<ExpandMoreIcon style={{ color: themeContext.chart.graph }} />}
                    aria-controls={`panel${i}a-content`}
                    id={`panel${i}d-header`}
                    key={`log${i}`}
                  >
                    <Typography>User {log.distinct_user_id}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <b>Event Name: </b> {log.name}
                      <br />
                      <b>Date: </b> {convertToDate(log.date)}
                      <br />
                      <b>Browser: </b>
                      {log.browser}
                      <br />
                      <b>Operating System: </b> {log.os}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            }
          })}

          {!loading && data.length === 0 && (
            <Accordion square expanded={expanded === `panel0`} onChange={handleChange(`panel0`)}>
              <AccordionSummary
                style={{
                  backgroundColor: themeContext.chart.background,
                  color: themeContext.chart.text,
                }}
                expandIcon={<ExpandMoreIcon style={{ color: themeContext.chart.graph }} />}
                aria-controls={`panel0a-content`}
                id={`panel0d-header`}
                key={`log0`}
              >
                <Typography>No results!</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>:(</Typography>
              </AccordionDetails>
            </Accordion>
          )}
          <div>{loading && "Loading..."}</div>
          <div>{error && "Error"}</div>
        </Logs>
      </LogsWrapper>
    </>
  );
};

export default AllEventsLog;
