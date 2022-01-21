import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";

const Garage: NextPage = () => {
  const router = useRouter()
  return <div>I am Garage {router.query.id}</div>;
};

export default Garage;
