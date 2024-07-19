import UserItem from "./UserItem.jsx";
import './UsersList.css'

export default function UserList(props) {
  if (props.items.length === 0) {
    return (
      <div className="text-center">
        <h2 className="font-bold text-red-800 text-2xl p-28">No Users Found</h2>
      </div>
    );
  }
  return (
    <ul className="relative lg:ml-[9.5rem] gap-5 max-w-[80rem] flex justify-items-start flex-wrap mb-8">
      {props.items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </ul>
  );
}
