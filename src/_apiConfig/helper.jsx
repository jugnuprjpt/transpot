export const wordHighLighter = (data, category) => {
  if (category !== "") {
    let classes = "wordHighLighter";
    if (category === "CORRIGENDUM") {
      classes = "text-[#676767] font-bold";
    }
    const words = category.split(" ");
    const str = new RegExp(words.join("|"), "gi");
    const newData = data.replace(str, function (matched) {
      return `<span class='${classes}'>${matched}</span>`;
    });
    return newData;
  } else {
    return data;
  }
};

export function valueConvert(value) {
  var result = null;
  if (value === undefined) {
    value = 0;
  }
  value = parseFloat(value);

  if (value < 1.0) {
    result = "Refer Document";
  } else {
    if (value >= 10000000) {
      result = " ₹ " + (value / 10000000).toFixed(2) + " CR.";
    } else if (value >= 100000) {
      result = " ₹ " + (value / 100000).toFixed(2) + " Lacs";
    } else if (value >= 1000) {
      result = " ₹ " + (value / 1000).toFixed(2) + " Thousand";
    } else {
      result = " ₹ " + value;
    }
  }
  return result;
}

export function get_date_diff_with_current_date(inputdate) {
  var today = new Date();

  if (typeof inputdate === "string") {
    var dateParts = inputdate.split(/[-\/]/); // Split by '-' or '/'
    inputdate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]); // Assuming format dd-mm-yyyy
  }

  var timeDiff = inputdate.getTime() - today.getTime();

  var dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
  if (dayDifference === 0) {
    return "Ending Today";
  } else if (dayDifference > 0) {
    return dayDifference + " Days Left ";
  } else {
    return "Before " + Math.abs(dayDifference) + " Days";
  }
}

// Output: Number of days difference

// Function for extraction "msme | - msme"
export const extraction = (data) => {
  if (typeof data !== "string") return data;
  const refinedData = data.toLowerCase();
  const match = refinedData.match(/\| quantity \||- msme|msme/gi);
  if (match) {
    const index = refinedData.indexOf(match[0]);
    return data.slice(0, index);
  }
  return data;
};

export const parseDateString = (dateString) => {
  if (!dateString) return ""; // Handle undefined or null cases
  const [day, month, year] = dateString.split("-");
  return `${year}-${month}-${day}`; // Convert to 'YYYY-MM-DD'
};
