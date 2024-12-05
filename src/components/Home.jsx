import { useSelector } from "react-redux";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="home h-screen flex justify-center items-center">
      <div className="font-bold text-xl h-fit">
        <h1>Welcome, {currentUser.name}</h1>
        <p>Your Role: {currentUser.role}</p>
      </div>
    </div>
  );
};

export default Home;
