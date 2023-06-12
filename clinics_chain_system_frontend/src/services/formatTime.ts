
// 150 (phut) => 2g 30ph
export function convertMinutesToHHMM(a: number) {
  if (a === 0) return "";
  const minutes = a % 60;
  const hours = (a - minutes) / 60;
  if (hours > 0) {
    if (minutes > 0) {
      return `${hours}g ${minutes}ph`;
    } else {
      return `${hours}g`;
    }
  }
  return `${minutes}ph`;
}

// ()  => 10:30
export function convertEpochToHHMM(a: number) {
  if (a === 0 || !a) return "";
  const date = new Date(a * 1000);
  const hour = date.getHours();
  const minute = date.getMinutes();
  return [
    hour < 10 ? `0${hour}` : `${hour}`,
    minute < 10 ? `0${minute}` : `${minute}`,
  ].join(":");
}

// 3660 (s) => 1 giờ 1 phút 
export const convertSecondToHHMM = (time: number) => {
  // Hours, minutes and seconds
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);

  var ret = "";
  if (hrs > 0) {
    ret += "" + hrs + " giờ ";
  }
  if (mins > 0) {
    ret += mins < 10 ? "0" : "";
    ret += "" + mins + " phút";
  }
  return ret;
};

// 2450 (s) => 40:50
export const convertSecondToMMSS = (time: any) => {
  if (!time) return "00:00";
  let mins: any = Math.floor(time / 60);
  let seconds: any = time % 60;
  if (mins < 10) {
    mins = "0" + mins;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return mins + ":" + seconds;
};

// 3666 (s) => 01:01:06
export const convertTimeToHHMMSS = (time: number) => {
  if (!time) return "00:00";
  let str = "";
  const h = Math.floor(time / 3600);
  const m = Math.floor((time - h * 3600) / 60);
  const s = Math.floor(time - h * 3600 - m * 60);
  const hh = ("0" + h).slice(-2);
  const mm = ("0" + m).slice(-2);
  const ss = ("0" + s).slice(-2);
  if (h > 0) {
    str = hh + ":" + mm + ":" + ss;
  } else {
    str = mm + ":" + ss;
  }
  return str;
};

// (time: string) => 08:04 | 23/10
export const formatTimeEvents = (time: string) => {
  if (!time) return "";
  const offsetTimeZoneVN = 7;
  const dateTimeZoneVN = new Date(
    new Date(time).getTime() + offsetTimeZoneVN * 3600 * 1000
  )
    .toUTCString()
    .replace(/ GMT$/, "");
  const date = new Date(dateTimeZoneVN);
  let day = "" + date.getDate();
  let month = "" + (date.getMonth() + 1);
  let hours = "" + date.getHours();
  let minutes = "" + date.getMinutes();
  if (day.length < 2) day = "0" + day;
  if (month.length < 2) month = "0" + month;
  if (hours.length < 2) hours = "0" + hours;
  if (minutes.length < 2) minutes = "0" + minutes;
  return hours + ":" + minutes + " | " + day + "/" + month;
};

// (time: string) => Đăng nhập lần cuối 12:33 ngày 30/10/2022
export const formatTimeLoginDevice = (time: string) => {
  if (!time) return "";
  const offsetTimeZoneVN = 7;
  const dateTimeZoneVN = new Date(
    new Date(time).getTime() + offsetTimeZoneVN * 3600 * 1000
  )
    .toUTCString()
    .replace(/ GMT$/, "");
  const date = new Date(dateTimeZoneVN);
  let day = "" + date.getDate();
  let month = "" + (date.getMonth() + 1);
  let year = "" + date.getFullYear();
  let hours = "" + date.getHours();
  let minutes = "" + date.getMinutes();
  if (day.length < 2) day = "0" + day;
  if (month.length < 2) month = "0" + month;
  if (hours.length < 2) hours = "0" + hours;
  if (minutes.length < 2) minutes = "0" + minutes;
  return (
    "Đăng nhập lần cuối " +
    hours +
    ":" +
    minutes +
    " ngày " +
    day +
    "/" +
    month +
    "/" +
    year
  );
};

// (time: string) => 12:34 - 30/10/2022
export const formatTimeBuyTicket = (time: string) => {
  if (!time) return "";
  const offsetTimeZoneVN = 7;
  const dateTimeZoneVN = new Date(
    new Date(time).getTime() + offsetTimeZoneVN * 3600 * 1000
  )
    .toUTCString()
    .replace(/ GMT$/, "");
  const date = new Date(dateTimeZoneVN);
  let day = "" + date.getDate();
  let month = "" + (date.getMonth() + 1);
  let year = "" + date.getFullYear();
  let hours = "" + date.getHours();
  let minutes = "" + date.getMinutes();
  if (day.length < 2) day = "0" + day;
  if (month.length < 2) month = "0" + month;
  if (hours.length < 2) hours = "0" + hours;
  if (minutes.length < 2) minutes = "0" + minutes;
  return hours + ":" + minutes + " - " + day + "/" + month + "/" + year;
};

// (time: string) => 6 phút trước  |  5 giờ trước  |  5 thang trước  |  4 nam trước
export const periodOfTime = (time: string) => {
  if (!time) return "";
  let period = "";
  const currentTime = new Date();
  const inputTime = new Date(time);
  const distance = Math.floor((+currentTime - +inputTime) / 1000);

  if (distance < 60) {
    period = distance + " giây trước";
  } else if (distance < 3600) {
    period = Math.floor(distance / 60) + " phút trước";
  } else if (distance < 86400) {
    period = Math.floor(distance / 3600) + " giờ trước";
  } else if (distance < 86400 * 30) {
    period = Math.floor(distance / 86400) + " ngày trước";
  } else if (distance < 86400 * 365) {
    period = Math.floor(distance / (86400 * 30)) + " tháng trước";
  } else {
    period = Math.floor(distance / (86400 * 365)) + " năm trước";
  }
  return period;
};

// time : string =>  2023-03-20 16:30:00 +0700
export const timeReservation = (time: string) => {
  const date = new Date(time);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  let hour = date.getHours();
  let minutes = date.getMinutes();

  let monthString = month < 10 ? `0${month}` : `${month}`;
  let dayString = day < 10 ? `0${day}` : `${day}`;
  let hourString = hour < 10 ? `0${hour}` : `${hour}`;
  let minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;

  console.log(date.toUTCString());
  
  return `${year}-${monthString}-${dayString} ${hourString}:${minutesString}:00 +0700`
}

// time : string =>  2023-03-20 16:30:00 +0700
export const timeCreateTreatment = (time: string) => {
  const date = new Date(time);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  let hour = date.getHours();
  let minutes = date.getMinutes();

  let monthString = month < 10 ? `0${month}` : `${month}`;
  let dayString = day < 10 ? `0${day}` : `${day}`;
  let hourString = hour < 10 ? `0${hour}` : `${hour}`;
  let minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;

  console.log(date.toUTCString());
  
  return `${year}-${monthString}-${dayString} ${hourString}:${minutesString}:00 +0700`
}