import React from 'react'

const About = () => {
  return (
    <>
      <section>
        <div className="container py-4 px-8">

          <h2 className='font-semibold uppercase text-xl mb-5 p-3 text-center'>About Us</h2>
          <div className="flex max-lg:flex-col gap-10 items-center">
            <div className="left lg:w-1/2 p-3 text-[#727272] text-sm">
              <div className="title">
                <h2 className='text-4xl text-black font-semibold mb-4'>Our Story</h2>

                <div className='flex items-center gap-4 mb-4'>
                  <hr className='w-2/12 border border-gray-500' />
                  <h3 className='capitalize text-[#727272] font-normal tracking-wider'>THE HIGH STRESS FAVOUTIRE</h3>
                </div>
              </div>
              <p>Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus. Vestibulum volutpat pretium libero. In ut quam vitae odio lacinia tincidunt. Etiam ut purus mattis mauris sodales aliquam. Aenean massa. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Vivamus consectetuer hendrerit lacus. In hac habitasse platea dictumst. Ut tincidunt tincidunt erat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
            </div>
            <div className="right lg:w-1/2">
              <img src="image/about1.webp" alt="" className='w-full object-contain' />
            </div>

          </div>

          <div className="flex max-lg:flex-col-reverse gap-10 items-center py-4">
            <div className="left lg:w-1/2">
              <img src="image/about2.jpg" alt="" className='w-full object-contain' />
            </div>

            <div className="right lg:w-1/2 p-3 text-[#727272] text-sm">
              <div className="title">
                <h2 className='text-4xl text-black font-semibold mb-4 captialize'>Who we are?</h2>

                <div className='flex items-center gap-4 mb-4'>
                  <hr className='w-2/12 border border-gray-500' />
                  <h3 className='capitalize text-[#727272] font-normal tracking-wider'>THE HIGH STRESS FAVOUTIRE</h3>
                </div>
              </div>
              <p>Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus. Vestibulum volutpat pretium libero. In ut quam vitae odio lacinia tincidunt. Etiam ut purus mattis mauris sodales aliquam. Aenean massa. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Vivamus consectetuer hendrerit lacus. In hac habitasse platea dictumst. Ut tincidunt tincidunt erat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
            </div>

          </div>
        </div>


      </section>
    </>
  )
}

export default About