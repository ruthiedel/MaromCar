import { NextResponse } from 'next/server';
import { connectDatabase, deleteDocument,updateDocument} from '@/services/mongo';


export async function DELETE(request: Request, { params }: any) {

    try {
        const { id } =await  params;
        const client = await connectDatabase();
        const result =  await deleteDocument(client,'cars', id);
        return NextResponse.json({ message: 'Item deleted successfully!', result });

    }
    catch {
        return NextResponse.json({ error: 'Failed to delete book' }, { status: 500 });  // Return a 500 status for server errors
    }
}


export async function PATCH(request: Request, { params }: any) {
    try {
        const { id } =await params; // Extract the id from the params
        const client = await connectDatabase();
        const body = await request.json(); // Assuming the request body contains the fields to update
        const result = await updateDocument(client, 'cars', id, body);
        return NextResponse.json({ message: 'Item updated successfully!', result });
    } catch (error) {
        console.error('Error updating item:', error);
        return NextResponse.json({ error: 'Failed to update item' }, { status: 500 }); // Return a 500 status for server errors
    }
}