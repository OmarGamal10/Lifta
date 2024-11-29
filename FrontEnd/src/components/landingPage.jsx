import "./output.css"; // Adjust the path as needed

function LandingPage() {
  return (
    <div className="bg-customBg bg-no-repeat bg-customPos bg-customSize">
      {/* nav bar */}
      <nav className="relative container mx-auto p-4 text-textColor">
        <div className="flex justify-between items-center">
          <div className="flex items-center text-3xl font-bold gap-2">
            <span>LIFTA</span>
            <img
              className="object-cover h-10 w-14"
              src="src/assets/logo.png"
              alt="logo"
            />
          </div>
          <div className="flex items-center gap-6">
            <a
              href=""
              className="w-32 h-5 p-4 flex justify-center items-center rounded-full bg-primary text-backGroundColor hover:font-medium"
            >
              Log in
            </a>
            <a
              href=""
              className="w-32 h-5 p-4 flex justify-center items-center rounded-full bg-primary text-backGroundColor hover:font-medium"
            >
              Sign up
            </a>
          </div>
        </div>
      </nav>

      {/* hero section */}

      <div className="mx-auto px-48 text-left mt-48">
        <div className="container flex w-screen items-center justify-start mb-6">
          <h1 className="text-4xl font-medium flex flex-col md:text-5xl text-textColor">
            <span className="leading-tight">Lift Your Strength,</span>
            <span className="leading-tight">Nourish Your Life</span>
          </h1>
        </div>
        <div className="flex container mb-16">
          <p class="text-textColor">
            Your ultimate platform for fitness and nutrition, connecting you
            <br /> with expert coaches to achieve your health goals through
            <br /> personalized workouts and balanced meal plans
          </p>
        </div>
        <div className="flex items-center gap-6">
          <a
            href=""
            className="w-48 h-8 p-4 flex justify-center items-center rounded-full bg-primary border-2  border-primary text-backGroundColor hover:font-medium"
          >
            Sign up
          </a>
          <a
            href=""
            className="w-48 h-8 p-4 flex justify-center items-center rounded-full border-seondary border-2 text-secondary hover:font-medium hover:border-primary hover:text-primary"
          >
            Log in
          </a>
        </div>
      </div>
      {/* ---- */}
      <div className="mx-auto p-48 justify-between items-center mt-24 flex">
        <div className="text-left">
          <div className="container flex w-screen items-center justify-start mb-12">
            <h2 className="text-3xl font-medium  flex flex-col md:text-4xl text-textColor">
              <span className="leading-tight">Achieve Your Goals with</span>
              <span className="leading-tight">Personalized Support</span>
            </h2>
          </div>
          <div className="flex container mb-16 px-6">
            <ul className="text-textColor text-lg space-y-4">
              <li>
                Customized workouts and diet programs <br /> designed just for
                you!
              </li>
              <li>
                Monitor progress, and stay motivated <br /> every step of the
                way
              </li>
              <li>
                Subscribe to top coaches and communicate <br /> in real-time
              </li>
            </ul>
          </div>
        </div>
        <div>
          <img
            className="object-cover h-108 w-108"
            src="src/assets/landingGym.svg"
            alt=""
          />
        </div>
      </div>
      {/* ---- */}
      <div className="mx-auto p-48 justify-between items-center flex">
        <img
          className="object-cover h-108 w-108"
          src="src/assets/landingNutrition.svg"
          alt=""
        />
        <div className="text-left">
          <div className="container flex w-screen items-center justify-start mb-12">
          <h2 className="text-3xl font-medium  flex flex-col md:text-4xl text-textColor">
              <span className="leading-tight">A Coach?</span>
              <span className="leading-tight">Empower Your Clients</span>
              <span className="leading-tight">and Build Success</span>
            </h2>
          </div>
          <div className="flex container mb-16">
            <ul className="text-textColor text-lg space-y-4">
              <li>Define packages, and grow your client base</li>
              <li>
                Design tailored workouts and diet programs <br /> for each
                client’s unique needs
              </li>
              <li>
                Monitor client feedback, progress, <br /> and communication in
                real-time
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* footer */}
      <footer className="divide-y divide-textColor text-textColor px-48">
        <hr />
        <div className="flex justify-between py-6 mx-auto items-center ">
          <span>&copy;2024 LIFTA</span>
          <h3 className="font-medium text-lg">LIFTA</h3>
          <a
            href=""
            className="w-32 h-5 p-4 flex justify-center items-center rounded-full bg-primary text-backGroundColor hover:font-medium"
          >
            Sign up
          </a>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
