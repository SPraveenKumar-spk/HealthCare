import {
  FaHospital,
  FaHeartbeat,
  FaCalendarCheck,
  FaBookMedical,
  FaStethoscope,
  FaDumbbell,
  FaAppleAlt,
  FaBriefcaseMedical,
} from "react-icons/fa";

const blogPosts = [
  {
    title: "New Branch Opening in Los Angeles",
    description:
      "We are expanding! Our new multispecialty hospital is now open in Los Angeles, California.",
    link: "#",
    icon: <FaHospital className="text-[#007C9D] text-4xl" />,
  },

  {
    title: "Free Health Check-up Camp – March 2025",
    description:
      "Join our free health check-up camp for early disease detection and prevention.",
    link: "#",
    icon: <FaCalendarCheck className="text-green-500 text-4xl" />,
  },
  {
    title: "The Art of Healthy Living",
    description:
      "Explore articles on exercise, nutrition, and overall wellness.",
    link: "https://www.purdueglobal.edu/blog/student-life/valuable-health-wellness-blogs/",
    icon: <FaBookMedical className="text-blue-500 text-4xl" />,
  },
  {
    title: "Harvard Health Blog",
    description:
      "Insights on health topics from experts at Harvard Medical School.",
    link: "https://www.health.harvard.edu/blog",
    icon: <FaStethoscope className="text-gray-700 text-4xl" />,
  },
  {
    title: "Nerd Fitness",
    description:
      "A community geared towards helping 'nerds' stay fit and healthy.",
    link: "https://www.nerdfitness.com/blog/",
    icon: <FaDumbbell className="text-purple-500 text-4xl" />,
  },

  {
    title: "BMJ Medical Blog",
    description:
      "Insights and opinions on the latest medical research and news.",
    link: "https://blogs.bmj.com/",
    icon: <FaBriefcaseMedical className="text-[#005F73] text-4xl" />,
  },
];

export default function LatestNews() {
  return (
    <section className="py-12 bg-[#FDF6EC]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#005F73] mb-6">
          📰 Latest News & Health Blogs
        </h2>
        <p className="text-gray-700 text-lg mb-10">
          Stay updated with the latest hospital news, health tips, and upcoming
          events.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 text-left flex items-center space-x-4"
            >
              {post.icon}
              <div>
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-gray-600 my-2">{post.description}</p>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#007C9D] hover:underline flex items-center"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
