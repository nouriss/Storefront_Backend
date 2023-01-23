import app from '../../server';
import {Product} from '../../models/product'
import supertest from 'supertest';

const request = supertest(app);

describe('Test endpoint responses for product handler ', () => {
  //@ts-ignore
  const query: Product = {
                            name: "Falcon Booster fx1002",
                            price: 1000,
                            category: "rocket engine"   
                         }
  const resQuery: Product = {
     id: 1,
     name: "Falcon Booster fx1002",
     price: 1000,
    category: "rocket engine"   
  }
  it('Check valid api endpoint request create pruduct', async () => {
    const response = await request.post('/products')
                                .set('Content-type', 'application/json')
                                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwiZmlyc3RuYW1lIjoiemFpbmVkaW4gMjE4IiwibGFzdG5hbWUiOiJ6aWRhbmUgeml6b3UiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkbGwyVUxjNzdPUVFrZDBGRWVQZGtjdTBzMi5VWjZ2aW5DS3hpc0RPMmF0TUxEOVFsS3ouL08ifSwiaWF0IjoxNjc0NDE5NTIxfQ.EPHQxxCjXkDuwB0g5-tcHBHXnwc3qV0op29DVnhlOp4')
                                .send({ query })


    expect(response.status).toBe(200);
    expect(response.body.query).toEqual(resQuery);
    //done();
  });


  it('Check invalid api endpoint request index', async () => {
    const response = await request.get('/products')

    expect(response.status).toBe(200);
    expect(response.body.query).toEqual(resQuery);
    //done();
  });

  it('Check invalid api endpoint request show', async () => {
    const response = await request.get('/products/1')

    expect(response.status).toBe(200);
    expect(response.body.query).toEqual(resQuery);
    //done();
  });

  it('Check invalid api endpoint request update', async () => {
    let queryUpdate : Product = query
    queryUpdate.price = 2000
    const response = await request.put('/products')
                                .set('Content-type', 'application/json')
                                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwiZmlyc3RuYW1lIjoiemFpbmVkaW4gMjE4IiwibGFzdG5hbWUiOiJ6aWRhbmUgeml6b3UiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkbGwyVUxjNzdPUVFrZDBGRWVQZGtjdTBzMi5VWjZ2aW5DS3hpc0RPMmF0TUxEOVFsS3ouL08ifSwiaWF0IjoxNjc0NDE5NTIxfQ.EPHQxxCjXkDuwB0g5-tcHBHXnwc3qV0op29DVnhlOp4')
                                .send({ query })

    expect(response.status).toBe(200);
    expect(response.body.query.price).toEqual(2000);
    //done();
  });

  it('Check invalid api endpoint request delete', async () => {
    let queryUpdate : Product = resQuery
    queryUpdate.price = 2000
    const response = await request.delete('/products/1')
                                .set('Content-type', 'application/json')
                                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwiZmlyc3RuYW1lIjoiemFpbmVkaW4gMjE4IiwibGFzdG5hbWUiOiJ6aWRhbmUgeml6b3UiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkbGwyVUxjNzdPUVFrZDBGRWVQZGtjdTBzMi5VWjZ2aW5DS3hpc0RPMmF0TUxEOVFsS3ouL08ifSwiaWF0IjoxNjc0NDE5NTIxfQ.EPHQxxCjXkDuwB0g5-tcHBHXnwc3qV0op29DVnhlOp4')
                                .send({ })

    expect(response.status).toBe(200);
    expect(response.body.query).toEqual(queryUpdate);
    //done();
  });
})
