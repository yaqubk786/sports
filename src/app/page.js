import Image from "next/image";
// import SignInPage from "./login/page";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
  return (
    <>
      <div>
        {/* <SignInPage /> */}
      </div>
    </>
  );
}
