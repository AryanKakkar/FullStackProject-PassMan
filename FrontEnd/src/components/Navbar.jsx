import React from 'react';

const Navbar = () => {
  return (
    <nav className="z-10 h-14 flex justify-between items-center px-4" style={{
      background: "radial-gradient(circle, #99FF99 0%, #66CC66 60%, #4CAF50 100%)",
      boxShadow: "0px 0px 5px 3px #99FF99"
    }}>
      <div className="mycontainer h-14 flex justify-between items-center px-4">
        <div className="logo font-bold text-black text-xl">
          <span className='text-white'>&lt;</span>
            Pass
          <span className='text-white'>Man/&gt;</span>
        </div>
        {/* <ul className="flex gap-4">
          <li><a className="hover:font-bold text-black" href="#">Home</a></li>
          <li><a className="hover:font-bold text-black" href="#">About</a></li>
          <li><a className="hover:font-bold text-black" href="#">Contact</a></li>
        </ul> */}
        <button className="text-white border my-5 mx-2 rounded-full flex items-center px-1 py-0">
          <img
            className="invert w-10"
            src="/icons/github.svg"
            alt="GitHub logo"
          />
          <a className="font-bold px-1" href='https://github.com/AryanKakkar' target="_blank">GitHub</a>
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
