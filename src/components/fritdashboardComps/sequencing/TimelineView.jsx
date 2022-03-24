import React, { useContext } from "react";
import moment from "moment";
import Timeline, {
  DateHeader,
  SidebarHeader,
  TimelineHeaders,
} from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import { colorByState, prepareItems, propsByState } from "./helper";
import "./TimelineView.css";
import { Container } from "@mui/material";
import { userPreferencesContext } from "../../../context/ContextProvider";

const TimelineView = ({
  apiData,
  timelineHours,
  teams,
  selected,
  setSelected,
}) => {
  const { userPreferences, setUserPreferences } = useContext(
    userPreferencesContext
  );
  const { colorMode } = userPreferences;
  const isDark = colorMode === "dark";
  let refactoredTimelineItems, productionOrders, cleaningOrders;

  [refactoredTimelineItems, productionOrders, cleaningOrders] = prepareItems(
    apiData,
    isDark
  );

  const handleItemSelect = (rowId) => {
    setSelected(rowId);
  };
  const handleItemDeselect = () => {
    setSelected(null);
  };
  const itemRenderer = ({ item, itemContext, getItemProps }) => {
    const {
      WoId,
      ItemId,
      ItemDesc,
      StateCd,
      posiblesVelocidades,
      Personas,
      QtyReqd,
      FactorOEE,
    } = productionOrders.find((el) => el.id === item.id);

    let currentSpeed = posiblesVelocidades.find(
      (el) => el.personas === Personas
    );
    let Duracion;
    let closest;
    if (currentSpeed) {
      Duracion = (currentSpeed.velocidad / 1000) * QtyReqd;
    } else {
      //Find nearer number of people
      closest = posiblesVelocidades.reduce(function (prev, curr) {
        return Math.abs(curr.personas - Personas) <
          Math.abs(prev.personas - Personas)
          ? curr.personas
          : prev.personas;
      });
      currentSpeed = posiblesVelocidades.find((el) => el.personas === closest);
      Duracion = (currentSpeed.velocidad / 1000) * QtyReqd;
    }

    Duracion = Duracion / FactorOEE;

    let clean = cleaningOrders && cleaningOrders.find((c) => c.WoId === WoId);
    let cleanDuration;
    if (clean) {
      cleanDuration = clean.Duracion;
    }

    const cleaningPercentage = cleanDuration
      ? (cleanDuration / (Duracion + cleanDuration)) * 100
      : 0;
    return (
      <div
        {...getItemProps({
          style: {
            background: `linear-gradient(90deg, ${
              colorByState({
                isDark,
                prodState: StateCd,
                cleanState: null,
              }).color
            } ${100 - cleaningPercentage}%, #84BBCE ${
              100 - cleaningPercentage
            }%)`,
            color: selected
              ? itemContext.selected
                ? "text.main"
                : "rgb(100,100,100)"
              : "text.main",
            opacity: selected ? (itemContext.selected ? 1 : 0.35) : 1,
            fontSize: itemContext.selected ? "14px" : "12px",
            fontWeight: selected
              ? itemContext.selected
                ? "bold"
                : "bolder"
              : undefined,
            border: itemContext.selected
              ? "2px solid #167394"
              : "1px solid #167394",
            boxShadow: itemContext.selected
              ? "0px 5px 5px rgba(0,0,0,0.3)"
              : undefined,
            textShadow: itemContext.selected
              ? "0px 0px 3px rgba(255,255,255,0.7)"
              : undefined,
          },
        })}
      >
        <div
          style={{
            height: itemContext.dimensions.height,

            paddingLeft: 3,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {itemContext.selected
            ? `${WoId} - ${ItemId} (${ItemDesc})`
            : itemContext.title}
        </div>
      </div>
    );
  };
  const customClass = colorMode === "dark" ? "dark-timeline" : "light-timeline";
  return (
    <>
      {productionOrders && productionOrders.length > 0 && (
        <Timeline
          groups={teams}
          items={refactoredTimelineItems}
          defaultTimeStart={moment().startOf("hour")}
          defaultTimeEnd={moment()
            .startOf("hour")
            .add(timelineHours, "hour")
            .add(1, "minute")}
          canMove={false}
          canResize={false}
          stackItems={true}
          onItemSelect={handleItemSelect}
          selected={[selected]}
          onItemDeselect={handleItemDeselect}
          itemRenderer={itemRenderer}
          className={customClass}
        >
          <TimelineHeaders style={{ backgroundColor: "#fff" }}>
            <SidebarHeader>
              {({ getRootProps }) => {
                return <div {...getRootProps()}></div>;
              }}
            </SidebarHeader>
            <SidebarHeader variant="right" headerData={{ someData: "extra" }}>
              {({ getRootProps, data }) => {
                return <div {...getRootProps()}></div>;
              }}
            </SidebarHeader>
            <DateHeader
              unit="day"
              labelFormat="DD/MM/YYY"
              style={{ height: 50 }}
            />
            <DateHeader unit="hour" labelFormat="HH" />
          </TimelineHeaders>
        </Timeline>
      )}
    </>
  );
};

export default TimelineView;
