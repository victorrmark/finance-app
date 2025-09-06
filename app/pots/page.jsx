import PotsHeader from "./PotsHeader";
import Pots from "./Pots";

export const metadata = {
  title: "Pots",
  description: "Organize your savings into pots, set targets, and watch your progress toward financial milestones.",
};

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
