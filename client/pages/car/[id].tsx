import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";

const Car: NextPage = () => {
  const router = useRouter()
  return <div>I am Car {router.query.id}</div>;
};

export default Car;
