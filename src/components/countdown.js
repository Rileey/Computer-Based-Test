// import { useEffect, useState } from 'react';

// const Countdown = () => {

//     const [data, setData] = useState(
//         { date: Date.now(), delay: 60000 } //10 seconds
//       );
//       const wantedDelay = 60000; //10 ms
    
//       const getLocalStorageValue = (s) => localStorage.getItem(s)
//       //[START] componentDidMount
//       //Code runs only one time after each reloading
//       useEffect(() => {
//         const savedDate = getLocalStorageValue("end_date");
//         if (savedDate != null && !isNaN(savedDate)) {
//           const currentTime = Date.now();
//           const delta = parseInt(savedDate, 10) - currentTime;
    
//           //Do you reach the end?
//           if (delta > wantedDelay) {
//             //Yes we clear uour saved end date
//             if (localStorage.getItem("end_date").length > 0)
//               localStorage.removeItem("end_date");
//           } else {
//             //No update the end date with the current date
//             setData({ date: currentTime, delay: delta });
//           }
//         }
//       }, []);
//       //[END] componentDidMount

//     return (
//         <div>
//           <Countdown
//             date={data.date + data.delay}
//             Quest={Quest}
//             onStart={(delta) => {
//               //Save the end date
//               if (localStorage.getItem("end_date") == null)
//                 localStorage.setItem(
//                   "end_date",
//                   JSON.stringify(data.date + data.delay)
//                 );
//             }}
//             onComplete={() => {
//               if (localStorage.getItem("end_date") != null)
//                 localStorage.removeItem("end_date");
//             }}
//           />
//         </div>
//       );
// }

// export default Countdown