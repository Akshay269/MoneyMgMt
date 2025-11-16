import { checkUser } from "@/lib/checkUser";
import HeaderClient from "./header-client";

export default async function HeaderServer() {
  await checkUser();   // SSR logic allowed here

  return <HeaderClient />;
}
