import { getDateTime, round } from '../utils/dateUtils.js';

export const baseUrl = 'https://617e67ce2ff7e600174bd7b8.mockapi.io/events';

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
  fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to create event');
    }
  });
};

export const removeEvent = (id) => {
  fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
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
        console.log('incorrect time event', res);
        return;
      }
      fetchData(event);
    });
};

// export const removeEvent = (id) => {
//   fetch(`${baseUrl}/${id}`)
//     .then((resp) => resp.json())
//     .then((json) => {
//       const result =
//         new Date(json.dateFrom).getHours() * 60 +
//         new Date(json.dateFrom).getMinutes() -
//         new Date().getHours() * 60 +
//         new Date().getMinutes();
//       return Math.abs(result) > 15;
//     })
//     .then((res) => {
//       if (!res) {
//         return;
//       }
//       remove(id);
//     });
// };
