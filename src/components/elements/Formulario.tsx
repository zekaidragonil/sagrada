"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import Button from "@/components/ui/Button";

import {
  BOOKING_API,
  BOOKING_API_PRICES,
  ATTRACTION_ID,
  DAYS_PERIOD_DISABLED,
  APP_NAME,
  API_URL,
} from "@/config/common.config";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import dayjs from 'dayjs';
import ImageComponent from "../ui/ImageComponent";
import Input from "../ui/input";
import { Modal } from "react-bootstrap";
import { Calendar } from "@nextui-org/calendar";
import './style.css'
interface Field {
  price: number;
  type: string;
  name: string;
  value: number;
  column: string;
  label: string;
}
interface DateChangeEvent {
  day: number;
  month: number;
  year: number;
}

interface Form {
  type: string;
  name: string;
  fields: Field[];

}

interface Fiel {
  column: string,
  label: string,
}

export default function Booking() {

  const { t } = useTranslation("translation");
  const text_badge2 = t("form.text_2");
  const text_alert_badge = t("form.alert_1");
  const modal_title_1 = t("modal.title_1");
  const modal_title_2 = t("modal.title_2");
  const modal_schedula_1 = t("modal.schedula_1");
  const modal_schedula_2 = t("modal.schedula_2");
  const arry_badge = [
    t("tooltip.text_1") !== "tooltip.text_1" ? t("tooltip.text_1") : "",
    t("tooltip.text_2") !== "tooltip.text_2" ? t("tooltip.text_2") : "",
    t("tooltip.text_3") !== "tooltip.text_3" ? t("tooltip.text_3") : "",
    t("tooltip.text_4") !== "tooltip.text_4" ? t("tooltip.text_4") : "",
    t("tooltip.text_4") !== "tooltip.text_4" ? t("tooltip.text_4") : "",
    t("tooltip.text_4") !== "tooltip.text_4" ? t("tooltip.text_4") : "",
  ];

  const [errorForm, setErrorForm] = useState<boolean>(false);

  const [forms, setForms] = useState<Form[]>([]);
  const [formType, setFormType] = useState<string[]>([]);
  const [formFields, setFormFields] = useState<Field[]>([]);

  const [displayOpacity, setDisplayOpacity] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [show, setShow] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [schedulesNoon, setSchedulesNoon] = useState<string[]>([]);
  const [schedulesAfternoon, setSchedulesAfternoon] = useState<string[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null);

  const [disabledDates, setDisabledDates] = useState<string[][]>([]);
  const maxDisabledDate = dayjs().add(DAYS_PERIOD_DISABLED, "day");
  const opactityInterval = useRef<NodeJS.Timeout | null>(null);

  const onChangeDate = async (e: React.ChangeEvent<HTMLInputElement> | DateChangeEvent) => {
    const dateEvent = e as DateChangeEvent;
    const { day, month, year } = dateEvent;
    const date = new Date(year, month - 1, day);
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setSelectedDate(formattedDate)
    try {
      const schedules = await fetch(
        `https://dev.ticketgotourism.com/api/attraction/schedule?attraction=${ATTRACTION_ID}&date=${formattedDate}&form=${formType}`
      );
      const data = await schedules.json();
      const morningSchedules: string[] = [];
      const afternoonSchedules: string[] = [];

      data.forEach((schedule:string) => {
        const [hours, minutes] = schedule.split(":").map(Number);
        const scheduleDate = new Date();
        scheduleDate.setHours(hours, minutes, 0, 0);

        const noon = new Date();
        noon.setHours(12, 0, 0, 0);

        if (scheduleDate < noon) {
          morningSchedules.push(schedule);
        } else {
          afternoonSchedules.push(schedule);
        }
      });
      setSchedulesNoon(morningSchedules);
      setSchedulesAfternoon(afternoonSchedules);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDaysDisabled = async () => {
    try {
      const days_disabled = await fetch(
        `${API_URL}/attraction/calendar/disabled?attraction=${ATTRACTION_ID}&days=${DAYS_PERIOD_DISABLED}&form=${formType}`
      );
      const disable = await days_disabled.json();
        console.log(disable)
      if (disable) {
        setDisabledDates(disable);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectSchedule = (schedule: string) => {
    setSelectedSchedule(schedule);
  };

  const isDateUnavailable = () => {
    const date = new Date();
    const dateString = date.toString();
    for (const element of disabledDates) {
      if (dateString === element.join("-")) {
        return true;
      }
    }

    return false;
  };

  const onOpenModal = () => {
    if (totalPrice > 0) {
      fetchDaysDisabled()
      return openModal();
    }
    showAlert();
  };

  const showAlert = () => {
    setShow(true);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const onSubmit = async () => {
    const selectedForm = formFields.filter((field) => field.value > 0);
    const purchaseData = {
      hora: selectedSchedule,
      fecha: selectedDate,
      qty_form: selectedForm[0]?.type || "",
      qty_a: selectedForm.find((field) => field.column === "qty_a")?.value || 0,
      qty_b: selectedForm.find((field) => field.column === "qty_b")?.value || 0,
      qty_c: selectedForm.find((field) => field.column === "qty_c")?.value || 0,
      total: totalPrice.toFixed(2),
      totalCurrency: `${totalPrice.toFixed(2)}€`,
      formFields,
    };
    localStorage.setItem(
      `${APP_NAME.replace(/ /g, "_")}_formValues`, JSON.stringify(purchaseData)
    );

    window.location.href = '/purchase';
  };

 

  useEffect(() => {
    const fetchData = async () => {
     
      try {
        const [formList, prices] = await Promise.all([
          fetch(BOOKING_API),
          fetch(BOOKING_API_PRICES),
        ]);
        const pricesData = await prices.json();
        const data = await formList.json();
        const fields: Field[] = [];
        const forms: Form[] = [];
        if (data.length === 1) {
          if (!forms.includes(data[0].name)) {
            forms.push(data[0].name);
          }
          data[0].fields.map((field:Fiel,) => {
            const price = field.column.replace(/_/g, "");
            fields.push({
              price: pricesData[price],
              type: data[0].type,
              name: data[0].name,
              value: 0,
              ...field,
            });
          });
        } 
        setForms(forms);
        setFormFields(fields);
      } catch (error) {
        setErrorForm(true);
        console.log(error);
      }
    
    };
    fetchData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

useEffect(() => {
  if (show === null) {
    if (opactityInterval.current !== null) clearInterval(opactityInterval.current);
    return;
  }
  if (!show) {
    let transition = 1;
    opactityInterval.current = setInterval(() => {
      transition -= 0.1;
      setDisplayOpacity(transition);
      if (transition <= 0) {
        if (opactityInterval.current !== null) clearInterval(opactityInterval.current);
        setDisplayOpacity(0);
      }
    }, 50);
  } else {
    let transition = 0;
    opactityInterval.current = setInterval(() => {
      transition += 0.1;
      setDisplayOpacity(transition);
      if (transition >= 1) {
        if (opactityInterval.current !== null) clearInterval(opactityInterval.current);
        setDisplayOpacity(1);
      }
    }, 50);
  }

  // Cleanup on component unmount or if 'show' changes
  return () => {
    if (opactityInterval.current !== null) clearInterval(opactityInterval.current);
  };
}, [show]);

  const onChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    setShow(false);
    setFormType([e.target.type]);
    // buscar en formFields el campo que se ha cambiado

    const target = e.target as HTMLInputElement & { typeForm?: string };
    const fieldIndex = formFields.findIndex(
      (field) =>
          field.name === target.typeForm && field.column === target.name
  );

    if (fieldIndex === -1) return;
    const newFields = [...formFields];
    // actualiza todos los inputs a valor 0 donde el typeForm no coincide con el nombre del campo
    for (const field of newFields) {
      if (field.name !== target.typeForm) {
        field.value = 0;
      }
    }
    newFields[fieldIndex].value = parseInt(e.target.value);
    setFormFields(newFields);
  
    let total = 0;
    for (const field of formFields) {
      const value = field.value;
      const price = field.price;
      const totalValue = value * price;
      total += totalValue;
    }
    setTotalPrice(total);
  };


  return (
    <div className="hero__form" data-aos="fade-up" >
      <h3 className="title-bold">{t("form.text_1")}</h3>
      <p className="badge-info form.text_2">
        <ImageComponent
          src="/images/icons/info_icon.svg"
          alt="icon"
          width={19}
          height={19}
        />
        {text_badge2}
      </p>
      {totalPrice === 0 && (
        <p id="form-error-message"
          className={"badge-info badge-alert mt-1"}
          style={{
            display: displayOpacity !== 0 ? "block" : "none",
            opacity: displayOpacity,
          }}
        >
          {text_alert_badge}
        </p>
      )}
      {!errorForm && (
        <form
          onSubmit={onSubmit}
        >
            <div className=" form__content">
              {formFields.map((field, index) => (
                <Input
                  key={`${field.column}-${index}`}
                  value={field.value}
                  label={field.label}
                  name={field.column}
                  price={field.price}
                  placeholder="0"
                  type={field.type}
                  typeForm={field.name}
                  id={field.column}
                  tooltip={t(arry_badge[index])}
                  onChange={onChangeInput}
                />
              ))}
              <Input
                date={selectedDate}
                label={t("form.text_5")}
                placeholder="DD / MM / YYYY"
                type="date"
                name="date"
                price={0}
                typeForm="yourTypeFormValue"
                onChange={onChangeDate}
                onClick={() => onOpenModal()}
              />
            </div>   
        </form>
      )}
      <div className=" form__content">
        {forms.length <= 1 && (
          <div className="hero__form__blk sb_btn order-last order-md-5 ">
            {t("form.text_6") !== "form.text_6" && (
              <Button
                type="submit"
                text={t("form.text_6")}
                banner={true}
                className="thm_btn Ticket_purchase hero__form__blkButton"
                disabled={selectedSchedule === null}
                active={selectedSchedule !== null}
                onClick={() => onSubmit()}
              />
            )}
          </div>
        )}
        <div className="hero__form__blk total__price order-5 order-md-last">
          <h1 className="Ticket_total">
            {t("form.total")}:{" "}
            {totalPrice > 0 ? `${totalPrice.toFixed(2)}€` : " "}
          </h1>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={closeModal}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modal_title_1 !== "modal.title_1" && <p className="mt-2">{modal_title_1}</p>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Calendar
            aria-label="Date (Controlled)"
            color="warning"
            defaultValue={selectedDate ? parseDate(dayjs(selectedDate).format('YYYY-MM-DD')) : null}
            minValue={today(getLocalTimeZone())}
            maxValue={parseDate(maxDisabledDate.format('YYYY-MM-DD'))}
            onChange={onChangeDate}
            isDateUnavailable={isDateUnavailable}
          />

          {modal_title_2 !== "modal.schedula_1" &&
            (schedulesNoon.length > 0 || schedulesAfternoon.length > 0) && (
              <p className="modal_title_2">{modal_title_2}</p>
            )}
          {schedulesNoon.length > 0 && (
            <div className="d-flex flex-column justify-content-center align-items-center px-3">
              {modal_schedula_1 !== "modal.schedula_1" && (
                <p className="modal_schedula_1">{modal_schedula_1}</p>
              )}
              <div className="d-flex flex-wrap">
                {schedulesNoon.map((schedule, index) => {
                  return (
                    <div className="col-3" key={index}>
                      <button
                        className={`btn-schedules-time ${selectedSchedule === schedule ? "selected" : ""
                          }`}
                        onClick={() => handleSelectSchedule(schedule)}
                      >
                        {schedule}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {schedulesAfternoon.length > 0 && (
            <div className="d-flex flex-wrap justify-content-center px-3">
              {modal_schedula_2 !== "modal.schedula_2" && (
                <p className="modal_schedula_2">{modal_schedula_2}</p>
              )}
              <div className="d-flex flex-wrap ">
                {schedulesAfternoon.map((schedule, index) => {
                  return (
                    <div className="col-3" key={index}>
                      <button
                        className={`btn-schedules-time ${selectedSchedule === schedule ? "selected" : ""
                          }`}
                        onClick={() => handleSelectSchedule(schedule)}
                      >
                        {schedule}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div className="flex justify-center">
         
          {t("form.text_6") !== "form.text_6" && selectedSchedule !== null && (
            <Button
              type="submit"
              text={t("form.text_6")}
              banner={true}
              footer={true}
              calendar={true}
              className="thm_btn Ticket_purchase hero__form__blkButton mt-2"
              disabled={selectedSchedule === null}
              active={selectedSchedule !== null}
              onClick={() => onSubmit()}
            />
          )}
           </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
