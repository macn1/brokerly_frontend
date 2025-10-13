import { FaBuilding, FaCheckCircle, FaDoorOpen, FaUserFriends } from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const iconWrapperClasses = "w-12 h-12 flex justify-center items-center rounded-full";


  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Bookings',
        data: [12, 19, 15, 27, 22, 30],
        backgroundColor: '#3498DB',
        borderRadius: 4,
      },
      {
        label: 'Vacancies',
        data: [8, 12, 10, 5, 8, 3],
        backgroundColor: '#E74C3C',
        borderRadius: 4,
      },
    ],
  };

  const pieChartData = {
    labels: ['Studio', '1-Bedroom', '2-Bedroom', '3-Bedroom'],
    datasets: [
      {
        data: [25, 40, 30, 15],
        backgroundColor: [
          '#3498DB',
          '#27AE60',
          '#F1C40F',
          '#E74C3C',
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="w-full px-5 mx-auto py-3">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="flex flex-col items-start p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <div className={`${iconWrapperClasses} bg-[#FCE3E1] text-[#E74C3C]`}>
            <FaBuilding className="text-xl" />
          </div>
          <h1 className="mt-3 text-[#667085] text-base font-medium">Total Apartments</h1>
          <div className="flex justify-between items-center mt-2">
            <h1 className="py-2 text-2xl text-[#333843] font-medium">
              120 <span className="text-[#E74C3C] font-semibold text-base bg-[#FDECEA] rounded-full px-2">+5%</span>
            </h1>
          </div>
        </div>

        <div className="flex flex-col items-start p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <div className={`${iconWrapperClasses} bg-[#E2F0D9] text-[#27AE60]`}>
            <FaCheckCircle className="text-xl" />
          </div>
          <h1 className="mt-3 text-[#667085] text-base font-medium">Booked Units</h1>
          <div className="flex justify-between items-center mt-2">
            <h1 className="py-2 text-2xl text-[#333843] font-medium">
              85 <span className="text-[#27AE60] font-semibold text-base bg-[#D4EFDF] rounded-full px-2">+3%</span>
            </h1>
          </div>
        </div>

        <div className="flex flex-col items-start p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <div className={`${iconWrapperClasses} bg-[#D6EAF8] text-[#3498DB]`}>
            <FaDoorOpen className="text-xl" />
          </div>
          <h1 className="mt-3 text-[#667085] text-base font-medium">Available Units</h1>
          <div className="flex justify-between items-center mt-2">
            <h1 className="py-2 text-2xl text-[#333843] font-medium">
              35 <span className="text-[#3498DB] font-semibold text-base bg-[#EBF5FB] rounded-full px-2">-2%</span>
            </h1>
          </div>
        </div>

        <div className="flex flex-col items-start p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <div className={`${iconWrapperClasses} bg-[#F9E79F] text-[#F1C40F]`}>
            <FaUserFriends className="text-xl" />
          </div>
          <h1 className="mt-3 text-[#667085] text-base font-medium">Total Tenants</h1>
          <div className="flex justify-between items-center mt-2">
            <h1 className="py-2 text-2xl text-[#333843] font-medium">
              102 <span className="text-[#F1C40F] font-semibold text-base bg-[#FEF9E7] rounded-full px-2">+8%</span>
            </h1>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
  
        <div className="lg:col-span-2 p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-[#333843]">Booking Trends</h2>
            <select className="bg-gray-100 border border-gray-300 text-gray-700 py-1 px-3 rounded-md text-sm">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-64">
            <Bar 
              data={barChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      drawBorder: false,
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
              }} 
            />
          </div>
        </div>

  
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-[#333843] mb-4">Unit Distribution</h2>
          <div className="h-64">
            <Pie 
              data={pieChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                },
              }} 
            />
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-lg font-semibold text-[#333843] mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <FaUserFriends className="text-blue-500 text-sm" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">New tenant registered in apartment #30{item}</p>
                <p className="text-xs text-gray-500">2{item} minutes ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;