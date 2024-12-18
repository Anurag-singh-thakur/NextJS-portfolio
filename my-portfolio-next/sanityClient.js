   import {createClient}from '@sanity/client';
   import imageUrlBuilder from '@sanity/image-url';
   export const client = createClient({
     projectId: '5zy63g6k', // Replace with your actual project ID from Sanity
     dataset: 'my-portfolio', // Use the dataset name you created
     useCdn: true, // `false` if you want to ensure fresh data
     apiVersion: '2023-10-01', // Use a UTC date string
   });

   const builder = imageUrlBuilder(client);

   export const urlFor = (source) => builder.image(source);

   export default client;