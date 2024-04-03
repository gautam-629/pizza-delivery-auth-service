
import request from 'supertest'
import app from "../../src/app"
import { DataSource } from 'typeorm'
import { AppDataSource } from '../../src/config/data-source';
describe("Post /auth/register", () => {
 
   let connection:DataSource;
   beforeAll(async ()=>{
       connection= await AppDataSource.initialize();
   })

   beforeEach(async()=>{
      await connection.dropDatabase();
      await connection.synchronize();
   })

   afterAll(async()=>{
      await connection.destroy()
   })

   describe("Given all fields", () => {
      it("should return 201 status code", async () => {
         //Arrange
         const userData = {
            firstName: "Binod",
            lastName: "gautam",
            email: "gautambinod629@gmail.com",
            password: "secret5555555555555",
         }

         //act
         const response = await request(app)
            .post('/auth/register')
            .send(userData)

         //Assert
         expect(response.statusCode).toBe(201)

      })

   })
   describe("Fields are missing", () => {

   })
   describe("Fields are not in proper format", () => {

   })
})