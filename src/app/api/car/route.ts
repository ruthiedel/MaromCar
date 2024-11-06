import { NextResponse } from 'next/server';
import { connectDatabase, insertDocument,getAllDocuments } from '@/services/mongo';

export async function GET(request: Request) {
    try {
        // Connect to the database
        const client = await connectDatabase();

        // Retrieve all documents from the specified collection
        const documents = await getAllDocuments(client, 'cars');


        // Return a successful JSON response with the documents
        return NextResponse.json({ documents });
    } catch (error) {
        // Handle errors
        return NextResponse.json({ message: 'Failed to fetch documents' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newItem = await request.json(); 
        const client = await connectDatabase();
        
        const result = await insertDocument(client, 'cars', newItem);

        return NextResponse.json({ message: 'Item inserted successfully!', result });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to insert item'}, { status: 500 });
    }
}