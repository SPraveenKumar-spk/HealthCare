import { useState } from "react";
import Header from "../Header";
import Breadcrumbs from "../Breadcrumbs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCheckCircle, FaTimes, FaCalendarAlt } from "react-icons/fa";
import Footer from "../Footer";

const checkupPackages = [
  {
    id: 1,
    name: "Basic Health Checkup",
    description: "Covers basic blood tests and routine physical examination.",
    price: 999,
    duration: "45 mins",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?crop=entropy&cs=tinysrgb&fit=max&w=400&q=80",
  },
  {
    id: 2,
    name: "Advanced Health Checkup",
    description:
      "Includes a comprehensive panel of tests for heart, liver, and kidney function.",
    price: 2499,
    duration: "1 hr 30 mins",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?crop=entropy&cs=tinysrgb&fit=max&w=400&q=80",
  },
  {
    id: 3,
    name: "Full Body Checkup",
    description:
      "Complete body evaluation with advanced tests and doctor consultation.",
    price: 4999,
    duration: "2 hrs",
    image:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?crop=entropy&cs=tinysrgb&fit=max&w=400&q=80",
  },
  {
    id: 4,
    name: "Women's Health Checkup",
    description:
      "Covers breast, cervical, and hormonal screenings with specialized consultation.",
    price: 3499,
    duration: "1 hr 15 mins",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?crop=entropy&cs=tinysrgb&fit=max&w=400&q=80",
  },
  {
    id: 5,
    name: "Senior Citizen Care",
    description:
      "Comprehensive assessment tailored for elderly health, bone density, and cardiac screening.",
    price: 3999,
    duration: "1 hr 30 mins",
    image:
      "https://images.unsplash.com/photo-1601134467661-3d270dfde6f9?crop=entropy&cs=tinysrgb&fit=max&w=400&q=80",
  },
  {
    id: 6,
    name: "Heart Health Screening",
    description:
      "Detailed cardiac tests including ECG, lipid profile, and blood pressure evaluation.",
    price: 2999,
    duration: "1 hr",
    image:
      "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?crop=entropy&cs=tinysrgb&fit=max&w=400&q=80",
  },
  {
    id: 7,
    name: "Diabetes Care Package",
    description:
      "Diabetes screening with blood sugar, HbA1c, and kidney function tests.",
    price: 1999,
    duration: "45 mins",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&w=400&q=80",
  },
  {
    id: 8,
    name: "Cancer Screening Package",
    description:
      "Screening for major cancers such as breast, cervical, and prostate cancer.",
    price: 5499,
    duration: "1 hr 30 mins",
    image:
      "https://images.unsplash.com/photo-1597764691978-0b6c91306300?crop=entropy&cs=tinysrgb&fit=max&w=400&q=80",
  },
  {
    id: 9,
    name: "Fitness & Nutrition Assessment",
    description:
      "Personalized fitness evaluation, nutrition advice, and BMI analysis.",
    price: 1599,
    duration: "45 mins",
    image:
      "https://images.unsplash.com/photo-1576678927484-cc90795788b6?crop=entropy&cs=tinysrgb&fit=max&w=400&q=80",
  },
];

const PackageCard = ({ packageData, onSelect, isSelected }) => (
  <div
    onClick={() => onSelect(packageData)}
    className={`cursor-pointer border-2 ${
      isSelected ? "border-blue-500" : "border-gray-200"
    } bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-4 space-y-4`}
  >
    <img
      src={packageData.image}
      alt={packageData.name}
      className="w-full h-40 object-cover rounded-lg"
    />
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-900">
        {packageData.name}
      </h3>
      <p className="text-sm text-gray-600">{packageData.description}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{packageData.duration}</span>
        <span className="text-blue-600 font-semibold">
          ₹{packageData.price}
        </span>
      </div>
    </div>
    {isSelected && (
      <div className="flex items-center text-green-600 mt-2">
        <FaCheckCircle className="w-5 h-5 mr-2" />
        <span className="text-sm">Selected</span>
      </div>
    )}
  </div>
);

function HealthCheckup() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [step, setStep] = useState(1);

  const handlePackageSelect = (packageData) => {
    setSelectedPackage(packageData);
    setStep(2);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleConfirmBooking = () => {
    if (selectedPackage && selectedDate) {
      alert(
        ` Appointment booked for ${
          selectedPackage.name
        } on ${selectedDate.toDateString()}`
      );
      resetBooking();
    } else {
      alert(" Please select a valid date and package.");
    }
  };

  const resetBooking = () => {
    setSelectedPackage(null);
    setSelectedDate(null);
    setStep(1);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto pt-16 px-4 lg:px-0">
          <Breadcrumbs />
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Book a Health Checkup
            </h2>

            {/* Step 1: Select Package */}
            {step === 1 && (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {checkupPackages.map((packageData) => (
                  <PackageCard
                    key={packageData.id}
                    packageData={packageData}
                    onSelect={handlePackageSelect}
                    isSelected={selectedPackage?.id === packageData.id}
                  />
                ))}
              </div>
            )}

            {/* Step 2: Select Date */}
            {step === 2 && selectedPackage && (
              <div className="mt-6 space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center space-x-4">
                  <img
                    src={selectedPackage.image}
                    alt={selectedPackage.name}
                    className="w-16 h-16 rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedPackage.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedPackage.description}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-4">
                  <h4 className="text-md font-semibold text-gray-900 mb-3">
                    Select Date & Time
                  </h4>
                  <div className="flex items-center space-x-3">
                    <FaCalendarAlt className="text-blue-600 w-5 h-5" />
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateSelect}
                      minDate={new Date()}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="border border-gray-300 rounded-lg p-2 w-full focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!selectedDate}
                    className={`py-2 px-6 rounded-lg text-white ${
                      selectedDate
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-400 cursor-not-allowed"
                    } transition-all`}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="mt-6 space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center space-x-4">
                  <img
                    src={selectedPackage.image}
                    alt={selectedPackage.name}
                    className="w-16 h-16 rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedPackage.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Scheduled for{" "}
                      <span className="text-blue-600 font-medium">
                        {selectedDate?.toDateString()} at{" "}
                        {selectedDate?.toLocaleTimeString()}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-all"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default HealthCheckup;
