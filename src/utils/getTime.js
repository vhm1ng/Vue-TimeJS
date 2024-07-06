import { h } from "vue";
import { SpaCandle } from "@icon-park/vue-next";

export const getCurrentTime = () => {
  let time = new Date();
  let year = time.getFullYear();
  let month = time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1;
  let day = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
  let hour = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
  let minute = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
  let second = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
  let weekday = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ Tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
  let currentTime = {
    year,
    month,
    day,
    hour,
    minute,
    second,
    weekday: weekday[time.getDay()],
  };
  return currentTime;
};

export const getTimeCapsule = () => {
  const todayStartDate = new Date(new Date().toLocaleDateString()).getTime();
  const todayPassHours = (new Date() - todayStartDate) / 1000 / 60 / 60;
  const todayPassHoursPercent = (todayPassHours / 24) * 100;

  const weeks = [7, 1, 2, 3, 4, 5, 6];
  const weekDay = weeks[new Date().getDay()];
  const weekDayPassPercent = (weekDay / 7) * 100;

  const year = new Date().getFullYear();
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const monthAll = new Date(year, month, 0).getDate();
  const monthPassPercent = (date / monthAll) * 100;

  const yearStartDate = new Date(year, 0, 1).getTime();
  const yearEndDate = new Date(year + 1, 0, 1).getTime();
  const yearPassHours = (new Date() - yearStartDate) / 1000 / 60 / 60;
  const yearTotalHours = (yearEndDate - yearStartDate) / 1000 / 60 / 60;
  const yearPassPercent = (yearPassHours / yearTotalHours) * 100;

  return {
    day: {
      elapsed: Math.floor(todayPassHours),
      pass: Math.floor(todayPassHoursPercent),
    },
    week: {
      elapsed: weekDay,
      pass: Math.floor(weekDayPassPercent),
    },
    month: {
      elapsed: date,
      pass: Math.floor(monthPassPercent),
    },
    year: {
      elapsed: month - 1,
      pass: Math.floor(yearPassPercent),
    },
  };
};

export const helloInit = () => {
  const hour = new Date().getHours();
  let hello = null;
  let clockicon = null;
  if (hour < 5) {
    hello = "[Đã khuya rồi mà? sao bbi chưa ngủ]";
  } else if (hour < 10) {
    hello = "[Chào buổi sáng]";
  } else if (hour < 13) {
    hello = "[Chào buổi trưa]";
  } else if (hour < 18) {
    hello = "[Chào buổi chiều]";
  } else if (hour < 23) {
    hello = "[Chào buổi tối]";
  }

  if (hour < 1) {
    clockicon = "🕛";
  } else if (hour < 2) {
    clockicon = "🕐";
  } else if (hour < 3) {
    clockicon = "🕑"; 
  } else if (hour < 4) {
    clockicon = "🕒";
  } else if (hour < 5) {
    clockicon = "🕓";
  } else if (hour < 6) {
    clockicon = "🕔";
  } else if (hour < 7) {
    clockicon = "🕕";
  } else if (hour < 8) {
    clockicon = "🕖";
  } else if (hour < 9) {
    clockicon = "🕗";
  } else if (hour < 10) {
    clockicon = "🕘";
  } else if (hour < 11) {
    clockicon = "🕙";
  } else if (hour < 12) {
    clockicon = "🕚";
  } else if (hour < 13) {
    clockicon = "🕛";
  } else if (hour < 14) {
    clockicon = "🕐";
  } else if (hour < 15) {
    clockicon = "🕑";
  } else if (hour < 16) {
    clockicon = "🕒";
  } else if (hour < 17) {
    clockicon = "🕓";
  } else if (hour < 18) {
    clockicon = "🕔";
  } else if (hour < 19) {
    clockicon = "🕕";
  } else if (hour < 20) {
    clockicon = "🕖";
  } else if (hour < 21) {
    clockicon = "🕗";
  } else if (hour < 22) {
    clockicon = "🕘";
  } else if (hour < 23) {
    clockicon = "🕙";
  } else if (hour < 24) {
    clockicon = "🕚";
  }

  ElMessage({
    dangerouslyUseHTMLString: true,
    message: `<strong>${clockicon} ${hello}</strong> Chào bbi đã tới website của anh :3`,
  });
};

const anniversaries = {
  1.1: "Tết dương lịch",
  25.1: "Tết Nguyên Đán | Chúc mừng năm mới !!",
  10.3: "Giỗ Tổ Hùng Vương",
  30.4: "Ngày Giải phóng miền Nam, Thống nhất đất nước",
  1.5: "Ngày Quốc tế Lao động",
};
export const checkDays = () => {
  const myDate = new Date();
  const mon = myDate.getMonth() + 1;
  const date = myDate.getDate();
  const key = `${mon}.${date}`;
  if (Object.prototype.hasOwnProperty.call(anniversaries, key)) {
    console.log(`Hôm nay là${anniversaries[key]}`);
    const gray = document.createElement("style");
    gray.innerHTML = "html{filter: grayscale(100%)}";
    document.head.appendChild(gray);
    ElMessage({
      message: `Hôm nay là${anniversaries[key]}`,
      duration: 14000,
      icon: h(SpaCandle, { theme: "filled", fill: "#efefef" }),
    });
  }
};

export const siteDateStatistics = (startDate) => {
  const currentDate = new Date();
  const differenceInTime = currentDate.getTime() - startDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  const differenceInMonths = differenceInDays / 30;
  const differenceInYears = differenceInMonths / 12;
  if (differenceInYears >= 1) {
    return `Trang web này đã tồn tại ${Math.floor(differenceInYears)} Năm ${Math.floor(
      differenceInMonths % 12
    )} Tháng ${Math.round(differenceInDays % 30)} Ngày`;
  } else if (differenceInMonths >= 1) {
    return `Trang web này đã tồn tại ${Math.floor(differenceInMonths)} Tháng ${Math.round(
      differenceInDays % 30
    )} Ngày`;
  } else {
    return `Trang web này đã tồn tại ${Math.round(differenceInDays)} Ngày`;
  }
};
