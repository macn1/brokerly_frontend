// import React, { useState, useEffect } from 'react';
// import { useGetCountDataMutation } from '../../store/api/visitorapi';

// function Dashitems() {
//   const [selectedRange, setSelectedRange] = useState('Now');
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
// //   const [getCountData, { isLoading, data, error }] = useGetCountDataMutation();

//   const [counts, setCounts] = useState({
//     total_visitors: 0,
//     registered_count: 0,
//     check_in_count: 0,
//     check_out_count: 0,
//   });

//   useEffect(() => {
//     if (selectedRange !== 'Custom') {
//       handleFilterChange(selectedRange);
//     }
//   }, [selectedRange]);

//   useEffect(() => {
//     handleFilterChange('Now');
//     setSelectedRange('Now');
//   }, []);

//   const handleFilterChange = (range) => {
//     let filterObj = {};

//     if (range === 'Now') {
//       filterObj = { filter: 'now' };
//     } else if (range === 'This Week') {
//       filterObj = { filter: 'week' };
//     } else if (range === 'This Month') {
//       filterObj = { filter: 'month' };
//     } else if (range === 'Custom') {
//       if (!fromDate || !toDate) {
//         console.warn('Custom filter needs from and to dates');
//         return;
//       }
//       filterObj = {
//         filter: 'custom',
//         from_date: fromDate,
//         to_date: toDate,
//       };
//     }

//     getCountData(filterObj)
//       .unwrap()
//       .then((response) => {
//         setCounts({
//           total_visitors: response.total_visitors,
//           registered_count: response.registered_count,
//           check_in_count: response.check_in_count,
//           check_out_count: response.check_out_count,
//         });
//       })
//       .catch((err) => {
//         console.error('API Error:', err);
//       });
//   };

//   const handleRangeSelect = (e) => {
//     const value = e.target.value;
//     setSelectedRange(value);

//     if (value !== 'Custom') {
//       setFromDate('');
//       setToDate('');
//     }
//   };

//   const handleDateChange = (setter) => (e) => {
//     setter(e.target.value);
//   };

//   const handleCustomFilterSubmit = () => {
//     if (fromDate && toDate) {
//       handleFilterChange('Custom');
//     } else {
//       alert('Please select both FROM and TO dates.');
//     }
//   };

//   const cardHeightClass = "h-[56px]";

//   return (
//     <div className="p-2 bg-white rounded-md w-full max-w-5xl mx-auto">
//       <div className="flex flex-wrap items-center gap-2">

//         {/* SELECT RANGE */}
//         <div className="flex flex-col w-[140px]">
//           <label className="text-[0.65rem] font-medium text-gray-500 mb-0">SELECT RANGE</label>
//           <select
//             className="border border-gray-100 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-100 w-full"
//             value={selectedRange}
//             onChange={handleRangeSelect}
//           >
//             <option value="Now">Now</option>
//             <option value="This Week">This Week</option>
//             <option value="This Month">This Month</option>
//             <option value="Custom">Custom</option>
//           </select>
//         </div>

//         {/* CUSTOM DATE FIELDS INLINE */}
//         {selectedRange === 'Custom' && (
//           <>
//             <div className="flex flex-col w-[110px]">
//               <label className="text-[0.65rem] font-medium text-gray-500 mb-0">FROM</label>
//               <input
//                 type="date"
//                 value={fromDate}
//                 onChange={handleDateChange(setFromDate)}
//                 className="border border-gray-100 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-100 w-full"
//               />
//             </div>

//             <div className="flex flex-col w-[110px]">
//               <label className="text-[0.65rem] font-medium text-gray-500 mb-0">TO</label>
//               <input
//                 type="date"
//                 value={toDate}
//                 onChange={handleDateChange(setToDate)}
//                 className="border border-gray-100 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-100 w-full"
//               />
//             </div>

//             <button
//               onClick={handleCustomFilterSubmit}
//               className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600 mt-4 md:mt-5 w-[80px]"
//             >
//               Apply
//             </button>
//           </>
//         )}

//         {/* TOTAL VISITORS */}
//         <div className={`flex-shrink-0 w-[10%] bg-green-50 border border-green-100 rounded-md flex flex-col justify-center px-2 ${cardHeightClass}`}>
//           <p className="text-[0.6rem] font-semibold text-green-600 text-center uppercase tracking-tight">Total</p>
//           <p className="text-lg font-bold text-green-800 text-center leading-none">{counts.total_visitors}</p>
//         </div>

//         {/* CHECK-IN */}
//         <div className={`flex-shrink-0 w-[10%] bg-blue-50 border border-blue-100 rounded-md flex flex-col justify-center items-center px-2 ${cardHeightClass}`}>
//           <p className="text-[0.6rem] font-medium text-blue-600">Check-In</p>
//           <p className="text-sm font-bold text-blue-800 leading-none">{counts.check_in_count}</p>
//         </div>

//         {/* CHECK-OUT */}
//         <div className={`flex-shrink-0 w-[10%] bg-red-50 border border-red-100 rounded-md flex flex-col justify-center items-center px-2 ${cardHeightClass}`}>
//           <p className="text-[0.6rem] font-medium text-red-600">Check-Out</p>
//           <p className="text-sm font-bold text-red-800 leading-none">{counts.check_out_count}</p>
//         </div>

//         {/* PENDING */}
//         <div className={`flex-shrink-0 w-[10%] bg-purple-50 border border-purple-100 rounded-md flex flex-col justify-center items-center px-2 ${cardHeightClass}`}>
//           <p className="text-[0.6rem] font-medium text-purple-600">Pending</p>
//           <p className="text-sm font-bold text-purple-800 leading-none">{counts.check_in_count - counts.check_out_count}</p>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Dashitems;
