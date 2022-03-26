import { useParams } from "react-router-dom";

function GroupExpense(props) {
  const { groupID } = useParams();
  
  return (
    <div style={{ color: "black", margin: 30}}>
      Group {groupID}
    </div>
  );
}

export default GroupExpense;
