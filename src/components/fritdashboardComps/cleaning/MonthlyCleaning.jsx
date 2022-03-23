import React, { useContext, useEffect, useState } from "react";
/* import {
  Button,
  Confirm,
  Container,
  Form,
  Grid,
  Header,
  Label,
  Segment,
} from "semantic-ui-react"; */
/* import { LineContext } from "../../../context/ContextProvider"; */
/* import {
  get_cleaning_orders,
  screen_cleaning_stop_btn,
  screen_of_pause_btn,
  screen_of_start_btn,
} from "../../../services/OFservices";
import { ApiCall, MemoryDatabaseCall } from "../../../services/Service";
import { createNotification } from "../../../common/alerts/NotificationAlert";
import { cleaning_type_options } from "../../../services/serviceHelper";
import { operation_states } from "../../Cleaning/helper_cleaning";
import LoadingSpinner from "../../../common/LoadingSpinner";
import uuid from "react-uuid";
import _ from "lodash";
import { parseTimeDec } from "./helper"; */

const MonthlyCleaning = () => {
  /*   const [loading, setLoading] = useState(false);
  const [loadingInitialData, setLoadingInitialData] = useState(false);
  const [loadingPlay, setLoadingPlay] = useState(false);
  const [loadingPause, setLoadingPause] = useState(false);
  const [loadingStop, setLoadingStop] = useState(false);
  const [refreshMain, setRefreshMain] = useState(false);
  const { line } = useContext(LineContext);

  const [typeSelected, setTypeSelected] = useState(undefined);
  const [timeSelected, setTimeSelected] = useState(undefined);
  const [monthlyCleaningData, setMonthlyCleaningData] = useState(undefined);
  const [notificationModal, setNotificationModal] = useState({});
  const [cleaningTypeOptions, setCleaningTypeOptions] = useState([]);
  const [confirmStop, setConfirmStop] = useState(false); */

  useEffect(
    () => {
      if (line) {
        fetchMonthlyCleaningData(line.entId);
        fetchCleaningTypes();
      }
    },
    //eslint-disable-next-line
    []
  );

  useEffect(() => {
    if (typeSelected && cleaningTypeOptions) {
      const time =
        cleaningTypeOptions.length > 0 &&
        cleaningTypeOptions.find((el) => el.value === typeSelected).duration;

      setTimeSelected(time);
    }
    //eslint-disable-next-line
  }, [typeSelected]);

  useEffect(() => {
    if (refreshMain) {
      fetchMonthlyCleaningData(line.entId);
      fetchCleaningTypes();
    }
    return () => {
      setRefreshMain(false);
    };
    //eslint-disable-next-line
  }, [refreshMain]);

  const fetchCleaningTypes = async () => {
    setLoading(true);

    const response = await ApiCall({
      params: cleaning_type_options({ entId: line.entId }),
    });
    if (response.responseError) {
      setLoading(false);
      createNotification({
        status: "error",
        code: response.responseError,
        msg: response.responseMsg,
        hide: response.responseHide,
      });
    } else {
      setLoading(false);

      const newArr =
        response.responseData.tiposOperacionLimpiezaDisponibles.map((el) => ({
          key: uuid(),
          text: el.Descripcion,
          value: el.Tipo,
          duration: el.Duracion,
          label: {
            color:
              el.Tipo === "P"
                ? "purple"
                : el.Tipo === "A"
                ? "blue"
                : el.Tipo === "S"
                ? "yellow"
                : "grey",
            empty: true,
            circular: true,
          },
        }));

      setCleaningTypeOptions(newArr);
    }
  };

  const fetchMonthlyCleaningData = async (entId) => {
    setLoadingInitialData(true);
    const filter = [
      {
        filterExpression: null,
        filterItem: {
          column: "ent",
          dataType: "INT",
          value: entId,
          filterItemType: "Equal",
          checkDBNull: false,
        },
      },
    ];

    const response = await MemoryDatabaseCall({
      params: get_cleaning_orders({ filter }),
      url: "queryDataFrameDataAsync",
    });

    if (response) {
      if (response.length > 0) {
        const newArr = _.orderBy(response, ["seq_no"], ["desc"]);
        setMonthlyCleaningData(newArr[0]);
      } else {
        createNotification({
          status: "info",
          msg: "No hay limpieza mensual asociada a esta línea",
          hide: 1,
        });
        setNotificationModal({
          status: "info" /* HARDCODED */,
          msg: "No hay limpieza mensual asociada a esta línea",
          hide: 0,
          type: "screen",
          size: "large",
        });
      }
    }
    setLoadingInitialData(false);
  };

  const handleResultChange = (e, d) => {
    setTypeSelected(d.value);
  };

  const handlePlay = async () => {
    if (
      monthlyCleaningData.state_cd === 5 ||
      (typeSelected && (timeSelected || timeSelected === 0))
    ) {
      setLoadingPlay(true);
      const response = await ApiCall({
        params: screen_of_start_btn({
          items_arr: [
            {
              woId: monthlyCleaningData.wo_id,
              operId: monthlyCleaningData.oper_id,
              seqNo: monthlyCleaningData.seq_no,
              duracionLimpieza:
                monthlyCleaningData.state_cd === 5
                  ? cleaningTypeOptions.find(
                      (el) => el.value === monthlyCleaningData.job_desc
                    ).duration
                  : parseInt(timeSelected),
              tipoLimpieza:
                monthlyCleaningData.state_cd === 5
                  ? cleaningTypeOptions.find(
                      (el) => el.value === monthlyCleaningData.job_desc
                    ).value //? .value
                  : typeSelected,
            },
          ],
        }),
      });

      if (response.responseError) {
        setLoadingPlay(false);
        createNotification({
          status: "error",
          code: response.responseError,
          msg: response.responseMsg,
          hide: response.responseHide,
        });
      } else {
        setLoadingPlay(false);
        createNotification({
          status: "success",
          msg: "¡Limpieza iniciada correctamente!",
          hide: response.responseHide,
        });
        setRefreshMain(true);
      }
    } else {
      createNotification({
        status: "info",
        msg: "Debes seleccionar un tipo de limpieza válido",
        hide: 1,
      });
    }
  };

  const handlePause = async () => {
    setLoadingPause(true);

    const response = await ApiCall({
      params: screen_of_pause_btn([
        {
          woId: monthlyCleaningData.wo_id,
          operId: monthlyCleaningData.oper_id,
          seqNo: monthlyCleaningData.seq_no,
        },
      ]),
    });

    if (response.responseError) {
      setLoadingPause(false);
      createNotification({
        status: "error",
        code: response.responseError,
        msg: response.responseMsg,
        hide: response.responseHide,
      });
    } else {
      setLoadingPause(false);
      createNotification({
        status: "success",
        msg: "¡Limpieza Pauseada correctamente!",
        hide: response.responseHide,
      });
    }
    setRefreshMain(true);
  };

  const handleStop = async () => {
    setLoadingStop(true);
    setConfirmStop(false);
    const response = await ApiCall({
      params: screen_cleaning_stop_btn({
        arr_items: [
          {
            woId: monthlyCleaningData.wo_id,
            operId: monthlyCleaningData.oper_id,
            seqNo: monthlyCleaningData.seq_no,
            entName: line.entName, // ? REVIEW: NO HA SIDO TESTEADO,
          },
        ],
      }),
    });

    if (response.responseError) {
      setLoadingStop(false);

      createNotification({
        status: "error",
        code: response.responseError,
        msg: response.responseMsg,
        hide: response.responseHide,
      });
    } else {
      setLoadingStop(false);
      createNotification({
        status: "success",
        msg: "¡Limpieza parada correctamente!",
        hide: response.responseHide,
      });
      setRefreshMain(true);
    }
  };

  return loadingInitialData || loading ? (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  ) : (
    <>
      <Container style={{ padding: 20 }}>
        {/* {notificationModal && notificationModal.status && (
          <AlertModal
            status={notificationModal.status}
            msg={notificationModal.msg}
            hide={notificationModal.hide}
            type={notificationModal.type}
            setNotificationModal={setNotificationModal}
            size={notificationModal.size}
          />
        )}
        <Segment style={{ padding: "1em" }}>
          <Grid>
            <Grid.Row>
              <Grid.Column mobile={16} tablet={16} computer={8}>
                <Header as="h2">
                  <span>
                    Limpieza Periódica
                    {monthlyCleaningData &&
                      ` en ${monthlyCleaningData.run_ent_name}`}
                  </span>
                </Header>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={16} computer={8}>
                <Header as="h3">
                  {monthlyCleaningData && (
                    <Label
                      size={"large"}
                      color={
                        monthlyCleaningData.state_cd === 1
                          ? "orange"
                          : monthlyCleaningData.state_cd === 5
                          ? "red"
                          : "teal"
                      }
                      style={{ float: "right" }}
                    >
                      {monthlyCleaningData.EstadoDesc}
                    </Label>
                  )}
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign="center">
              <Grid.Column width={16}>
                <Container style={{ width: 350 }}>
                  <Form widths="equal">
                    <Form.Group>
                      <Label color="blue" size="big">
                        Tipo
                      </Label>

                      {cleaningTypeOptions &&
                      cleaningTypeOptions.length > 0 &&
                      monthlyCleaningData ? (
                        <>
                          {monthlyCleaningData.state_cd === 1 ||
                          monthlyCleaningData.state_cd === 2 ? (
                            <Form.Dropdown
                              type={"dropdown"}
                              placeholder="Tipo de Limpieza"
                              selection
                              options={cleaningTypeOptions}
                              onChange={(e, d) => handleResultChange(e, d)}
                            />
                          ) : (
                            <Form.Input
                              value={
                                cleaningTypeOptions.find(
                                  (el) =>
                                    el.value === monthlyCleaningData.job_desc
                                )?.text ||
                                cleaningTypeOptions.find(
                                  (el) =>
                                    el.text === monthlyCleaningData.job_desc
                                )?.text ||
                                ""
                              }
                              readOnly
                            />
                          )}
                        </>
                      ) : (
                        <Form.Input readOnly />
                      )}
                    </Form.Group>
                    <Form.Group>
                      <Label color="blue" size="big">
                        Tiempo
                      </Label>

                      {cleaningTypeOptions &&
                      cleaningTypeOptions.length > 0 &&
                      monthlyCleaningData ? (
                        monthlyCleaningData.state_cd === 1 ||
                        monthlyCleaningData.state_cd === 2 ? (
                          <Form.Input
                            width={8}
                            readOnly
                            value={
                              timeSelected || timeSelected === 0
                                ? parseTimeDec({
                                    seconds: timeSelected * 60,
                                  })
                                : ""
                            }
                            placeholder="Selecciona un tipo de limpieza"
                            type="text"
                          />
                        ) : (
                          <Form.Input
                            width={8}
                            readOnly
                            value={parseTimeDec({
                              seconds:
                                cleaningTypeOptions.find(
                                  (el) =>
                                    el.value === monthlyCleaningData?.job_desc
                                )?.duration * 60,
                            })}
                            placeholder="Selecciona un tipo de limpieza"
                            type="text"
                          />
                        )
                      ) : (
                        <Form.Input readOnly />
                      )}
                    </Form.Group>
                  </Form>
                </Container>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign="center">
              <Grid.Column width={16}>
                <Button
                  size={"huge"}
                  icon="play"
                  onClick={handlePlay}
                  loading={loadingPlay}
                  disabled={
                    monthlyCleaningData && monthlyCleaningData.state_cd
                      ? operation_states({
                          stateCd: monthlyCleaningData.state_cd,
                          type: "cleaning",
                        }).play
                      : true
                  }
                />
                <Button
                  size={"huge"}
                  icon="pause"
                  loading={loadingPause}
                  onClick={handlePause}
                  disabled={
                    monthlyCleaningData && monthlyCleaningData.state_cd
                      ? operation_states({
                          stateCd: monthlyCleaningData.state_cd,
                          type: "cleaning",
                        }).pause
                      : true
                  }
                />

                <Button
                  icon="stop"
                  size={"huge"}
                  onClick={() =>
                    cleaningTypeOptions &&
                    cleaningTypeOptions.find(
                      (el) => el.value === monthlyCleaningData?.job_desc
                    )?.duration *
                      60 >
                      0
                      ? setConfirmStop(true)
                      : handleStop()
                  }
                  loading={loadingStop}
                  disabled={
                    monthlyCleaningData && monthlyCleaningData.state_cd
                      ? operation_states({
                          stateCd: monthlyCleaningData.state_cd,
                          type: "cleaning",
                        }).stop
                      : true
                  }
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment> */}
      </Container>
      {/*   <Confirm
        content="No se ha llegado al tiempo mínimo de limpieza. ¿Deseas finalizar realmente la limpieza?"
        open={confirmStop}
        close={() => setConfirmStop(false)}
        cancelButton="No"
        confirmButton="Sí"
        onCancel={() => setConfirmStop(false)}
        onConfirm={handleStop}
      /> */}
    </>
  );
};

export default MonthlyCleaning;
