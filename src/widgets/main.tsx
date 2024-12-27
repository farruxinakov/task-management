import { PropsWithChildren } from "react";

const Main = ({ children }: PropsWithChildren) => {
  return <main className="flex-1">{children}</main>;
};

export default Main;
