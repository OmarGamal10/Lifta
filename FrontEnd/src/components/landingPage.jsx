import "./output.css"; // Adjust the path as needed

// import "@fontsource/roboto"; // Default weight 400
// import "@fontsource/roboto/500.css"; // Weight 500
// import "@fontsource/roboto/700.css"; // Weight 700

function LandingPage() {
  return (
      <div className="font-roboto">
        <nav className="relative container mx-auto p-4 text-textColor">
          <div className="flex justify-between items-center">
            <div className="p-2 flex items-center text-3xl font-bold gap-2">
              <span>LIFTA</span>
              <img
                className="object-cover h-10 w-14"
                src="src/assets/logo.png"
                alt="logo"
              />
            </div>
            <div className="flex items-center gap-6">
              <a href="" className="w-32 h-5 p-4 flex justify-center items-center rounded-full bg-primary text-backGroundColor hover:font-medium">Log in</a>
              <a href="" className="w-32 h-5 p-4 flex justify-center items-center rounded-full bg-primary text-backGroundColor hover:font-medium">Sign up</a>
            </div>
          </div>
        </nav>
      </div>
  );
}

export default LandingPage;
