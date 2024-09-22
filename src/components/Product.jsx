import styled from "styled-components";
import PropTypes from "prop-types";

const ProductCard = styled.div`
  border: 1px solid white;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 15px;
  flex-grow: 1;
`;

const ProductTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ProductPrice = styled.p`
  font-weight: bold;
  color: lightgreen;
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: white;
  margin-bottom: 15px;
`;

const OrderControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: black;
`;

const OrderButton = styled.button`
  background-color: #e44d26;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  min-width: 40px;
  &:hover {
    background-color: #c13e1b;
  }
  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const OrderQuantity = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin: 0 15px;
`;

const Product = ({
  id,
  title,
  price,
  description,
  image,
  quantityOrdered,
  handleOrderChange,
}) => {
  return (
    <ProductCard>
      <ProductImage src={image} alt={title} />
      <ProductInfo>
        <ProductTitle>{title}</ProductTitle>
        <ProductPrice>${price.toFixed(2)}</ProductPrice>
        <ProductDescription>{description.charAt(0).toUpperCase() + description.slice(1)}</ProductDescription>
      </ProductInfo>
      <OrderControl>
        <OrderButton
          onClick={() => handleOrderChange(id, quantityOrdered - 1)}
          disabled={quantityOrdered === 0}
        >
          -
        </OrderButton>
        <OrderQuantity>{quantityOrdered}</OrderQuantity>
        <OrderButton onClick={() => handleOrderChange(id, quantityOrdered + 1)}>
          +
        </OrderButton>
      </OrderControl>
    </ProductCard>
  );
};

Product.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  quantityOrdered: PropTypes.number.isRequired,
  handleOrderChange: PropTypes.func.isRequired,
};

export default Product;
