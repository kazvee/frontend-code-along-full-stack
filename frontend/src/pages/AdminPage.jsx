import { useState } from 'react';
import { Fab } from '@mui/material';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import AddProductModal from '../modals/AddProductModal';
import ProductListAdmin from '../components/ProductListAdmin';
import Container from '@mui/material/Container';

const AdminPage = ({ allProducts, setAllProducts }) => {
  const [isAddProductModalVisible, setIsAddProductVisible] = useState(false);

  const handleOnSubmit = (product) => {
    const tempProducts = Array.from(allProducts);
    tempProducts.push({
      ...product,
      _id: tempProducts.length + 1, // Add an id when storing
    });
    setAllProducts(tempProducts);
  };

  // this creates a different array that has all products, not updating the value of the state in an incorrect way
  // setAllProducts(allProducts.push(product)) // not like this! It will mutate the state value directly.
  // setAllProducts(prev => prev.push(product)); // grab prev value from inside the function and just return the previous with the new product.

  return (
    <Container maxWidth='lg' sx={{ margin: 2 }}>
      <Fab
        variant='extended'
        onClick={() => setIsAddProductVisible(true)}
        sx={{
          position: 'absolute',
          bottom: '24px',
          right: '24px',
        }}
      >
        <AddCircleOutline sx={{ mr: 1 }} />
        Add a new product
      </Fab>
      <ProductListAdmin products={allProducts} />
      <AddProductModal
        open={isAddProductModalVisible}
        onClose={() => setIsAddProductVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </Container>
  );
};

export default AdminPage;
