import Header from "../../components/Header";
import Breadcrumbs from "../../components/Breadcrumbs";

function Signup() {
  return (
    <>
      <Header />

      <section className="bg-gray-200 min-h-screen flex flex-col items-center ">
        <div className="w-full max-w-xl px-4 pt-20 ">
          <Breadcrumbs />
        </div>

        <div className="bg-white rounded-lg shadow-md w-full max-w-md px-8 py-6  ">
          <h1 className="text-3xl mb-4 text-[#4F46E5] font-semibold text-center">
            Create your account
          </h1>

          <form className="space-y-4">
            <div>
              <label className="block mb-2 text-md font-medium text-gray-900">
                Your Name
              </label>
              <input
                type="name"
                name="name"
                placeholder="your name"
                className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-md font-medium text-gray-900">
                Your email
              </label>
              <input
                type="email"
                name="email"
                placeholder="yourname@gmail.com"
                className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-md font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder:text-2xl"
                required
              />
            </div>
            <div>
              <label htmlFor="role" className="block mb-2">
                Your Role
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option value="patient" selected>
                  Patient
                </option>
                <option>Doctor</option>
                <option>Pharmacist</option>
                <option>Receptionist</option>
                <option>Admin</option>
              </select>
            </div>

            <div className="text-center">
              <button className="w-full rounded-lg p-1 text-2xl text-white bg-blue-400 hover:bg-blue-600 cursor-pointer">
                Submit
              </button>
            </div>

            <div>
              <p>
                Already have an account ?
                <a className="text-blue-800 hover:underline px-1" href="/login">
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Signup;
