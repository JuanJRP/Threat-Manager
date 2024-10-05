import prisma from './prisma';
import express from 'express';

async function main() {
  try {
    const allrisk = await prisma.threat.findMany();
    console.log(allrisk);
  } catch (error) {
    console.error('Error fetching risks:', error);
  } finally {
    await prisma.$disconnect(); // Ensure to disconnect after operations
  }
}

main();

const app = express();
const port = 3000;

app.use(express.json());

app.get('/threats', async (req, res) => {
  try {
    const allRisk = await prisma.threat.findMany();
    res.json(allRisk);
  } catch (error) {
    console.error('Error fetching risks:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Ensure to disconnect Prisma when shutting down the app
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});