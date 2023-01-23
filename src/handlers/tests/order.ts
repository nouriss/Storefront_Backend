import app from '../../server';
import {Order} from '../../models/order'
import {Product} from '../../models/product'
import {User} from '../../models/user'
import supertest from 'supertest';

const request = supertest(app);

describe('Test endpoint responses for order handler ', () => {
  //@ts-ignore
  const query: Order = {
                            user_id: 3,
                            status: "active"
                        }
  //@ts-ignore
  const resQuery: Order = {
    id: 1,
    user_id: 1,
    status: "active"
  }

   //@ts-ignore
   const userQuery: User = {
    firstname: "zainedin ",
    lastname: "zidane zizou",
    password: "worldCup98",  
  }
  const resUserQuery: User = {
    id: 1,
    firstname: "zainedin ",
    lastname: "zidane zizou",
    password: "worldCup98",  
  }

  it('Check valid api endpoint request create user', async () => {
    const response = await request.post('/users')
                .set('Content-type', 'application/json')
                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwiZmlyc3RuYW1lIjoiemFpbmVkaW4gMjE4IiwibGFzdG5hbWUiOiJ6aWRhbmUgeml6b3UiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkbGwyVUxjNzdPUVFrZDBGRWVQZGtjdTBzMi5VWjZ2aW5DS3hpc0RPMmF0TUxEOVFsS3ouL08ifSwiaWF0IjoxNjc0NDE5NTIxfQ.EPHQxxCjXkDuwB0g5-tcHBHXnwc3qV0op29DVnhlOp4')
                .send({ userQuery })


    expect(response.status).toBe(200);
    expect(response.body.query).toEqual(resUserQuery);
    //done();
  }); 

  it('Check valid api endpoint request create orders', async () => {
    const response = await request.post('/orders')
                                .set('Content-type', 'application/json')
                                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwiZmlyc3RuYW1lIjoiemFpbmVkaW4gMjE4IiwibGFzdG5hbWUiOiJ6aWRhbmUgeml6b3UiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkbGwyVUxjNzdPUVFrZDBGRWVQZGtjdTBzMi5VWjZ2aW5DS3hpc0RPMmF0TUxEOVFsS3ouL08ifSwiaWF0IjoxNjc0NDE5NTIxfQ.EPHQxxCjXkDuwB0g5-tcHBHXnwc3qV0op29DVnhlOp4')
                                .send({ query })


    expect(response.status).toBe(200);
    expect(response.body.query).toEqual(resQuery);
    //done();
  });


  it('Check invalid api endpoint request index', async () => {
    const response = await request.get('/orders')

    expect(response.status).toBe(200);
    expect(response.body.query).toEqual(resQuery);
    //done();
  });

  it('Check invalid api endpoint request show', async () => {
    const response = await request.get('/orders/1')

    expect(response.status).toBe(200);
    expect(response.body.query).toEqual(resQuery);
    //done();
  });

  it('Check invalid api endpoint request update', async () => {
    let queryUpdate : Order = resQuery
    queryUpdate.status = "complete"
    const response = await request.put('/orders')
                                .set('Content-type', 'application/json')
                                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwiZmlyc3RuYW1lIjoiemFpbmVkaW4gMjE4IiwibGFzdG5hbWUiOiJ6aWRhbmUgeml6b3UiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkbGwyVUxjNzdPUVFrZDBGRWVQZGtjdTBzMi5VWjZ2aW5DS3hpc0RPMmF0TUxEOVFsS3ouL08ifSwiaWF0IjoxNjc0NDE5NTIxfQ.EPHQxxCjXkDuwB0g5-tcHBHXnwc3qV0op29DVnhlOp4')
                                .send({ query })

    expect(response.status).toBe(200);
    expect(response.body.query.price).toEqual("complete");
    //done();
  });

  it('Check invalid api endpoint request delete', async () => {
    let queryUpdate : Order = resQuery
    queryUpdate.status = "complete"
    const response = await request.delete('/orders/1')
                                .set('Content-type', 'application/json')
                                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwiZmlyc3RuYW1lIjoiemFpbmVkaW4gMjE4IiwibGFzdG5hbWUiOiJ6aWRhbmUgeml6b3UiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkbGwyVUxjNzdPUVFrZDBGRWVQZGtjdTBzMi5VWjZ2aW5DS3hpc0RPMmF0TUxEOVFsS3ouL08ifSwiaWF0IjoxNjc0NDE5NTIxfQ.EPHQxxCjXkDuwB0g5-tcHBHXnwc3qV0op29DVnhlOp4')
                                .send({ })

    expect(response.status).toBe(200);
    expect(response.body.query).toEqual(queryUpdate);
    //done();
  });
})



describe('Test endpoint responses for join oder-product-user handler ', () => {
  //@ts-ignore
  const orderQuery: Order = {
    user_id: 1,
    status: "active"
  }
    //@ts-ignore
  const resOrderQuery: Order = {
    id: 1,
    user_id: 1,
    status: "active"
  }

  //@ts-ignore
  const resAddProduct2OrderQuery = {
    id: 1,
    quantity: 6,
    order_id: "1",
    product_id: "1"
  }

  //@ts-ignore
  const resUserOrderQuery: Order = {
    id: 1,
    product_id: [1],
    quantity: [6],
    user_id: 1,
    status: "active"
  }
    

  //@ts-ignore
  const productQuery: Product = {
    name: "Falcon Booster fx1002",
    price: 1000,
    category: "rocket engine"   
  }
  const resProductQuery: Product = {
    id: 1,
    name: "Falcon Booster fx1002",
    price: 1000,
    category: "rocket engine"   
  }
 
    //@ts-ignore
  const userQuery: User = {
    firstname: "zainedin ",
    lastname: "zidane zizou",
    password: "worldCup98",  
  }
  const resUserQuery: User = {
    id: 1,
    firstname: "zainedin ",
    lastname: "zidane zizou",
    password: "worldCup98",  
  }

  it('Check valid api endpoint request create user', async () => {
    const response = await request.post('/users')
                .set('Content-type', 'application/json')
                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwiZmlyc3RuYW1lIjoiemFpbmVkaW4gMjE4IiwibGFzdG5hbWUiOiJ6aWRhbmUgeml6b3UiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkbGwyVUxjNzdPUVFrZDBGRWVQZGtjdTBzMi5VWjZ2aW5DS3hpc0RPMmF0TUxEOVFsS3ouL08ifSwiaWF0IjoxNjc0NDE5NTIxfQ.EPHQxxCjXkDuwB0g5-tcHBHXnwc3qV0op29DVnhlOp4')
                .send({ userQuery })


    expect(response.status).toBe(200);
    expect(response.body.query).toEqual(resUserQuery);
    //done();
  }); 


  it('Check valid api endpoint request create product', async () => {
    const response = await request.post('/products')
                                .set('Content-type', 'application/json')
                                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwiZmlyc3RuYW1lIjoiemFpbmVkaW4gMjE4IiwibGFzdG5hbWUiOiJ6aWRhbmUgeml6b3UiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkbGwyVUxjNzdPUVFrZDBGRWVQZGtjdTBzMi5VWjZ2aW5DS3hpc0RPMmF0TUxEOVFsS3ouL08ifSwiaWF0IjoxNjc0NDE5NTIxfQ.EPHQxxCjXkDuwB0g5-tcHBHXnwc3qV0op29DVnhlOp4')
                                .send({ productQuery })


    expect(response.status).toBe(200);
    expect(response.body.query).toEqual(resProductQuery);
    //done();
  });


  it('Check valid api endpoint request create orders', async () => {
    const response = await request.post('/orders')
                                .set('Content-type', 'application/json')
                                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwiZmlyc3RuYW1lIjoiemFpbmVkaW4gMjE4IiwibGFzdG5hbWUiOiJ6aWRhbmUgeml6b3UiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkbGwyVUxjNzdPUVFrZDBGRWVQZGtjdTBzMi5VWjZ2aW5DS3hpc0RPMmF0TUxEOVFsS3ouL08ifSwiaWF0IjoxNjc0NDE5NTIxfQ.EPHQxxCjXkDuwB0g5-tcHBHXnwc3qV0op29DVnhlOp4')
                                .send({ orderQuery })


    expect(response.status).toBe(200);
    expect(response.body.query).toEqual(resOrderQuery);
    //done();
  });

  it('Check valid api endpoint request addProduct to orders', async () => {
    const response = await request.post('/orders/1/products')
                                .set('Content-type', 'application/json')
                                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwiZmlyc3RuYW1lIjoiemFpbmVkaW4gMjE4IiwibGFzdG5hbWUiOiJ6aWRhbmUgeml6b3UiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkbGwyVUxjNzdPUVFrZDBGRWVQZGtjdTBzMi5VWjZ2aW5DS3hpc0RPMmF0TUxEOVFsS3ouL08ifSwiaWF0IjoxNjc0NDE5NTIxfQ.EPHQxxCjXkDuwB0g5-tcHBHXnwc3qV0op29DVnhlOp4')
                                .send({  productId: 1,
                                         quantity: 6 })


    expect(response.status).toBe(200);
    expect(response.body.query).toEqual(resAddProduct2OrderQuery);
    //done();
  });


  it('Check valid api endpoint request getUserActiveOrder ', async () => {
    const response = await request.get('/users/1/orders')
                                .set('Content-type', 'application/json')
                                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwiZmlyc3RuYW1lIjoiemFpbmVkaW4gMjE4IiwibGFzdG5hbWUiOiJ6aWRhbmUgeml6b3UiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkbGwyVUxjNzdPUVFrZDBGRWVQZGtjdTBzMi5VWjZ2aW5DS3hpc0RPMmF0TUxEOVFsS3ouL08ifSwiaWF0IjoxNjc0NDE5NTIxfQ.EPHQxxCjXkDuwB0g5-tcHBHXnwc3qV0op29DVnhlOp4')
                                .send({ })


    expect(response.status).toBe(200);
    expect(response.body.query).toEqual(resAddProduct2OrderQuery);
    //done();
  });



}
)
