import React from 'react';

const MyProfile = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-backGroundColor text-textColor p-6 rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-6">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4"
        />
        <span className="text-sm text-textspan mt-1">Update your personal details below</span>
      </div>

      {/* Form Section */}
      <div className="flex gap-6">
        {/* First Form */}
        <form className="w-full p-6 bg-backGroundColor rounded-lg shadow-lg flex-1">
          <h2 className="font-bold text-2xl text-textspan text-center">Personal Info</h2>
          {/* First Line */}
          <div className="flex flex-wrap gap-6 my-6">
            <div className="flex-1">
              <label htmlFor="firstName" className="block text-sm font-medium text-textspan">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter First Name"
                className="mt-2 block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="lastName" className="block text-sm font-medium text-textspan">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter Last Name"
                className="mt-2 block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
              />
            </div>
          </div>

          {/* Second Line */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-textspan">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="mt-2 block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
            />
          </div>

          {/* Third Line */}
          <div className="flex flex-wrap gap-6 mb-6">
            {/* Left Side */}
            <div className="flex-1 md:w-1/2">
              <div className="mb-6">
                <label htmlFor="oldPassword" className="block text-sm font-medium text-textspan">
                  Old Password
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  placeholder="Enter Old Password"
                  className="mt-2 block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="newPassword" className="block text-sm font-medium text-textspan">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  placeholder="Enter New Password"
                  className="mt-2 block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-textspan">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm New Password"
                  className="mt-2 block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex-1 md:w-1/2 flex flex-col gap-6">
              <div className="flex-1">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-textspan">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="Enter Phone Number"
                  className="mt-2 block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
                />
              </div>
              <div className="flex-2">
                <label htmlFor="bio" className="block text-sm font-medium text-textspan">
                  Bio
                </label>
                <textarea
                  id="bio"
                  placeholder="Enter Bio"
                  rows="4"
                  className="mb-6 block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
                ></textarea>
              </div>
            </div>
          </div>
        </form>

        {/* Second Form */}
        <form className="w-full p-6 bg-backGroundColor rounded-lg shadow-lg flex-1">
  <h2 className="font-bold text-2xl text-textspan text-center">Business Info</h2>

  {/* Weight and Height Section */}
  <div className="flex flex-wrap gap-6 my-6">
    {/* Weight Input */}
    <div className="flex-1">
      <label htmlFor="weight" className="block text-sm font-medium text-textspan">
        Weight (kg)
      </label>
      <input
        type="number"
        id="weight"
        placeholder="Enter Weight"
        className="mt-2 block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
      />
    </div>
    <div className="flex-1">
      <label htmlFor="height" className="block text-sm font-medium text-textspan">
        Height (cm)
      </label>
      <input
        type="number"
        id="height"
        placeholder="Enter Height"
        className="mt-2 block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
      />
    </div>
    {/* Weight Combobox */}
  </div>

  {/* Height Input and Combobox */}
  <div className="flex flex-wrap gap-6 my-6">
    {/* Height Input */}
    
    <div className="flex-1">
      <label htmlFor="weightType" className="block text-sm font-medium text-textspan">
        Type
      </label>
      <select
        id="weightType"
        className="mt-2 block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
      >
        <option value="inDoor">inDoor</option>
        <option value="outDoor">outDoor</option>
      </select>
    </div>

  </div>

  {/* Goals Input */}
  <div className="mb-6">
    <label htmlFor="goals" className="block text-sm font-medium text-textspan">
      Goals
    </label>
    <textarea
      id="goals"
      placeholder="Enter your Goals"
      rows="4"
      className="mb-6 block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
    ></textarea>
  </div>

  {/* Food Allergies Input */}
  <div className="mb-6">
    <label htmlFor="foodAllergies" className="block text-sm font-medium text-textspan">
      Food Allergies
    </label>
    <textarea
      id="foodAllergies"
      placeholder="Enter any Food Allergies"
      rows="4"
      className="mb-6 block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
    ></textarea>
  </div>
</form>
      </div>

      {/* Buttons for the entire div */}
      <div className="flex justify-center space-x-16 mt-6">
        <button type="reset" className="px-8 py-2 bg-backGroundColor text-textColor rounded-md shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary">
          Reset
        </button>
        <button type="submit" className="px-8 py-2 bg-secondary text-backGroundColor rounded-md shadow-sm hover:bg-backGroundColor hover:border-secondary hover:text-textColor focus:outline-none focus:ring-2 focus:ring-secondary">
          Save
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
