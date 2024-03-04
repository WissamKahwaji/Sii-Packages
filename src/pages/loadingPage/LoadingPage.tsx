import logo from "../../assets/sii_logo.svg";
const LoadingPage = () => {
  return (
    <div className=" absolute left-0 top-0 z-30 flex h-screen w-screen items-center justify-center">
      <div className="h-20 w-20 animate-pulse sm:h-20 sm:w-20 md:h-40 md:w-40">
        <img
          src={logo}
          className="aspect-square h-full w-full object-cover"
          alt="logo"
        />
      </div>
    </div>
  );
};

export default LoadingPage;
