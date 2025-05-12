export function formatTimeToDays(time: any) {
  const totalMinutes = time.hrs * 60 + time.mins;

  const days = Math.floor(totalMinutes / (24 * 60));
  const remainingMinutes = totalMinutes % (24 * 60);
  const hours = Math.floor(remainingMinutes / 60);
  const minutes = remainingMinutes % 60;

  return days;
}
