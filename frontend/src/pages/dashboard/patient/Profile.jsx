import { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Footer from "../../../components/Footer";
import api from "../../../api/axios";
import { toast } from "react-toastify";

function Profile() {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
    createdAt: "",
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  // 🔹 Fetch profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/patient/profile", { withCredentials: true });
        setProfile({
          fullName: res.data.fullName,
          email: res.data.user.email,
          phone: res.data.phone || "",
          age: res.data.age || "",
          gender: res.data.gender || "",
          address: res.data.address || "",
          createdAt: new Date(res.data.user.createdAt).toLocaleDateString(),
        });
      } catch (err) {
        console.error(err);
        toast.error("Error loading profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // 🔹 Handle input changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // 🔹 Save updates
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.put(
        "/patient/profile",
        {
          fullName: profile.fullName,
          phone: profile.phone,
          age: profile.age,
          gender: profile.gender,
          address: profile.address,
        },
        { withCredentials: true }
      );
      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading profile...
      </div>
    );

  return (
    <>
      <Header />
      <div className="md:ps-20 mx-auto bg-gray-100 px-4 pt-20 pb-2">
        <Breadcrumbs />
      </div>

      <section className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-200">
          <h1 className="text-3xl font-semibold text-indigo-700 mb-6 text-center">
            My Profile
          </h1>

          <form onSubmit={handleSave} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                disabled={!editing}
                className={`w-full p-3 rounded-lg border ${
                  editing
                    ? "border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                    : "bg-gray-100 border-gray-200"
                }`}
              />
            </div>

            {/* Email (readonly) */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!editing}
                className={`w-full p-3 rounded-lg border ${
                  editing
                    ? "border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                    : "bg-gray-100 border-gray-200"
                }`}
              />
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={profile.age}
                  onChange={handleChange}
                  disabled={!editing}
                  className={`w-full p-3 rounded-lg border ${
                    editing
                      ? "border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                      : "bg-gray-100 border-gray-200"
                  }`}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  disabled={!editing}
                  className={`w-full p-3 rounded-lg border ${
                    editing
                      ? "border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                      : "bg-gray-100 border-gray-200"
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Address
              </label>
              <textarea
                name="address"
                value={profile.address}
                onChange={handleChange}
                disabled={!editing}
                className={`w-full p-3 rounded-lg border ${
                  editing
                    ? "border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                    : "bg-gray-100 border-gray-200"
                }`}
                rows="3"
              />
            </div>

            {/* Account Info */}
            <p className="text-gray-500 text-sm">
              Joined on: <span className="font-medium">{profile.createdAt}</span>
            </p>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              {editing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Profile;
