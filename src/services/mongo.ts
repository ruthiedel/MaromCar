import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';


let client: MongoClient;
let clientPromise: Promise<MongoClient>;


export async function connectDatabase() {
   if (!client) {
       const dbConnectionString = process.env.PUBLIC_DB_CONNECTION;
       if (!dbConnectionString) {
           throw new Error('Database connection string is not defined');
       }
       client = new MongoClient(dbConnectionString);
       clientPromise = client.connect();
   }
   return clientPromise;
}



export async function insertDocument(client: any, collection: string, document: object) {
   const db = client.db('DB01');
   const result = await db.collection(collection).insertOne(document);
   return result;
}


export async function getAllDocuments(client: any, collection: string) {
   const db = client.db('DB01');
   const documents = await db.collection(collection).find().toArray();
   return documents;
}


export async function deleteDocument(client: any, collection: string, id: string) {
   const db = client.db('DB01');

  
   const trimmedId = id.trim();
   const objectId = new ObjectId(trimmedId);

   console.log(objectId)
   // Check if the document exists
   const document = await db.collection(collection).findOne({ _id: objectId });
   console.log(document)
   // if (!document) {
   //     throw new Error('Document not found');
   // }

   // Delete the document
   const result = await db.collection(collection).deleteOne({ _id: objectId });
   return result;
}



export async function updateDocument(client: any, collectionName: string, id: string,updateData:any) {
   const db = client.db('DB01'); // Use your actual database name
   
   const objectId = new ObjectId(id);
   console.log(objectId)
   
   // Perform the update operation
   const result = await db.collection(collectionName).updateOne(
       { _id: objectId }, // Filter by the document's ID
       { $set: updateData } // Use $set to update fields
   );

   return result;
}