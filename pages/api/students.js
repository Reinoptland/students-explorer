import prisma from "@/prisma/client";

// api
export default async function handler(req, res) {
  //   console.log("NEW STUDENT DATA??", req.body);
  switch (req.method) {
    case "POST":
      try {
        const newStudent = await prisma.student.create({
          data: { name: req.body.name, email: req.body.email },
        });

        return res.status(200).json(newStudent);
      } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: error.message });
      }
    // case "PATCH":
    // updating studente here
    default:
      return res.status(405).json({ message: "method not supported" });
  }
}
