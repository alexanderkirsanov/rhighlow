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

    return {
        size,
        getCard,
        addCard
    }
};
export default Hand;