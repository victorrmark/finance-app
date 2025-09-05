import PotsHeader from "./PotsHeader";
import Pots from "./Pots";

export default function page() {
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <PotsHeader />
      </div>

      <Pots />
    </>
  );
}
