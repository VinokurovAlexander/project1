const ITEM_SELECTOR = '.main__item p';
const DATA = ['Go!','1', '2', '3'];
const Interval = {
  ITEM: 700,
  FUNCTION: 2000
};

const dataLength = DATA.length - 1;

const showData = () => {
  let index = 0;

  let timerId = setInterval(() => {
    if (index > dataLength) {
      index = 0;
      clearInterval(timerId);
      setTimeout(showData, Interval.FUNCTION);
    }

    item.textContent = DATA[index];
    index++;
  }, Interval.ITEM)
};

const item = document.querySelector(ITEM_SELECTOR);

if (item) {
  showData();
}
