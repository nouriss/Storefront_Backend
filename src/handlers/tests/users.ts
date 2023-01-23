import app from '../../server';
import {User} from '../../models/user'
import supertest from 'supertest';

const request = supertest(app);

describe('Test endpoint responses for user handler ', () => {
  //@ts-ignore
  const query: User = {
                        firstname: "zainedin ",
                        lastname: "zidane zizou",
                        password: "worldCup98",  
                      }
  const resQuery: User = {
    id: 1,
    firstname: "zainedin ",
    lastname: "zidane zizou",
    password: "worldCup98",  
  }
  it('Check valid api endpoint request create user', async () => {
    const response = await request.post('/users')
                                .set('Content-type', 'application/json')
                                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwiZmlyc3RuYW1lIjoiemFpbmVkaW4gMjE4IiwibGFzdG5hbWUiOiJ6aWRhbmUgeml6b3UiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkbGwyVUxjNzdPUVFrZDBGRWVQZGtjdTBzMi5VWjZ2aW5DS3hpc0RPMmF0TUxEOVFsS3ouL08ifSwiaWF0IjoxNjc0NDE5NTIxfQ.EPHQxxCjXkDuwB0g5-tcHBHXnwc3qV0op29DVnhlOp4')
                                .send({ query })


    expect(response.status).toBe(200);
    expect(response.body.query).toEqual(resQuery);
    //done();
  });


  it('Check invalid api endpoint request index', async () => {
    const response = await request.get('/users')

    expect(response.status).toBe(200);
    expect(response.body.query).toEqual(resQuery);
    //done();
  });

  it('Check invalid api endpoint request show', async () => {
    const response = await request.get('/users/1')

    expect(response.status).toBe(200);
    expect(response.body.query).toEqual(resQuery);
    //done();
  });

  it('Check invalid api endpoint request update', async () => {
    let queryUpdate : User = query
    queryUpdate.firstname = "messi"
    const response = await request.put('/users')
                                .set('Content-type', 'application/json')
                                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwiZmlyc3RuYW1lIjoiemFpbmVkaW4gMjE4IiwibGFzdG5hbWUiOiJ6aWRhbmUgeml6b3UiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkbGwyVUxjNzdPUVFrZDBGRWVQZGtjdTBzMi5VWjZ2aW5DS3hpc0RPMmF0TUxEOVFsS3ouL08ifSwiaWF0IjoxNjc0NDE5NTIxfQ.EPHQxxCjXkDuwB0g5-tcHBHXnwc3qV0op29DVnhlOp4')
                                .send({ query })

    expect(response.status).toBe(200);
    expect(response.body.query.firstname).toEqual("messi");
    //done();
  });

  it('Check invalid api endpoint request delete', async () => {
    let queryUpdate : User = query
   
    const response = await request.delete('/users/1')
                                .set('Content-type', 'application/json')
                                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwiZmlyc3RuYW1lIjoiemFpbmVkaW4gMjE4IiwibGFzdG5hbWUiOiJ6aWRhbmUgeml6b3UiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkbGwyVUxjNzdPUVFrZDBGRWVQZGtjdTBzMi5VWjZ2aW5DS3hpc0RPMmF0TUxEOVFsS3ouL08ifSwiaWF0IjoxNjc0NDE5NTIxfQ.EPHQxxCjXkDuwB0g5-tcHBHXnwc3qV0op29DVnhlOp4')
                                .send({ })

    expect(response.status).toBe(200);
    expect(response.body.query).toEqual(resQuery);
    //done();
  });
})