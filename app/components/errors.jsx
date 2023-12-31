import { MdErrorOutline } from "react-icons/md";
export function NotValid(code) {
  return <div> {alert({ code }, " Oops! Something went wrong!")} </div>;
}

export function InvalidEntry() {
  return (
    <div>
      <p className="invalidEntry">
        <MdErrorOutline style={{
            marginRight: "5px",
            fontSize: "18px",
        }}/> Invalid entry, please input a number 1 - 496
      </p>
    </div>
  );
}
