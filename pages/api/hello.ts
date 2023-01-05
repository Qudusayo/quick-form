// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

type Data = {
  success: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let data = req.body;
  const previousEntries = fs.readFileSync("./json/questions.json");

  let previousEntriesPlusNewData = [...JSON.parse(previousEntries), data];

  fs.writeFileSync(
    "./json/questions.json",
    JSON.stringify(previousEntriesPlusNewData, null, 2)
  );

  res.status(200).json({ success: true });
}
