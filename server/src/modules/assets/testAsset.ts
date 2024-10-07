import { PrismaClient } from '@prisma/client';
import { AssetService } from './assets.services'; 

const prisma = new PrismaClient();
const assetService = new AssetService();

async function testCreateAsset() {
    const assetData = {
        process: 'Proceso 2',
        name: 'Activo 1',
        description: 'Descripción del activo',
        asset_type_id: 1,
        format: 'CSV',
        software_version: '1.0',
        manufacturer: 'Fabricante X',
        physical_location: 'Ubicación Física',
        electronic_location: 'Ubicación Electrónica',
        responsible: 'Responsable',
        user_access: 'Acceso de Usuario',
        access_date: new Date(),
        state: true,
        entry_date: new Date(),
        retirement_date: new Date(),
        availability: true,
        integrity: 'Integridad',
        confidentiality: 'Confidencialidad',
    };

    try {
        const newAsset = await assetService.createAsset(assetData);
        console.log('Activo creado:', newAsset);
    } catch (error) {
        console.error('Error al crear el activo:', error);
    }
}

async function testGetAssetById() {
    const id = 1;
    try {
        const GetAssetById = await assetService.GetAssetById(id);
        console.log('Activo Listado:', GetAssetById);
    } catch (error) {
        console.error('Error al listar el activo:', error);
    }
}

async function testGetAssetByType() {
    const assetTypeId = 1;
    try {
        const GetAssetByType = await assetService.GetAssetByType(assetTypeId);
        console.log('Activo Listado por Type:', GetAssetByType);
    } catch (error) {
        console.error('Error al listado por Type:', error);
    }
}

async function UpdateAssetById() {
    const AssetById = 4;
    const data = {
        process: 'Proceso 2',
        name: 'Activo 2',
        description: 'Descripción del activo',
        asset_type_id: 1,
        format: 'CSV',
        software_version: '1.0',
        manufacturer: 'Fabricante X',
        physical_location: 'Ubicación Física',
        electronic_location: 'Ubicación Electrónica',
        responsible: 'Responsable',
        user_access: 'Acceso de Usuario',
        access_date: new Date(),
        state: true,
        entry_date: new Date(),
        availability: true,
        integrity: 'Integridad',
        confidentiality: 'Confidencialidad',
    }
    try {
        const updateAssetById = await assetService.UpdateAssetById(AssetById, data);
        console.log('Activo Update por Id:', updateAssetById);
    } catch (error) {
        console.error('Error Update por Id:', error);
    }
}

async function testDeleteAssetById() {
    const assetId = 1;
    try {
        const DeleteAssetById = await assetService.DeleteAssetById(assetId);
        console.log('Activo borrado por Id:', DeleteAssetById);
    } catch (error) {
        console.error('Error al borrar:', error);
    }
}

async function testDeleteManyAssetById() {
    const array = [5, 6];
    try {
        await assetService.DeleteManyAssetById(array);
        console.log('Activos borrados por Id correctamente');
    } catch (error) {
        console.error('Error al borrar:', error);
    }
}

async function testGetAssetByName() {
    const name = 'Activo 1';
    try {
        const GetAssetByName = await assetService.GetAssetByName(name);
        console.log('Activo Listado por Nombre:', GetAssetByName);
    } catch (error) {
        console.error('Error al listado por Nombre:', error);
    }
}

async function main() {
    //await testCreateAsset(); 
    //--------------------------------Importar CSV
    //await testGetAssetById();
    //await testGetAssetByType();
    //await UpdateAssetById();
    //await testDeleteAssetById();
    //await testDeleteManyAssetById();
    //await testGetAssetByName();
    await prisma.$disconnect();
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});
