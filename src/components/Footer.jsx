import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-600 text-sm text-center py-6 border-t">
      <p>&copy; {new Date().getFullYear()} MindMate. All rights reserved.</p>
    </footer>
  );
}
