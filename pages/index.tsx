
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
const Card = () => {
  return (
    <div className="max-w-full rounded overflow-hidden shadow-lg bg-white flex flex-col sm:flex-row">
      {/* <img className="w-full" src="https://unsplash.com/photos/N4DbvTUDikw" alt="Sunset in the mountains" /> */}
      <Image src="https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80" alt="Sunset in the mountains" width={300} height={300} className='w-auto' />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">this is the listing title</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
        <div className="pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">寵物可</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">包水電</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">套房</span>
        </div>
      </div>
      <div className='px-6 py-4'>
        <h3 className='text-xl font-bold inlin-block mb-2'>$10,000/月</h3>
        <span>王先生</span>
      </div>
    </div>
  )
}
const HomePage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const section = sectionRef.current;
      if (!section) return;

      const sectionTop = section.getBoundingClientRect().top;
      const sectionBot = section.getBoundingClientRect().bottom;
      console.log(sectionTop);
      console.log('bot', sectionBot);
      if (!isFixed && sectionTop <= 0) {
        setIsFixed(true);
      } else if (isFixed && sectionTop > 5) {
        setIsFixed(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFixed]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center gap-5">
      <div className='mt-10 w-full px-6 py-4'>
        <h1 className="text-4xl font-bold">租屋網</h1>
        <section className='w-full fixed top-0 z-10'>
          {/* <div className='w-full h-48 bg-white'>
            filter
          </div> */}

        </section>
        <div ref={sectionRef} className={classNames(`flex items-center justify-center h-12 bg-white w-full ${isFixed ? 'fixed top-0 left-0 w-full' : ''}`)}>
          {/* Your section content goes here */}
          test
        </div>
      </div>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  )
}
export default HomePage;