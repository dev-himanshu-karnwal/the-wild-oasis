import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

import Stat from "./Stat";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;

  const sales = formatCurrency(
    bookings.reduce((acc, cur) => acc + cur.totalPrice, 0)
  );

  const checkIns = confirmedStays.length;

  const occupancy = Math.round(
    (confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) * 100) /
      (numDays * cabinCount)
  );

  return (
    <>
      <Stat
        title="BOOKINGS"
        value={numBookings}
        color="blue"
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title="SALES"
        value={sales}
        color="green"
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title="CHECK INS"
        value={checkIns}
        color="blue"
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        title="OCCUPANCY RATE"
        value={occupancy + "%"}
        color="yellow"
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;
