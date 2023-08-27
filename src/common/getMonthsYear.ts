export default function getMonthsYearList(){
    // let currentDate = new Date();
    // let nextYearDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));

    // let dateAndYearList = [currentDate.toLocaleString('en', { month: 'long', year: 'numeric' })];

    // while (currentDate < nextYearDate) {
    //     dateAndYearList.unshift(
    //         currentDate.toLocaleString('en', { month: 'long', year: 'numeric' 
    //     }));
    // };

    let currentMonthIndex = new Date().getMonth() + 1;
    let remainingMonthLength = 12 - currentMonthIndex;
    let currentYear = new Date().getFullYear();

    const months = Array.from({length: remainingMonthLength + 12}, (e, i) => {
        return new Date(currentYear, currentMonthIndex + i, 0).toLocaleDateString("en", {month: "long", year: "numeric" });
    });

    return months;
}