import React from 'react'

const UserDashboard = () => {
  return (
    <>
      <section className="dashboard">
        <div className="container p-10">
          <div className="dashboard-details border border-gray-300 py-10 px-5">
            <h2 className='font-semibold text-2xl uppercase border-b-2 border-dotted text-center'>Dashboard</h2>

            <div className='details mt-4 text-gray-500'>
              <p>Hello, <span className='text-[#000000]'>User</span> (If Not <span className='text-[#000000]'>User</span> ! Logout)</p>
              <p>From your account dashboard. you can easily check & view your recent orders, manage your shipping and billing addresses and edit your password and account details.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default UserDashboard