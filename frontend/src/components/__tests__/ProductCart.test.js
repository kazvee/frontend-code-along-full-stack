import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Chance from 'chance';
import ProductCart from '../ProductCart';

const chance = new Chance();

const handleLess = jest.fn();
const handleMore = jest.fn();

describe('When using ProductCart component', () => {
  let product;

  // Queried using beforeEach for
  // render(<ProductCart product={product} />);
  // but advice was that each test should stand alone (even though code is repeated)

  beforeEach(() => {
    product = {
      _id: chance.guid(), // could also use string
      name: chance.name(),
      description: chance.string(),
      price: chance.integer(),
      imageUrl: chance.url(),
      qty: chance.integer(),
      // altText: chance.altText(), // TODO - check how to use this, would good for accessibility
    };
  });

  it('Should display the product image', () => {
    // Arrange
    render(<ProductCart product={product} />);
    // Act
    const image = screen.getByRole('img');
    // Assert
    expect(image).toBeVisible();
  });

  it('Should display the product name', () => {
    // Arrange
    render(<ProductCart product={product} />);
    // Act
    const name = screen.getByText(product.name);
    // Assert
    expect(name).toBeVisible();
  });

  it('Should display the product description', () => {
    // Arrange
    render(<ProductCart product={product} />);
    // Act
    const description = screen.getByText(product.description);
    // Assert
    expect(description).toBeVisible();
  });

  it('Should display the product price label', () => {
    // Arrange
    render(<ProductCart product={product} />);
    // Act
    const priceLabel = screen.getByText('Price');
    // Assert
    expect(priceLabel).toBeVisible();
  });

  it('Should display the product price', () => {
    // Arrange
    render(<ProductCart product={product} />);
    // Act
    const price = screen.getByText('$' + product.price);
    // Assert
    expect(price).toBeVisible();
  });

  it.skip('Should display the product imageUrl', () => {});

  it.skip('Should display the product quantity', () => {});

  it.skip('Should display the product image AltText', () => {});

  it('Should display the product add button', () => {
    // Arrange
    render(<ProductCart product={product} />);
    // Act
    const addButton = screen.getByRole('button', { name: '+' });
    // Assert
    expect(addButton).toBeVisible();
  });

  it('Should display the product remove button', () => {
    // Arrange
    render(<ProductCart product={product} />);
    // Act
    const removeButton = screen.getByRole('button', { name: '-' });
    // Assert
    expect(removeButton).toBeVisible();
  });

  it('Should call the onClick property when the add button is clicked', async () => {
    // Arrange
    const use = userEvent.setup();
    render(<ProductCart product={product} handleMore={handleMore} />);
    // Act
    const addButton = screen.getByRole('button', { name: '+' });
    await use.click(addButton);
    // Assert
    expect(handleMore).toHaveBeenCalled();
  });

  it('Should call the onClick property twice when the add button is clicked twice', async () => {
    // Arrange
    const use = userEvent.setup();
    render(<ProductCart product={product} handleMore={handleMore} />);
    // Act
    const addButton = screen.getByRole('button', { name: '+' });
    await use.dblClick(addButton);
    // Assert
    expect(handleMore).toHaveBeenCalledTimes(2);
  });

  it('Should call the onClick property when the remove button is clicked', async () => {
    // Arrange
    const use = userEvent.setup();
    render(<ProductCart product={product} handleLess={handleLess} />);
    // Act
    const removeButton = screen.getByRole('button', { name: '-' });
    await use.click(removeButton);
    // Assert
    // expect(handleLess).toHaveBeenCalled(); // or could do the below
    expect(handleLess).toHaveBeenCalledTimes(1);
  });
});
