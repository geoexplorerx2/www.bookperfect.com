import { addLeadingZeros } from "./AddLeadingZeros";

export const formatDate = (date: Date) => {

  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let year = date.getFullYear();

  let digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (digits.includes(dd)) {
    addLeadingZeros(dd, 2);
  };

  if (digits.includes(mm)) {
    addLeadingZeros(mm, 2);
  };


  let format = addLeadingZeros(dd, 2) + '/' + addLeadingZeros(mm, 2) + '/' + year;
  return format;
};

export const currentYear = () => {
  return new Date().getFullYear();
}