import { getDateTime, round } from "../utils/dateUtils.js";

export const baseUrl = "https://61f1a2e0072f86001749f2ec.mockapi.io/event";

export const fetchData = (event) => {
  event.dateFrom = new Date(
    new Date(getDateTime(event.date, event.dateFrom)).setMinutes(
      round(new Date(getDateTime(event.date, event.dateFrom)).getMinutes())
    )
  );
  event.dateTo = new Date(
    new Date(getDateTime(event.date, event.dateTo)).setMinutes(
      round(new Date(getDateTime(event.date, event.dateTo)).getMinutes())
    )
  );
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to create event");
    }
  });
};

export const removeEvent = (id) => {
  fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to delete event ${id}`);
    }
  });
};

export const compareEvent = (event) => {
  if (
    getDateTime(event.date, event.dateTo).getHours() -
      getDateTime(event.date, event.dateFrom).getHours() >
    6
  ) {
    return;
  }
  fetch(baseUrl)
    .then((response) => response.json())
    .then((json) => {
      const result = json.filter(
        (elem) =>
          (new Date(elem.date).getDate() === new Date(event.date).getDate() &&
            new Date(elem.dateFrom).getHours()) ===
            getDateTime(event.date, event.dateFrom).getHours() ||
          new Date(elem.dateTo).getHours() ===
            getDateTime(event.date, event.dateFrom).getHours() ||
          new Date(elem.dateTo).getHours() ===
            getDateTime(event.date, event.dateTo).getHours()
      );
      return result;
    })
    .then((res) => {
      if (res.length > 0) {
        console.log("incorrect time event", res);
        return;
      }
      fetchData(event);
    });
};

export const getData = () =>
  fetch(baseUrl)
    .then((resp) => resp.json())
    .then((result) => {
      result.map((elem) => {
        (elem.dateFrom = new Date(elem.dateFrom)),
          (elem.dateTo = new Date(elem.dateTo));
      });
      return result;
    });
