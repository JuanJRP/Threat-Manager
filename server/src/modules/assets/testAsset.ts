import { PrismaClient } from '@prisma/client';
import AssetService from './assets.services'; 

const prisma = new PrismaClient();

async function testDeleteManyAssetById() {
    const array = [5, 6];
    try {
        await AssetService.DeleteManyAssetById(array);
        console.log('Activos borrados por Id correctamente');
    } catch (error) {
        console.error('Error al borrar:', error);
    }
}

async function main() {
    //--------------------------------Importar CSV
    await testDeleteManyAssetById();
    await prisma.$disconnect();
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});
