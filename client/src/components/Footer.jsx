import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">
        
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Dashboard App. All rights reserved.
        </p>

        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-red-400 transition">Privacy</a>
          <a href="#" className="hover:text-red-400 transition">Terms</a>
          <a href="#" className="hover:text-red-400 transition">Support</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
