import React from 'react';
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHx8)] h-screen pt-8 flex justify-between flex-col w-full '>
        <img className='w-16 ml-8 invert' src="https://imgs.search.brave.com/GKyI6dgPjeQta0ogOaTTl0C7gqPzxQAm3-_ss9qnPLg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTIwMTYtMjAxOC03/MDB4Mzk0LnBuZw" alt="" />
        <div className='bg-white pb-7 py-4 px-4'>
          <h2 className='text-3xl font-bold'>Get Started With Uber</h2>
          <Link to='/login' className=' flex flex-center justify-center w-full bg-black text-white py-3 rouded mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
