import { Link } from "react-router-dom";

const MakeRequestPageFooter = () => {
  return (
    <div>
      <div className="">
        <h2 className="text-dark text-2xl">
          Unsure who to ask, or what to ask for?
        </h2>
        <p>
          <Link to="#" className="text-primary underline">
            Get help making a request
          </Link>{" "}
          or{" "}
          <Link to="#" className="text-primary underline">
            see our beginner’s guide
          </Link>{" "}
        </p>
      </div>
      <div className="pt-10">
        <h2 className="text-dark text-2xl">Can't find the one you want?</h2>
        <p>
          <Link to="#" className="text-primary underline">
            Browse all
          </Link>{" "}
          or{" "}
          <Link to="#" className="text-primary underline">
            ask us to add one.
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default MakeRequestPageFooter;
