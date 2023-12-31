import React from 'react';
import { Link } from 'react-router-dom';
import {ImArrowLeft} from "react-icons/im";

function Navbar({children}) {
  return (
<nav className="bg-amber-950 p-2 mb-10 text-center w-screen">
  <div className="flex items-center justify-between">
      <div className="flex items-center ml-20">
        <Link to='/inicio'>
          <ImArrowLeft alt='Volver' className="text-white w-10 h-10" />
        </Link>
      </div>
        <div className='flex justify-center items-center mr-32 w-full'>
            {children}
        </div>
    </div>
</nav>

  );
}

export default Navbar;
