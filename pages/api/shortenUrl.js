import prisma from "@/utils/connectDB";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { url } = req.body;
  const shortUrl = Math.random().toString(36).substring(2, 8);
  try {
    const data = await prisma.link.create({
      data: { url, shortUrl },
    });
    console.log("Data:", data);
    return res.status(200).send(data);
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send(error);
  }
}