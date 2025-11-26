import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaBrain, FaSmile, FaSpa, FaPhoneAlt } from "react-icons/fa";
import Card from "../components/Card";
import { AuthContext } from "../context/AuthContext";

const features = [
  {
    icon: <FaBrain className="text-purple-600 text-3xl" />,
    title: "AI Therapy Chatbot",
    description:
      "Have safe, empathetic conversations with an AI trained to support your emotional well-being.",
    path: "/ai-chat",
  },
  {
    icon: <FaSmile className="text-blue-600 text-3xl" />,
    title: "Mood Tracker",
    description:
      "Log your daily moods and visualize patterns to better understand your mental state.",
    path: "/mood-tracker",
  },
  {
    icon: <FaSpa className="text-teal-600 text-3xl" />,
    title: "Guided Meditations",
    description:
      "Access calming, personalized meditations tailored to your stress levels and mood.",
    path: "/meditations",
  },
  {
    icon: <FaPhoneAlt className="text-red-600 text-3xl" />,
    title: "Emergency Support",
    description:
      "One-tap access to professional helplines and resources during urgent situations.",
    path: "/emergency",
  },
];

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 md:px-20 bg-gradient-to-r from-purple-50 via-white to-blue-50">
        <h1 className="text-5xl font-extrabold text-purple-800 mb-6 leading-tight">
          MindMate – Your AI Mental Wellness Partner
        </h1>
        <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
          Take charge of your mental health journey with a companion that
          listens, guides, and supports you—anytime, anywhere.
        </p>
        {user ? (
          <Link
            to="/dashboard"
            className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-green-700 transition"
          >
            Go to Dashboard
          </Link>
        ) : (
          <Link
            to="/auth"
            className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-purple-700 transition"
          >
            Get Started
          </Link>
        )}
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose MindMate?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {features.map((feature, index) => (
            <Link key={index} to={feature.path}>
              <Card className="p-6 hover:shadow-xl transition cursor-pointer">
                <div className="flex items-start space-x-5">
                  {feature.icon}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Inspirational Quote */}
      <section className="text-center py-20 bg-purple-50 px-6">
        <blockquote className="text-2xl italic text-purple-700 max-w-3xl mx-auto leading-relaxed">
          "Mental health is not a destination, but a process. It’s about how you
          drive, not where you’re going."
        </blockquote>
        <p className="mt-4 text-gray-600">– Noam Shpancer</p>
      </section>

      {/* Call to Action */}
      {!user && (
        <section className="text-center py-16 px-6 bg-gradient-to-r from-purple-100 to-blue-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-700 mb-8 max-w-xl mx-auto">
            Join thousands of users building healthier habits and finding
            emotional balance with MindMate.
          </p>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Create Free Account
          </Link>
        </section>
      )}
    </div>
  );
}
