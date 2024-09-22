import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  border: 1px solid;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;

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
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  margin-top: 50px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 18px;
  margin-top: 50px;
`;

const Home = ({ homePageProducts, homePageIsLoading, homePageError }) => {
  if (homePageIsLoading) return <LoadingMessage>Loading...</LoadingMessage>;
  if (homePageError)
    return (
      <ErrorMessage>An error occurred. Please try again later.</ErrorMessage>
    );

  return (
    <Container>
      <Title>Special offers on select products!</Title>
      <ProductGrid>
        {homePageProducts.map(({ id, title, price, description, image }) => (
          <ProductCard key={id}>
            <ProductImage src={image} alt={title} />
            <ProductInfo>
              <ProductTitle>{title}</ProductTitle>
              <ProductPrice>${price.toFixed(2)}</ProductPrice>
              <ProductDescription>{description.charAt(0).toUpperCase() + description.slice(1)}</ProductDescription>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </Container>
  );
};

Home.propTypes = {
  homePageProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  homePageIsLoading: PropTypes.bool.isRequired,
  homePageError: PropTypes.bool.isRequired,
};

export default Home;
