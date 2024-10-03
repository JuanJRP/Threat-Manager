import prisma from './prisma'

async function main() {
  const allrisk = await prisma.threat.findMany()
}

main()