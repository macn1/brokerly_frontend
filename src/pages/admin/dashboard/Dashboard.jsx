import { FaBuilding, FaUsers, FaMoneyBillWave, FaStar, FaPhone, FaSwimmingPool, FaWifi, FaCar, FaDog } from "react-icons/fa";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const VendorDashboard = () => {
  const iconWrapperClasses = "w-12 h-12 flex justify-center items-center rounded-full";

  // Apartments performance chart
  const apartmentsChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Bookings',
        data: [8, 12, 15, 20, 18, 25],
        backgroundColor: '#3498DB',
        borderRadius: 4,
      },
      {
        label: 'Viewings',
        data: [25, 30, 35, 40, 38, 45],
        backgroundColor: '#27AE60',
        borderRadius: 4,
      },
    ],
  };

  // Apartment types distribution
  const apartmentTypesData = {
    labels: ['Studio', '1-Bedroom', '2-Bedroom', '3-Bedroom', 'Penthouse'],
    datasets: [
      {
        data: [20, 35, 25, 15, 5],
        backgroundColor: [
          '#3498DB',
          '#27AE60',
          '#F1C40F',
          '#E74C3C',
          '#9B59B6',
        ],
        borderWidth: 0,
      },
    ],
  };

  // Revenue trend
  const revenueTrendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Weekly Revenue ($)',
        data: [12500, 14200, 11800, 16500, 15200, 18800],
        borderColor: '#27AE60',
        backgroundColor: 'rgba(39, 174, 96, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Amenities data
  const amenities = [
    { name: 'Swimming Pool', icon: FaSwimmingPool, count: 15, popular: true },
    { name: 'WiFi', icon: FaWifi, count: 28, popular: true },
    { name: 'Parking', icon: FaCar, count: 22, popular: true },
    { name: 'Pet Friendly', icon: FaDog, count: 12, popular: false },
  ];

  return (
    <div className="w-full px-5 mx-auto py-3">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {/* Total Apartments */}
        <div className="flex flex-col items-start p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <div className={`${iconWrapperClasses} bg-[#E8F6F3] text-[#27AE60]`}>
            <FaBuilding className="text-xl" />
          </div>
          <h1 className="mt-3 text-[#667085] text-base font-medium">Total Apartments</h1>
          <div className="flex justify-between items-center mt-2">
            <h1 className="py-2 text-2xl text-[#333843] font-medium">
              28 <span className="text-[#27AE60] font-semibold text-base bg-[#D4EFDF] rounded-full px-2">+3</span>
            </h1>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="flex flex-col items-start p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <div className={`${iconWrapperClasses} bg-[#FCE3E1] text-[#E74C3C]`}>
            <FaMoneyBillWave className="text-xl" />
          </div>
          <h1 className="mt-3 text-[#667085] text-base font-medium">Total Bookings</h1>
          <div className="flex justify-between items-center mt-2">
            <h1 className="py-2 text-2xl text-[#333843] font-medium">
              18 <span className="text-[#E74C3C] font-semibold text-base bg-[#FDECEA] rounded-full px-2">+5%</span>
            </h1>
          </div>
        </div>

        {/* Total Clients */}
        <div className="flex flex-col items-start p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <div className={`${iconWrapperClasses} bg-[#D6EAF8] text-[#3498DB]`}>
            <FaUsers className="text-xl" />
          </div>
          <h1 className="mt-3 text-[#667085] text-base font-medium">Total Clients</h1>
          <div className="flex justify-between items-center mt-2">
            <h1 className="py-2 text-2xl text-[#333843] font-medium">
              45 <span className="text-[#3498DB] font-semibold text-base bg-[#EBF5FB] rounded-full px-2">+12%</span>
            </h1>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="flex flex-col items-start p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <div className={`${iconWrapperClasses} bg-[#F9E79F] text-[#F1C40F]`}>
            <FaMoneyBillWave className="text-xl" />
          </div>
          <h1 className="mt-3 text-[#667085] text-base font-medium">Total Revenue</h1>
          <div className="flex justify-between items-center mt-2">
            <h1 className="py-2 text-2xl text-[#333843] font-medium">
              $89.5K <span className="text-[#F1C40F] font-semibold text-base bg-[#FEF9E7] rounded-full px-2">+18%</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Apartments Performance */}
        <div className="lg:col-span-2 p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-[#333843]">Apartments Performance</h2>
            <select className="bg-gray-100 border border-gray-300 text-gray-700 py-1 px-3 rounded-md text-sm">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-64">
            <Bar 
              data={apartmentsChartData} 
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

        {/* Apartment Types Distribution */}
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-[#333843] mb-4">Apartment Types</h2>
          <div className="h-64">
            <Pie 
              data={apartmentTypesData} 
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

      {/* Second Row - Revenue & Amenities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Trend */}
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-[#333843]">Revenue Trend</h2>
            <select className="bg-gray-100 border border-gray-300 text-gray-700 py-1 px-3 rounded-md text-sm">
              <option>Last 6 Weeks</option>
              <option>Last 12 Weeks</option>
            </select>
          </div>
          <div className="h-64">
            <Line 
              data={revenueTrendData} 
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

        {/* Amenities Management */}
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-[#333843] mb-4">Amenities Overview</h2>
          <div className="space-y-4">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <amenity.icon className="text-blue-500 text-sm" />
                  </div>
                  <div>
                    <span className="text-sm font-medium block">{amenity.name}</span>
                    <span className="text-xs text-gray-500">{amenity.count} apartments</span>
                  </div>
                </div>
                {amenity.popular && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                    Popular
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Third Row - Client Interactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Contacted Customers */}
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-[#333843] mb-4">Recent Client Contacts</h2>
          <div className="space-y-4">
            {[
              { name: 'Sarah Johnson', phone: '+1 (555) 123-4567', apartment: '2-Bedroom Luxury', time: '2 hours ago' },
              { name: 'Mike Chen', phone: '+1 (555) 987-6543', apartment: 'Studio Premium', time: '5 hours ago' },
              { name: 'Emily Davis', phone: '+1 (555) 456-7890', apartment: '3-Bedroom Family', time: '1 day ago' },
            ].map((client, index) => (
              <div key={index} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <FaPhone className="text-green-500 text-sm" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{client.name}</p>
                    <p className="text-xs text-gray-500">{client.apartment} • {client.phone}</p>
                    <p className="text-xs text-gray-400">{client.time}</p>
                  </div>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
                  Follow Up
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Feedbacks */}
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-[#333843] mb-4">Recent Feedbacks</h2>
          <div className="space-y-4">
            {[
              { name: 'Robert Wilson', rating: 5, comment: 'Excellent service! Found my dream apartment quickly.', date: '2 days ago' },
              { name: 'Lisa Brown', rating: 4, comment: 'Good selection of apartments, helpful staff.', date: '3 days ago' },
              { name: 'David Miller', rating: 5, comment: 'Very professional and responsive. Highly recommended!', date: '1 week ago' },
            ].map((feedback, index) => (
              <div key={index} className="pb-4 border-b border-gray-100 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-800">{feedback.name}</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`text-sm ${
                          i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">{feedback.comment}</p>
                <p className="text-xs text-gray-400">{feedback.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 text-center">
          <div className="flex justify-center mb-3">
            <div className="bg-purple-100 p-3 rounded-full">
              <FaUsers className="text-purple-500 text-xl" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Contacted Today</h3>
          <p className="text-2xl font-bold text-purple-600">8 Clients</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 text-center">
          <div className="flex justify-center mb-3">
            <div className="bg-orange-100 p-3 rounded-full">
              <FaStar className="text-orange-500 text-xl" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Average Rating</h3>
          <p className="text-2xl font-bold text-orange-600">4.7/5.0</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 text-center">
          <div className="flex justify-center mb-3">
            <div className="bg-green-100 p-3 rounded-full">
              <FaBuilding className="text-green-500 text-xl" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Available Units</h3>
          <p className="text-2xl font-bold text-green-600">10 Apartments</p>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;