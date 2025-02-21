import { NextApiRequest, NextApiResponse } from "next";

interface Argument {
  text: string;
  ideology: "Left" | "Right";
  fallacy?: string;
  score: number;
}

const mockXaiAnalysis = (topic: string): Argument[] => {
  return [
    {
      text: `${topic} is a hoax designed to control us.`,
      ideology: "Right",
      fallacy: "Conspiracy Theory",
      score: 40,
    },
    {
      text: `${topic} requires urgent action to save the planet.`,
      ideology: "Left",
      score: 70,
    },
  ];
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { topic } = req.query;
    if (!topic || typeof topic !== "string") {
      return res.status(400).json({ error: "Topic is required" });
    }
    const analysis = mockXaiAnalysis(topic);
    return res.status(200).json({ arguments: analysis });
  }
  res.status(405).json({ error: "Method not allowed" });
}
