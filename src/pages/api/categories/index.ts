/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { NextApiRequest } from "next";
import { faker } from "@faker-js/faker";
import { NextApiRequest, NextApiResponse } from "next";
import { appRouter } from "~/server/api/root";
import { createCallerFactory } from "~/server/api/trpc";
import { db } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const createCaller = createCallerFactory(appRouter);
    const caller = createCaller({ db });
    try {
      const numberOfcategory = 100;
      const categoryArray:{ name:string}[] = [];
      function generateUniqueCategory() {
        let category;
        do {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          category = `${faker.commerce.department()} ${faker.word.adjective()}`;
        } while (categoryArray.includes({name:category}));
        categoryArray.push({name:category});
        return category;
      }
      
      for (let i = 0; i < numberOfcategory; i++) {
        generateUniqueCategory()
      }
        console.log("🚀 ~ categoryArray:", categoryArray)
        const response = await caller.category.addCategory({ data:categoryArray });
    
      res.status(200).json(response);
    } catch (error) {
      console.error("Error seeding categories:", error);
      res.status(500).json({ message: "Seeding failed!" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
