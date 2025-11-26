import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const ContactPage=()=> {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      {/* Contact Section */}
      <section className="py-16 px-4 md:px-20">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-4">Get in Touch</h2>
        <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
          We'd love to hear from you. Whether you have a question about features, pricing, or anything else — our team is ready to answer all your questions.
        </p>

        <form className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" rows="5"></textarea>
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            Send Message
          </Button>
        </form>
      </section>
    </div>
  );
}

export default ContactPage