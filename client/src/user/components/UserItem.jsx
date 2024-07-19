import { Link } from "react-router-dom";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import "./UserItem.css";
export default function UserItem(props) {
  const style = "flex flex-col items-center w-full h-full no-underline decoration-white bg-amber-600 hover:bg-cyan-950 hover:text-amber-600 active:bg-amber-400 rounded-xl justify-center ml-7"
  return (
    <li className="relative min-w-48 rounded-xl ml-7 md:shrink-0">
      <Card className="bg-cyan-950 rounded-xl px-[6.5rem] py-4 text-center transition duration-300 ease-in-out hover:shadow-lg hover:scale-105 md:px-24 text-white hover:text-amber-500">
        <Link to={`/${props.id}/places`}>
          <div className="w-24 h-24 mr-4">
          {/* <Avatar image={`http://localhost:5000/${props.image}`} alt={props.name} /> */}
            <Avatar image={`http://localhost:5000/${props.image}`} alt={props.name} />
          </div>
          <div>
            <h2 className="m-0 text-xl font-bold">{props.name}</h2>
            <h3 className="m-0 font-semibold">
              {props.placeCount} {props.placeCount > 1 ? "Places" : "Place"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
}
