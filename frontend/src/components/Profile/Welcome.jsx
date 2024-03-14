import { useContext } from "react";
import { Context } from "../..";

const Welcome = () => {
  const { store } = useContext(Context);

  return (
    <div>
      <h2>{store.user.nickname}, Ну приветик :D</h2>
    </div>
  )
}

export default Welcome;