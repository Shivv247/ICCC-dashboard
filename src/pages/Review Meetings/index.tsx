import React, { FC, useEffect, useState } from "react";
import { Card, Col, Layout, Row, Divider, Image, Select } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import "./index.css";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import { NavLink } from "react-router-dom";
import MapComponent from "../../components/MapComponent/MapComponent.jsx";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";

import API_SERVICE from "../../services/api-service";
import parameters from "../../services/parameters";

const default_marker_config = {
  map: {
    zoomControl: false,
    scrollWheelZoom: false,
    dragging: false,
    doubleClickZoom: false,
  },
  legend: {
    display: true,
    position: "top-left",
    labels: [
      {
        width: 200,
        fontSize: 20,
        color: "#FFFF99",
        fontFamily: "sans-serif",
        fontWeight: "bold",
        padding: 10,
        label: ">= 80%",
      },
      {
        width: 200,
        fontSize: 20,
        color: "#259EA6",
        fontFamily: "sans-serif",
        fontWeight: "bold",
        padding: 10,
        label: "50% - 80%",
      },
      {
        width: 200,
        fontSize: 20,
        color: "#FF0000",
        fontFamily: "sans-serif",
        fontWeight: "bold",
        padding: 10,
        label: "<50%",
      },
    ],
  },
  bounds: {
    byGeoJson: [],
  },
  overlays: [],
};

const ReviewMeeting: FC = () => {
  const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const yearArr = ["2022-23"];
  const districts = [
    "SIRMAUR",
    "CHAMBA",
    "UNA",
    "KULLU",
    "KANGRA",
    "MANDI",
    "SOLAN",
    "SHIMLA",
    "HAMIRPUR",
    "LAHUL AND SPITI",
    "BILASPUR",
    "KINNAUR",
  ];
  const [markerConfig, setMarkerConfig] = useState(default_marker_config);
  const [loading, setLoading] = useState(false);
  const [curDistrict, setCurDistrict] = useState("");
  const [curMonth, setCurMonth] = useState(1);
  const [curYear, setCurYear] = useState("2022-23");
  const [config, setConfig] = useState([]);
  const [selectedButton, setSelectedButton] = useState(1);
  const [districtValueData, setDistrictValueData] = useState([]);
  const [blockValueData, setBlockValueData] = useState();
  const [marker, setMarker] = useState("Districts");
  const [district, setDistrict] = useState([]);
  const [monthDropdown, setMonthDropdown] = useState(monthArr);
  const [yearDropdown, setYearDropdown] = useState(yearArr);
  const [blockGeo, setBlockGeo] = useState([]);
  const [bounds, setBounds] = useState([]);
  const [districtGeo, setDistrictGeo] = useState([]);
  const getConfig = () => {
    if (config.length) {
      return;
    }

    fetch("/reviewConfig.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (configJson) {
        setConfig(configJson);
      });
  };

  console.log("block geo", blockGeo);
  // const bounds= await fetch("http://localhost:3000/bounds.json");
  // const districtGeo= await fetch("http://localhost:3000/districtGeo.json");
  const onDistrictChange = async (value: any) => {
    let districtData: any = [];
    let blockData: any = [];
    const params: any = {
      district: value,
    };

    districtData = await API_SERVICE.getDistrictAttendanceBoundary(params);
    blockData = await API_SERVICE.getBlockAttendanceBoundary(params);

    setDistrictValueData(
      districtData.data.rows.filter((item: any) => {
        return item.district === value;
      })
    );
    setBlockValueData(blockData.data);

    setSelectedButton(value);
  };

  const getDistrictAttendanceData = async (
    District: any,
    Month: any,
    _districtGeo?: any,
    _bounds?: any
  ) => {
    setLoading(true);
    let data: any = [{}];
    const params: any = {
      district: "SIRMAUR",
    };
    data = await API_SERVICE.getDistrictAttendanceBoundary(params);
    //@ts-ignore
    const monthWiseData = monthArr.map((val) => {
      return data.data.rows.filter((item: any) => {
        return item.month == val;
      });
    });
    const overlays = monthWiseData.map((val) => {
      return val.map((item: any) => {
        return {
          id: 1,
          // Month:
          DistrictName: item.district,
          color: item.HexCodes,
          opacity: 1,
          // @ts-ignore:
          geoJson: (_districtGeo || districtGeo).features.filter((key: any) => {
            return (
              key.properties.NAME_2.toLowerCase() ===
              item.district.toLowerCase()
            );
          })[0]?.geometry.coordinates[0],
        };
      });
    });
    const labels = data.data.rows.map((item: any) => {
      return {
        width: 100,
        fontSize: 20,
        color: "#ff0000",
        fontFamily: "sans-serif",
        fontWeight: "bold",
        padding: 10,
        label: item.district,
      };
    });

    const updatedConfig = {
      map: {
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: false,
        doubleClickZoom: false,
      },
      legend: {
        display: true,
        position: "top-left",
        labels: [
          {
            width: 200,
            fontSize: 20,
            color: "#FFFF99",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            padding: 10,
            label: ">= 80%",
          },
          {
            width: 200,
            fontSize: 20,
            color: "#259EA6",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            padding: 10,
            label: "50% - 80%",
          },
          {
            width: 200,
            fontSize: 20,
            color: "#FF0000",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            padding: 10,
            label: "<50%",
          },
        ],
      },
      bounds: {
        byGeoJson: _bounds || bounds,
      },
      overlays: overlays[Month],
    };

    // console.log(updatedConfig.overlays, Month);

    setMarkerConfig(updatedConfig);
    setLoading(false);
    setDistrict(
      data.data.rows.map((item: any) => {
        return item.district;
      })
    );
  };
  const getBlockAttendanceData = async (
    district: any,
    _districtGeo: any,
    _blockGeo: any,
    _bounds: any
  ) => {
    setLoading(true);
    let data: any = [{}];
    const params: any = {
      district: curDistrict,
    };
    data = await API_SERVICE.getBlockAttendanceBoundary(params);
    const monthWiseData = monthArr.map((val) => {
      return data.data.rows.filter((item: any) => {
        return item.month == val;
      });
    });
    const labels = data.data.rows.map((item: any) => {
      return {
        width: 100,
        fontSize: 20,
        color: item.HexCodes,
        fontFamily: "sans-serif",
        fontWeight: "bold",
        padding: 10,
        label: item.district,
      };
    });
    const overlays = districts
      .filter((key) => {
        return key.toLowerCase() == curDistrict.toLowerCase();
      })
      .map((key) => {
        //@ts-ignore
        return (blockGeo || _blockGeo).features
          .filter((item: any) => {
            return item.properties.dtname.toLowerCase() === key.toLowerCase();
          })
          .map((item: any) => {
            return {
              id: 1,
              DistrictName: key,
              BlockName: item.properties.sdtname,
              // color: monthWiseData[curMonth-1].block,
              color: "#ff0000",
              opacity: 1,
              //@ts-ignore
              geoJson: item.geometry.coordinates[0],
            };
          });
      })[0];

    // console.log(monthWiseData[curMonth - 1]);

    overlays.forEach((key: any) => {
      const temp = monthWiseData[curMonth - 1].filter((item: any) => {
        return item.block.toLowerCase() == key.BlockName.toLowerCase();
      });
      // console.log(temp);
    });

    // console.log(overlays);
    // @ts-ignore:
    const bounds = (districtGeo || _districtGeo).features.find((item: any) => {
      return item.properties.NAME_2.toLowerCase() === curDistrict.toLowerCase();
    })?.geometry.coordinates[0];

    const updatedConfig = {
      map: {
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: false,
        doubleClickZoom: false,
      },
      legend: {
        display: true,
        position: "top-left",
        labels: [
          {
            width: 200,
            fontSize: 20,
            color: "#FFFF99",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            padding: 10,
            label: ">= 80%",
          },
          {
            width: 200,
            fontSize: 20,
            color: "#259EA6",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            padding: 10,
            label: "50% - 80%",
          },
          {
            width: 200,
            fontSize: 20,
            color: "#FF0000",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            padding: 10,
            label: "<50%",
          },
        ],
      },
      bounds: {
        byGeoJson: bounds || _bounds,
      },
      overlays: overlays,
    };

    // console.log(updatedConfig);

    //@ts-ignore
    setMarkerConfig(updatedConfig);
    setLoading(false);
  };

  const filterData = (district: any, month: any, year: any) => {
    if (district) {
      // console.log(district);
      getBlockAttendanceData(district, districtGeo, blockGeo, bounds);
    }
    if (month) {
      // console.log(month);
    }
    if (year) {
      // console.log(year);
    }
  };
  const getBlockGeoJson = (callback: any) => {
    fetch("/blockGeo.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(callback);
  };
  const getBoundGeoJson = (callback: any) => {
    fetch("/bounds.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (boundRep) {
        return boundRep.json();
      })
      .then(callback);
  };
  const getDistrictGeoJson = (callback: any) => {
    fetch("/districtGeo.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(callback);
  };

  useEffect(() => {
    getConfig();

    if (!curDistrict) {
      getBoundGeoJson(function (bounds: any) {
        getDistrictGeoJson((districtResp: any) => {
          getBlockGeoJson((blockRep: any) => {
            setDistrictGeo(districtResp);
            setBlockGeo(blockRep);
            getDistrictAttendanceData(
              "District",
              curMonth - 1,
              districtResp,
              bounds
            );
          });
        });
      });
    } else {
      getBoundGeoJson(function (bounds: any) {
        getDistrictGeoJson((districtResp: any) => {
          setDistrictGeo(districtResp);
          getBlockGeoJson((blockRep: any) => {
            setBlockGeo(blockRep);
            getBlockAttendanceData("District", districtResp, blockRep, bounds);
          });
        });
      });
    }
  }, [curMonth, curDistrict]);

  return (
    <Layout className={"layout-wrapper home-wrapper"}>
      <Content style={{ padding: "10px", backgroundColor: "#FFFFFF" }}>
        {/* <Row><BreadcrumbItem></BreadcrumbItem></Row> */}
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col span={4}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontSize: "22px" }} className="h3">
                District
              </h3>
              <select
                style={{ height: "40px", fontSize: "22px", cursor: "pointer" }}
                onChange={(val: any) => {
                  setCurDistrict(val.target.value);
                }}
                className="select"
                placeholder={"Choose District sasd"}
              >
                {districts.map((obj: any, i: number) => {
                  return (
                    <option key={i} value={obj}>
                      {obj}
                    </option>
                  );
                })}
              </select>
            </div>
          </Col>
          <Col offset={1} span={4}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontSize: "22px" }} className="h3">
                Year
              </h3>
              <select
                style={{ height: "40px", fontSize: "22px", cursor: "pointer" }}
                onChange={(val: any) => {
                  filterData(null, val, null);
                  setCurYear(val.target.value);
                }}
                placeholder={"Choose Year"}
              >
                {yearDropdown.map((obj: any, i: number) => {
                  return (
                    <option key={i} value={obj}>
                      {obj}
                    </option>
                  );
                })}
              </select>
            </div>
          </Col>
          <Col offset={1} span={4}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontSize: "22px" }} className="h3">
                Month
              </h3>
              <select
                style={{ height: "40px", fontSize: "22px", cursor: "pointer" }}
                onSelect={(val: any) => {
                  setCurMonth(val.target.value);
                }}
                placeholder={"Choose Month"}
              >
                {monthDropdown.map((obj: any, i: number) => {
                  return (
                    <option key={i} value={obj}>
                      {obj}
                    </option>
                  );
                })}
              </select>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <h2 className="h2">State-wise status of Block Review Meetings</h2>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div style={{ width: "100%", border: "1px solid black" }}>
              <Card style={{ height: "100%" }} loading={loading}>
                <MapComponent
                  config={markerConfig}
                  //@ts-ignore
                  markers={config.markers}
                ></MapComponent>
              </Card>
            </div>
          </Col>
        </Row>
        {/* <Row>
          <Col span={24}>
            <h2 className="h2">Block-wise status of Block Review Meetings</h2>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <h2 className="h2">
              District-wise status of Block Review Meetings
            </h2>
          </Col>
        </Row> */}
      </Content>
      {/* <Content>
          <Row justify={'center'} align={'middle'} className="container">
            <Title level={3}>INTEGRATED EDUCATION DASHBOARD</Title>
            <Divider>एकीकृत शिक्षा डैशबोर्</Divider>
            <Row gutter={30}>
              <Col> */}
      {/*@ts-ignore*/}
      {/* <Tile thumbnail={schools} titleEN="SCHOOLS" titleHI="विद्यालय" data={sample_data.schools} count={15330} />
              </Col>
              <Col> */}
      {/*@ts-ignore*/}
      {/* <Tile thumbnail={students} titleEN="STUDENTS" titleHI="विद्यालय" data={sample_data.schools} count={15330} />
              </Col>
              <Col> */}
      {/*@ts-ignore*/}
      {/* <Tile thumbnail={teachers} titleEN="TEACHERS" titleHI="विद्यालय" data={sample_data.schools} count={15330} />
              </Col>
            </Row>
          </Row>
        </Content>
        <Row align="middle" justify="space-between" className="footer">
          <Image src={FooterLogo} height={"50px"} />
          <Image src={FooterRightLogo} height={"50px"} />
        </Row> */}
    </Layout>
  );
};

export default ReviewMeeting;
