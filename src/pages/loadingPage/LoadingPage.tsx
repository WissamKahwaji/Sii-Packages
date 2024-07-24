import logo from "../../assets/logo_sii_new_2.png";
const LoadingPage = () => {
  return (
    <div className="  h-screen  items-center justify-center">
      <div className="h-full w-full animate-pulse sm:h-full sm:w-full md:h-full md:w-full flex justify-center items-center">
        <img
          src={logo}
          className="aspect-square h-1/2 w-1/2 object-contain"
          alt="logo"
        />
      </div>
    </div>
  );
};

export default LoadingPage;
