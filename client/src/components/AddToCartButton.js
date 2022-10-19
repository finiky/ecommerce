const AddToCart = ({ id }) => {
  const addItemToCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const productData = await fetch(`http://localhost:4000/items/${id}`);
      const product = await productData.json();
      console.log(product);
      const response = await fetch(`http://localhost:4000/cart/${user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application.json",
        },
        body: JSON.stringify(product),
      });
      if (response.ok) {
        alert("Item is added to the cart.");
      } else {
        alert("Item is not added to the cart. Please retry.");
      }
    } else {
      alert("User is not logged in");
    }
  };
  return <button onClick={addItemToCart}>Add to cart</button>;
};

export default AddToCart;
