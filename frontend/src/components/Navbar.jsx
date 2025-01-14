import React from 'react';

function Navbar() {
  return (
    <div className="p-3 shadow-md flex justify-between items-center fixed top-0 left-0 w-full z-50 bg-white">
        <a href="/" className="cursor-auto">
          <h2 className="font-bold text-[30px] text-amber-500">EventHive</h2>
        </a>
        <div>
            <div className="flex items-center gap-3">
              <a href="/dashboard">
                <button className="rounded-full text-black border border-black px-4 py-2">My Events</button>
              </a>
              <a href="/create-event">
                <button className="rounded-full text-black border border-black px-4 py-2">Create Event</button>
              </a>
              <a href="/register">
                <button className="rounded-full text-black border border-black px-4 py-2">Sign In</button>
              </a>
            </div>
        </div>
    </div>
  );
}

export default Navbar;