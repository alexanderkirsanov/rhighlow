import Card from './card';
const Hand = (size) => {
    const cardList = [];
    const addCard = (card) => {
        if (cardList.length < size) {
            cardList.push(card);
        }
    };
    const getCard = (index) => {
        return cardList[index];
    };
    const findLowestIndex = (startIndex) => {
        let i;
        let low = startIndex;
        let lowCard = getCard(low);
        for (i = startIndex + 1; i < size; i++) {
            if (Card.comareTo(getCard(i), lowCard) < 0) {
                low = i;
                lowCard = getCard(i);
            }
        }
        return low;
    };
    const sort = () => {
        let lowIndex;
        for (let i = 0; i < size; i++) {
            lowIndex = findLowestIndex(i);
            const card = getCard(i);
            cardList[i] = getCard(lowIndex);
            cardList[lowIndex] = card;
        }
    };
    return {
        size,
        sort,
        getCard,
        addCard
    }
};
export default Hand;