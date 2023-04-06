import prisma from "@/utils/connectDB";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { url } = req.body;

  try {
    // Check if the URL already exists in the database
    const existingRecord = await prisma.link.findFirst({
      where: {
        url: url,
      },
    });

    if (existingRecord) {
      // If the URL already exists, return the existing short URL
      console.log("Existing Record:", existingRecord);
      return res.status(200).send(existingRecord);
    } else {
      // If the URL doesn't exist, create a new short URL
      const shortUrl = Math.random().toString(36).substring(2, 8);
      const data = await prisma.link.create({
        data: { url, shortUrl },
      });
      console.log("Data:", data);
      return res.status(200).send(data);
    }
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send(error);
  }
};
