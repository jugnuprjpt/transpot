export function ConvertFromDateFormat(e) {
  if (e) {
    const date = new Date(e);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  } else {
    return "-";
  }
}

export function convertDateYY(e) {
  if (e) {
    const date = new Date(e);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    // const formattedDate = `${day}-${month}-${year}`;
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  } else {
    return "-";
  }
}
export function convertDateY(e) {
  if (e) {
    const date = new Date(e);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  } else {
    return "-";
  }
}

export function convertDate(inputDate) {
  if (inputDate) {
    const [datePart, timePart] = inputDate.split(" ");
    if (datePart && timePart) {
      const [day, month, year] = datePart.split("-");
      const [hours, minutes, seconds] = timePart.split(":");
      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${
        seconds !== undefined ? seconds : "00"
      }`;
      return formattedDate;
    } else {
      return "";
    }
  } else {
    return "";
  }
}
const dateCondition = [
  undefined,
  null,
  "1752-12-31",
  "1753-01-01",
  "01-01-1753",
  "01-01-1753 00:00:00",
  "",
];

export function getDisplayValue(show, datetime) {
  if (datetime) {
    // return show === true
    //   ?
    //   datetime === "01-01-1753" || datetime === "01-01-1753 00:00:00" || datetime === "1753-01-01 " || datetime === "01-01-1753"
    //     ? "Refer Document"
    //     : convertDateYY(datetime)
    //   : "Refer Document";

    return datetime == "01-01-1753" ||
      datetime == "01-01-1753 00:00:00" ||
      datetime == "1753-01-01 "
      ? "Refer Document"
      : convertDateY(datetime);
  } else {
    return "";
  }
}
export function getDisplayValue2(datetime) {
  if (datetime) {
    // return show === true
    //   ?
    //   datetime === "01-01-1753" || datetime === "01-01-1753 00:00:00" || datetime === "1753-01-01 " || datetime === "01-01-1753"
    //     ? "Refer Document"
    //     : convertDateYY(datetime)
    //   : "Refer Document";

    return datetime == "01-01-1753" ||
      datetime == "01-01-1753 00:00:00" ||
      datetime == "1753-01-01" ||
      datetime == null ||
      datetime == undefined
      ? "Refer Document"
      : datetime;
  } else {
    return "";
  }
}

export function convertDate2(inputDate) {
  if (inputDate) {
    const [datePart, timePart] = inputDate.split(" ");
    const [day, month, year] = datePart.split("-");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  } else {
    return "";
  }
}
