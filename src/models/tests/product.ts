import { Product, ProductStore } from '../product';

const store = new ProductStore()

describe("Book Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await store.create({
      id: -1,
      name: 'Rocket booster FX5',
      price: 1000,
      category: 'Space shutle engine'
    });
    expect(result).toEqual({
      id: 1,
      name: 'Rocket booster FX5',
      price: 1000,
      category: 'Space shutle engine'
    });
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result).toEqual([{
      id: 1,
      name: 'Rocket booster FX5',
      price: 1000,
      category: 'Space shutle engine'
    }]);
  });

  it('show method should return the correct user', async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      id: 1,
      name: 'Rocket booster FX5',
      price: 1000,
      category: 'Space shutle engine'
    });
  });

  it('delete method should remove the book', async () => {
    store.delete(1);
    const result = await store.index()

    expect(result).toEqual([]);
  });
});