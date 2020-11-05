export interface Event {
  _id: string;
  session_id: string;
  name: eventName;
  url: string;
  distinct_user_id: string;
  date: number;
  os: os;
  browser: browser;
  geolocation: GeoLocation;
}

export interface Filter {
  sorting?: "+date" | "-date";
  type?: eventName;
  os?: os;
  browser?: browser;
  search?: string;
  pageNumber?: number;
  offset?: number;
}

export interface weeklyRetentionObject {
  registrationWeek: number;
  newUsers: number;
  weeklyRetention: number[];
  start: string;
  end: string;
}

export interface pieChartResponseObject {
  title: os | eventName;
  value: number;
  color?: string;
}

export interface EventsLogResponse {
  events: Event[];
  more: boolean;
}

export interface geolocationChartResponse {
  locations: GeoLocation[];
}

export type eventName = "login" | "signup" | "admin" | "/";
export type os = "windows" | "mac" | "linux" | "ios" | "android" | "other";
export type browser = "chrome" | "safari" | "edge" | "firefox" | "ie" | "other";
export type GeoLocation = {
  location: Location;
  accuracy: number;
};
export interface Location {
  lat: number;
  lng: number;
}
export interface RetentionCohort {
  sorting: string;
  type: string;
  browser: string;
  search: string;
  offset: number;
}
