import React, { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  SVGOverlay,
  Circle,
} from "react-leaflet";
import { MenuOutlined } from "@ant-design/icons";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import MapBound from "./MapBound";
import "./Map.css";
import MapOverlays from "./MapOverlays";
import red_marker from "../../assets/Map_marker_red.svg";
import green_marker from "../../assets/Map_marker_green.svg";
import blue_marker from "../../assets/Map_marker_blue.svg";
import purple_marker from "../../assets/Map_marker_purple.svg";
import yellow_marker from "../../assets/Map_marker_yellow.svg";
import { Button, Col, Popover, Tooltip } from "antd";
import API_SERVICE from "../../services/api-service";

const default_toolTipData = {
  Attendance: "NA",
  Enrolment: "NA",
  PTR: "NA",
  CWSN: "NA",
};

export default function MapComponent({
  config,
  markers,
  type = 0,
  at = "SA1",
  ay = "2022-2023",
}) {
  const eventHandlers = () => ({
    click() {
      console.log("CLicked");
      getToolTipData();
    },
  });

  const center = markers?.postions[0]?.position || [28.7041, 77.1025];
  const byGeoJson = config.bounds?.byGeoJson?.length;
  const byBbox = config.bounds?.byBbox?.length;
  const [toolTipData, setToolTipData] = useState(default_toolTipData);

  const tempBounds = [
    [76.715049743652401, 31.588310241699446],
    [76.716567993164119, 31.585119247436467],
  ];
  const content = (
    <div>
      <div>Download XLS</div>
      <div>Download CSV</div>
      <div>Download PNG Image</div>
    </div>
  );

  const getDistrictAttendance = async (val) => {
    const params = {
      district: val,
    };
    return await API_SERVICE.getDistrictAttendance(params);
  };
  const getDistrictEnrolment = async (val) => {
    const params = {
      district: val,
    };
    return await API_SERVICE.getDistrictEnrolment(params);
  };
  const getDistrictPTR = async (val) => {
    const params = {
      district: val,
    };
    return await API_SERVICE.getDistrictPTR(params);
  };
  const getDistrictCWSN = async (val) => {
    const params = {
      district: val,
    };
    return await API_SERVICE.getDistrictCWSN(params);
  };

  const getBlockAttendance = async (val) => {
    const params = {
      block: val,
    };
    return await API_SERVICE.getBlockAttendance(params);
  };
  const getBlockEnrolment = async (val) => {
    const params = {
      block: val,
    };
    return await API_SERVICE.getBlockEnrolment(params);
  };
  const getBlockPTR = async (val) => {
    const params = {
      block: val,
    };
    return await API_SERVICE.getBlockPTR(params);
  };
  const getBlockCWSN = async (val) => {
    const params = {
      block: val,
    };
    return await API_SERVICE.getBlockCWSN(params);
  };

  const getSchoolAttendance = async (val) => {
    const params = {
      school_name: val,
    };
    return await API_SERVICE.getSchoolAttendance(params);
  };
  const getSchoolEnrolment = async (val) => {
    const params = {
      school_name: val,
    };
    return await API_SERVICE.getSchoolEnrolment(params);
  };
  const getSchoolPTR = async (val) => {
    const params = {
      school_name: val,
    };
    return await API_SERVICE.getSchoolPTR(params);
  };
  const getSchoolCWSN = async (val) => {
    const params = {
      school_name: val,
    };
    return await API_SERVICE.getSchoolCWSN(params);
  };
  // type default 1 end

  const getStudentAssesmentDistrict1Grade48 = async (val) => {
    const params = {
      district: val,
      assessment_type_v2: at,
    };
    return await API_SERVICE.getStudentAssesmentDistrict1Grade48(params);
  };

  const getStudentAssesmentDistrict2Grade48 = async (val) => {
    const params = {
      district: val,
      assessment_type_v2: at,
    };
    return await API_SERVICE.getStudentAssesmentDistrict2Grade48(params);
  };

  const getStudentAssesmentDistrict3Grade48 = async (val) => {
    const params = {
      district: val,
      assessment_type_v2: at,
    };
    return await API_SERVICE.getStudentAssesmentDistrict3Grade48(params);
  };

  const getStudentAssesmentDistrict4Grade48 = async (val) => {
    const params = {
      district: val,
      assessment_type_v2: at,
    };
    return await API_SERVICE.getStudentAssesmentDistrict4Grade48(params);
  };
  const getStudentAssesmentDistrict5Grade48 = async (val) => {
    const params = {
      district: val,
      assessment_type_v2: at,
    };
    return await API_SERVICE.getStudentAssesmentDistrict5Grade48(params);
  };

  const getStudentAssesmentBlock1Grade48 = async (val) => {
    const params = {
      block: val,
      assessment_type_v2: at,
    };
    return await API_SERVICE.getStudentAssesmentBlock1Grade48(params);
  };
  const getStudentAssesmentBlock2Grade48 = async (val) => {
    const params = {
      block: val,
      assessment_type_v2: at,
    };
    return await API_SERVICE.getStudentAssesmentBlock2Grade48(params);
  };

  const getStudentAssesmentBlock3Grade48 = async (val) => {
    const params = {
      block: val,
      assessment_type_v2: at,
    };
    return await API_SERVICE.getStudentAssesmentBlock3Grade48(params);
  };
  const getStudentAssesmentBlock4Grade48 = async (val) => {
    const params = {
      block: val,
      assessment_type_v2: at,
    };
    return await API_SERVICE.getStudentAssesmentBlock4Grade48(params);
  };
  const getStudentAssesmentBlock5Grade48 = async (val) => {
    const params = {
      block: val,
      assessment_type_v2: at,
    };
    return await API_SERVICE.getStudentAssesmentBlock5Grade48(params);
  };

  const getStudentAssesmentSchool1Grade48 = async (val) => {
    const params = {
      school_name: val,
      assessment_type_v2: at,
    };
    return await API_SERVICE.getStudentAssesmentSchool1Grade48(params);
  };
  const getStudentAssesmentSchool2Grade48 = async (val) => {
    const params = {
      school_name: val,
      assessment_type_v2: at,
    };
    return await API_SERVICE.getStudentAssesmentSchool2Grade48(params);
  };

  const getStudentAssesmentSchool3Grade48 = async (val) => {
    const params = {
      school_name: val,
      assessment_type_v2: at,
    };
    return await API_SERVICE.getStudentAssesmentSchool3Grade48(params);
  };
  const getStudentAssesmentSchool4Grade48 = async (val) => {
    const params = {
      school_name: val,
      assessment_type_v2: at,
    };
    return await API_SERVICE.getStudentAssesmentSchool4Grade48(params);
  };
  const getStudentAssesmentSchool5Grade48 = async (val) => {
    const params = {
      school_name: val,
      assessment_type_v2: at,
    };
    return await API_SERVICE.getStudentAssesmentSchool5Grade48(params);
  };

  const getStudentAssesmentBlock1Grade13 = async (val) => {
    const params = {
      assessment_type_v2: val,
    };
    return await API_SERVICE.getStudentAssesmentBlock1Grade13(params);
  };
  const getStudentAssesmentBlock2Grade13 = async (val) => {
    const params = {
      block: val,
    };
    return await API_SERVICE.getStudentAssesmentBlock2Grade13(params);
  };

  const getStudentAssesmentBlock3Grade13 = async (val) => {
    const params = {
      block: val,
    };
    return await API_SERVICE.getStudentAssesmentBlock3Grade13(params);
  };
  const getStudentAssesmentBlock4Grade13 = async (val) => {
    const params = {
      block: val,
    };
    return await API_SERVICE.getStudentAssesmentBlock4Grade13(params);
  };
  const getStudentAssesmentBlock5Grade13 = async (val) => {
    const params = {
      block: val,
    };
    return await API_SERVICE.getStudentAssesmentBlock5Grade13(params);
  };
  const getStudentAssesmentDistrict1Grade13 = async (val) => {
    const params = {
      assessment_type_v2: val,
    };
    return await API_SERVICE.getStudentAssesmentDistrict1Grade13(params);
  };

  const getStudentAssesmentDistrict2Grade13 = async (val) => {
    const params = {
      district: val,
    };
    return await API_SERVICE.getStudentAssesmentDistrict2Grade13(params);
  };
  const getStudentAssesmentDistrict3Grade13 = async (val) => {
    const params = {
      district: val,
    };
    return await API_SERVICE.getStudentAssesmentDistrict3Grade13(params);
  };
  const getStudentAssesmentDistrict4Grade13 = async (val) => {
    const params = {
      district: val,
    };
    return await API_SERVICE.getStudentAssesmentDistrict4Grade13(params);
  };
  const getStudentAssesmentDistrict5Grade13 = async (val) => {
    const params = {
      district: val,
    };
    return await API_SERVICE.getStudentAssesmentDistrict5Grade13(params);
  };

  const getStudentAssesmentSchool1Grade13 = async (val) => {
    const params = {
      assessment_type_v2: val,
    };
    return await API_SERVICE.getStudentAssesmentSchool1Grade13(params);
  };
  const getStudentAssesmentSchool2Grade13 = async (val) => {
    const params = {
      school_name: val,
    };
    return await API_SERVICE.getStudentAssesmentSchool2Grade13(params);
  };
  const getStudentAssesmentSchool3Grade13 = async (val) => {
    const params = {
      school_name: val,
    };
    return await API_SERVICE.getStudentAssesmentSchool3Grade13(params);
  };
  const getStudentAssesmentSchool4Grade13 = async (val) => {
    const params = {
      school_name: val,
    };
    return await API_SERVICE.getStudentAssesmentSchool4Grade13(params);
  };
  const getStudentAssesmentSchool5Grade13 = async (val) => {
    const params = {
      school_name: val,
    };
    return await API_SERVICE.getStudentAssesmentSchool5Grade13(params);
  };
  // type dynamic 2 end

  const getToolTipData = async (district, block, school) => {
    console.log(district, block, school);
    const promiseArray = [];
    if (district) {
      if (type === 2) {
        promiseArray.push(getStudentAssesmentDistrict1Grade48(district));
        promiseArray.push(getStudentAssesmentDistrict2Grade48(district));
        promiseArray.push(getStudentAssesmentDistrict3Grade48(district));
        promiseArray.push(getStudentAssesmentDistrict4Grade48(district));
        promiseArray.push(getStudentAssesmentDistrict5Grade48(district));
      } else if (type === 1) {
        promiseArray.push(getStudentAssesmentDistrict1Grade13(at));
        promiseArray.push(getStudentAssesmentDistrict2Grade13(district));
        promiseArray.push(getStudentAssesmentDistrict3Grade13(district));
        promiseArray.push(getStudentAssesmentDistrict4Grade13(district));
        promiseArray.push(getStudentAssesmentDistrict5Grade13(district));
      }
    } else if (block) {
      if (type === 2) {
        promiseArray.push(getStudentAssesmentBlock1Grade48(block));
        promiseArray.push(getStudentAssesmentBlock2Grade48(block));
        promiseArray.push(getStudentAssesmentBlock3Grade48(block));
        promiseArray.push(getStudentAssesmentBlock4Grade48(block));
        promiseArray.push(getStudentAssesmentBlock5Grade48(block));
      } else if (type === 1) {
        promiseArray.push(getStudentAssesmentBlock1Grade13(at));
        promiseArray.push(getStudentAssesmentBlock2Grade13(block));
        promiseArray.push(getStudentAssesmentBlock3Grade13(block));
        promiseArray.push(getStudentAssesmentBlock4Grade13(block));
        promiseArray.push(getStudentAssesmentBlock5Grade13(block));
      }
    } else {
      if (type === 2) {
        promiseArray.push(getStudentAssesmentSchool1Grade48(school));
        promiseArray.push(getStudentAssesmentSchool2Grade48(school));
        promiseArray.push(getStudentAssesmentSchool3Grade48(school));
        promiseArray.push(getStudentAssesmentSchool4Grade48(school));
        promiseArray.push(getStudentAssesmentSchool5Grade48(school));
      } else if (type === 1) {
        promiseArray.push(getStudentAssesmentSchool1Grade13(at));
        promiseArray.push(getStudentAssesmentSchool2Grade13(school));
        promiseArray.push(getStudentAssesmentSchool3Grade13(school));
        promiseArray.push(getStudentAssesmentSchool4Grade13(school));
        promiseArray.push(getStudentAssesmentSchool5Grade13(school));
      }
    }

    const resData = await Promise.all(promiseArray);

    if (resData) {
      resData.forEach((item) => {
        const processArray = async () => {
          if (item?.data?.rows?.length) {
            const filtered = await item?.data?.rows.filter(
              (item) => item.academic_year === ay
            );
            return filtered[0];
          }
        };
        const temp = processArray();
        temp.then((data) => {
          if (data) {
            const { per_AverageScore, district, academic_year } = data;

            if (type === 2) {
              setToolTipData({
                type: 2,
                academic_year: { label: "Academic Year", value: academic_year },
                percentage_average: {
                  label: "Percentage Average",
                  value: per_AverageScore,
                },
                district: { label: "District", value: district },
                assesment_type: { label: "Assesment Type", value: at },
              });
            } else if (type === 1) {
              console.log(data, "this is data ");
            }
          }
        });
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection:
          config.legend.position.split("-")[0] == "bottom"
            ? "column"
            : "column-reverse",
      }}
    >
      <MapContainer
        bounds={tempBounds}
        className="markercluster-map"
        center={center}
        zoom={8}
        maxZoom={18}
        style={{ height: "40vh" }}
        zoomControl={config.map.zoomControl}
        scrollWheelZoom={config.map.scrollWheelZoom}
        dragging={config.map.dragging}
        doubleClickZoom={config.map.doubleClickZoom}
      >
        {!byGeoJson && (
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        )}
        {/* {byGeoJson && (
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        )} */}
        {(byGeoJson || byBbox) && <MapBound bounds={config.bounds} />}
        {/* <MapBound /> */}
        {byGeoJson && <MapOverlays overlays={config.overlays} />}
        {!byGeoJson && //
          (markers?.shouldClusterMarkers ? (
            <MarkerClusterGroup>
              {/* <div> */}
              {markers?.postions.map((item) => {
                let markerColor = blue_marker;
                if (item.color == "red") {
                  markerColor = red_marker;
                } else if (item.color == "yellow") {
                  markerColor = yellow_marker;
                } else if (item.color == "blue") {
                  markerColor = blue_marker;
                } else if (item.color == "green") {
                  markerColor = green_marker;
                } else if (item.color == "purple") {
                  markerColor = purple_marker;
                }
                const iconPerson = new L.Icon({
                  // iconUrl: new URL(`${item.icon}`),
                  // iconRetinaUrl: new URL(`${item.icon}`),
                  iconUrl: markerColor,
                  iconRetinaUrl: markerColor,
                  iconSize: new L.Point(20, 30),
                  // onclick: getToolTipData,
                  // eventHandlers: { eventHandlers },
                  // className: "leaflet-div-icon",
                });
                return (
                  <Marker position={item.position} icon={iconPerson}>
                    <Popup
                      className="tooltip-popup"
                      onOpen={() => {
                        getToolTipData(item.district, item.block, item.school);
                      }}
                    >
                      {toolTipData.type == 2 ? (
                        <div>
                          <p>
                            <span> {toolTipData.academic_year.label}</span> :{" "}
                            <span>{toolTipData.academic_year.value}</span>
                          </p>
                          <p>
                            <span>{toolTipData.assesment_type.label}</span> :{" "}
                            <span>{toolTipData.assesment_type.value}</span>
                          </p>
                          <p>
                            <span>{toolTipData.district.label}</span> :{" "}
                            <span>{toolTipData.district.value}</span>
                          </p>
                          <p>
                            <span>{toolTipData.percentage_average.label}</span>{" "}
                            :{" "}
                            <span>{toolTipData.percentage_average.value}</span>
                          </p>
                        </div>
                      ) : (
                        <>
                          <div>
                            {item.district || item.block || item.school}
                          </div>
                          <div>
                            Attendence: {toolTipData.Attendance || "NA"}
                          </div>
                          <div>CWSN: {toolTipData.CWSN || "NA"}</div>
                          <div>Enrollment: {toolTipData.Enrolment || "NA"}</div>
                          <div>PTR: {toolTipData.PTR || "NA"}</div>
                        </>
                      )}
                    </Popup>
                  </Marker>
                );
              })}
              {/* </div> */}
            </MarkerClusterGroup>
          ) : (
            //
            <div>
              {markers?.postions.map((item) => {
                let markerColor = blue_marker;
                if (item.color == "red") {
                  markerColor = red_marker;
                } else if (item.color == "yellow") {
                  markerColor = yellow_marker;
                } else if (item.color == "blue") {
                  markerColor = blue_marker;
                } else if (item.color == "green") {
                  markerColor = green_marker;
                } else if (item.color == "purple") {
                  markerColor = purple_marker;
                }
                const iconPerson = new L.Icon({
                  // iconUrl: new URL(`${item.icon}`),
                  // iconRetinaUrl: new URL(`${item.icon}`),
                  iconUrl: markerColor,
                  iconRetinaUrl: markerColor,
                  iconSize: new L.Point(20, 30),
                  // onclick: getToolTipData,
                  // eventHandlers: { eventHandlers },
                  // className: "leaflet-div-icon",
                });
                return (
                  <Marker position={item.position} icon={iconPerson}>
                    <Popup
                      onOpen={() => {
                        getToolTipData(item.district, item.block, item.school);
                      }}
                    >
                      {toolTipData}
                    </Popup>
                  </Marker>
                );
              })}
            </div>
          ))}
      </MapContainer>
      {config.legend.display && (
        <div
          style={{
            display: config.legend.display ? "flex" : "none",
            width: "100%",
            justifyContent:
              config.legend.position.split("-")[1] == "right"
                ? "flex-end"
                : "flex-start",
          }}
        >
          {config.legend.labels.map((item) => {
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "50px",
                    height: 20,
                    backgroundColor: item.color,
                  }}
                />
                <label style={{ ...item, color: "black" }}>{item.label}</label>
              </div>
            );
          })}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row-reverse",
              width: "100%",
              marginRight: "5px",
              cursor: "pointer",
            }}
          >
            <Popover placement="bottom" content={content} trigger="click">
              <MenuOutlined />
            </Popover>
          </div>
        </div>
      )}
    </div>
  );
}
