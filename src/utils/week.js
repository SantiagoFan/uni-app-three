import moment from "moment";
const weekList = (type) => {
  type = type || "周";
  return [
    `${type}一`,
    `${type}二`,
    `${type}三`,
    `${type}四`,
    `${type}五`,
    `${type}六`,
    `${type}日`,
  ];
};

const fillWeek = (origin_scheme) => {
  let schemeList = [];
  let data = origin_scheme;
  for (let i = 0; i < data.length; i++) {
    if (i == 0) {
      let first = moment(data[i].date);
      for (let j = 0; j < first.isoWeekday() - 1; j++) {
        schemeList.push(null);
      }
    }
    schemeList.push(data[i]);
    if (i == data.length - 1) {
      let end = moment(data[i].date);
      for (let j = 0; j < 7 - end.isoWeekday(); j++) {
        schemeList.push(null);
      }
    }
  }
  return schemeList;
};

export { weekList, fillWeek };
