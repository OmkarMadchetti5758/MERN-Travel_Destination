import { Link } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "@mui/material/Button";
// import "./PlaceList.css";

export default function PlaceList(props) {
  const style =
    "relative list-none m-4 p-0 w-11/12 z-1 max-w-2xl flex flex-col lg:ml-[22rem]";
  if (props.items.length === 0) {
    return (
      <div className={`${style} text-center`}>
        <Card className="bg-slate-300 mt-28">
          <h2 className="text-rose-700 font-bold flex flex-row justify-center ">
            No Places found!!! You can create one
          </h2>
          {/* <button className="border border-slate-900 w-28 ml-52 rounded-">Share Place</button> */}
          <div>
            <Button
              variant="contained"
              size="small"
              color="info"
              style={{ maxWidth: "30px", marginTop: "1rem" }}
            >
              <Link to="/places/new">SHARE PLACE</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }
  return (
    <ul className={style}>
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinate={place.location}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
}
