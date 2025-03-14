export const generateDummyHistory = () => {
  const history = [];
  const now = new Date();
  let startMinutesAgo = 30;

  for (let i = 0; i < 6; i++) {
    const time = new Date(now.getTime() - startMinutesAgo * 60000);
    const formattedTime = `${time.getHours()}:${time.getMinutes().toString().padStart(2, "0")}`;
    const level = 75 - i;

    history.push({ time: formattedTime, level });
    startMinutesAgo -= 5;
  }

  return history;
};