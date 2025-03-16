import request from "supertest";
 import app from "../server";
 import Author from "../models/author";
 
 describe("Verify GET /authors", () => {
     const mockAuthors = [
         { name: "John, Roe", lifespan: "1930 - 2000" },
         { name: "Mayer, Katie", lifespan: "1945 - 2011" },
         { name: "Luna, Randy", lifespan: "1985 - 2024" },
         { name: "Rita, John", lifespan: "1930 - 1970" },
     ];
 
     let consoleSpy: jest.SpyInstance;
 
     beforeAll(() => {
         consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
     });
 
     afterAll(() => {
         consoleSpy.mockRestore();
     });
 
     it("should respond with a message when the database has no authors", async () => {
         Author.getAllAuthors = jest.fn().mockResolvedValue([]);
         const response = await request(app).get("/authors");
         expect(response.statusCode).toBe(200);
         expect(response.text).toBe("No authors found");
     });
 
     it("should respond with a list of author names and lifetimes sorted by family name", async () => {
         const expextedSortedAuthors = [...mockAuthors]
             .sort((a, b) => a.name.localeCompare(b.name))
         Author.getAllAuthors = jest.fn().mockImplementationOnce((sortOpts) => {
             if (sortOpts && sortOpts.family_name === 1) {
                 return Promise.resolve(expextedSortedAuthors);
             }
             return Promise.resolve(mockAuthors);
         });
         const response = await request(app).get("/authors");
         expect(response.statusCode).toBe(200);
         expect(expextedSortedAuthors).toStrictEqual(response.body);
     });
 
     it("should respond with an error message when there is an error processing the request", async () => {
         Author.getAllAuthors = jest.fn().mockRejectedValue(new Error("Database error"));
         const response = await request(app).get("/authors");
         expect(response.statusCode).toBe(500);
         expect(consoleSpy).toHaveBeenCalled();
     });
 });