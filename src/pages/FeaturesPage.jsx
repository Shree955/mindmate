import { FaBrain, FaSmile, FaSpa, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <FaBrain className="text-purple-600 text-3xl" />,
    title: "AI Therapy Chatbot",
    description: "Talk to an AI trained to support your emotional well-being.",
    path: "/ai-chat",
  },
  {
    icon: <FaSmile className="text-blue-600 text-3xl" />,
    title: "Mood Tracker",
    description: "Track and visualize your daily mood trends easily.",
    path: "/mood-tracker",
  },
  {
    icon: <FaSpa className="text-teal-600 text-3xl" />,
    title: "Guided Meditations",
    description: "Personalized meditations based on your mental state.",
    path: "/meditations",
  },
  {
    icon: <FaPhoneAlt className="text-red-600 text-3xl" />,
    title: "Emergency Support",
    description:
      "Quick access to mental health professionals in times of need.",
    path: "/emergency",
  },
];

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      <section className="py-16 px-4 md:px-20">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-10">
          Our Core Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.path}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition block"
              aria-label={feature.title}
            >
              <div className="flex items-start space-x-4">
                {feature.icon}
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
