import app from "./app";
import { connectToDB } from "./database/prisma";

const initApp = async () => {
  try {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
    await connectToDB();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

initApp();