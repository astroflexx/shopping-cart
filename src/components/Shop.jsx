import styled from "styled-components";
import PropTypes from "prop-types";
import Product from "./Product";

const ShopContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  color: white;
  margin-bottom: 20px;
  text-align: center;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  margin-top: 50px;
  color: white;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #e44d26;
  margin-top: 50px;
`;

const Shop = ({
  shopPageProducts,
  shopPageIsLoading,
  shopPageError,
  handleOrderChange,
}) => {
  if (shopPageIsLoading)
    return <LoadingMessage>Loading products...</LoadingMessage>;
  if (shopPageError)
    return (
      <ErrorMessage>An error occurred. Please try again later.</ErrorMessage>
    );

  return (
    <ShopContainer>
      <Title>Our Products</Title>
      <ProductGrid>
        {shopPageProducts.map((product) => (
          <Product
            key={product.id}
            {...product}
            quantityOrdered={product.quantityOrdered}
            handleOrderChange={handleOrderChange}
          />
        ))}
      </ProductGrid>
    </ShopContainer>
  );
};

Shop.propTypes = {
  shopPageProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      quantityOrdered: PropTypes.number,
    })
  ).isRequired,
  shopPageIsLoading: PropTypes.bool.isRequired,
  shopPageError: PropTypes.bool.isRequired,
  handleOrderChange: PropTypes.func.isRequired,
};

export default Shop;
