const formatItem = (item) => {
    return {
        id: item._id,
        description: item.description,
        title: item.title,
        price: item.price
    };
};

module.exports = formatItem;