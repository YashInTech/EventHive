import React, { useState, useEffect, useRef } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  const [isMobile, setIsMobile] = useState(false); // State to track if it's a mobile screen
  const panelRef = useRef(null); // Reference for the panel
  const buttonRef = useRef(null); // Reference for the hamburger button

  // Close panel if clicked outside the panel and the hamburger button
  const handleClickOutside = (event) => {
    if (
      panelRef.current && 
      !panelRef.current.contains(event.target) && 
      buttonRef.current && 
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false); // Close the panel if clicked outside
    }
  };

  // Handle window resizing
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsMobile(false); // When the screen width is large enough, it's not mobile
      setIsOpen(false); // Close the panel when resizing back to large screen
    } else {
      setIsMobile(true); // Otherwise, it's mobile
    }
  };

  // Attach event listeners for clicks outside and window resize
  useEffect(() => {
    // Set the initial screen size on mount
    handleResize();
    
    // Event listener for resizing the window
    window.addEventListener('resize', handleResize);

    // Event listener for clicks outside the panel
    window.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="p-3 shadow-md flex justify-between items-center fixed top-0 left-0 w-full z-50 bg-white">
      <a href="/" className="cursor-auto">
        <h2 className="font-bold text-[30px] text-amber-500">EventHive</h2>
      </a>

      {/* Hamburger icon only on small screens */}
      {isMobile && (
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden"
        >
          {/* Hamburger Icon */}
          <span className="block w-8 h-1 bg-black mb-1"></span>
          <span className="block w-8 h-1 bg-black mb-1"></span>
          <span className="block w-8 h-1 bg-black"></span>
        </button>
      )}

      {/* Regular navigation buttons for larger screens */}
      {!isMobile && (
        <div className="flex space-x-4">
          <a href="/dashboard" className="text-black hover:bg-gray-200 px-4 py-2">My Events</a>
          <a href="/create-event" className="text-black hover:bg-gray-200 px-4 py-2">Create Event</a>
          <a href="/register" className="text-black hover:bg-gray-200 px-4 py-2">Sign In</a>
        </div>
      )}

      {/* Sliding panel for mobile */}
      {isOpen && isMobile && (
        <div
          ref={panelRef}
          className="fixed right-0 top-0 w-48 h-full bg-white shadow-lg z-50"
        >
          <a
            href="/dashboard"
            className="block px-4 py-2 text-black hover:bg-gray-200"
          >
            My Events
          </a>
          <a
            href="/create-event"
            className="block px-4 py-2 text-black hover:bg-gray-200"
          >
            Create Event
          </a>
          <a
            href="/register"
            className="block px-4 py-2 text-black hover:bg-gray-200"
          >
            Sign In
          </a>
        </div>
      )}
    </div>
  );
}

export default Navbar;
