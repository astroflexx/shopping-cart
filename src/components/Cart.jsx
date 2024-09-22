import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CartContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const ProductInfo = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const ProductTitle = styled.h3`
  margin: 0;
  font-size: 1.2em;
`;

const ProductDescription = styled.p`
  margin: 5px 0;
  font-size: 0.9em;
`;

const ProductPrice = styled.div`
  font-weight: bold;
  font-size: 1.1em;
`;

const TotalCost = styled.div`
  font-weight: bold;
  color: #333;
  font-size: 1.2em;
`;

const CheckoutLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const FinalBill = styled.div`
  text-align: right;
  font-weight: bold;
  font-size: 1.4em;
  margin-top: 20px;
`;

const Cart = ({ order }) => {
  console.log(order);
  const totalBill = order.reduce((total, product) => {
    return total + product.price * product.quantityOrdered;
  }, 0);

  if (order.length === 0) return <div>Your cart is empty! Check out the products in our shop.</div>

  return (
    <CartContainer>
      {order.map((product) => (
        <ProductItem key={product.id}>
          <ProductInfo>
            <ProductTitle>{product.title}</ProductTitle>
            <ProductDescription>{product.description}</ProductDescription>
            <ProductPrice>${product.price}</ProductPrice>
            <div>Quantity Ordered: {product.quantityOrdered}</div>
          </ProductInfo>
          <TotalCost>
            Total: ${(product.price * product.quantityOrdered).toFixed(2)}
          </TotalCost>
        </ProductItem>
      ))}
      <FinalBill>Final Bill: ${totalBill.toFixed(2)}</FinalBill>
      <CheckoutLink to="/checkout">Proceed to Checkout</CheckoutLink>
    </CartContainer>
  );
};

Cart.propTypes = {
  order: PropTypes.array.isRequired,
};

export default Cart;
