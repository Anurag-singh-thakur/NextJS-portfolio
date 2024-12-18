// my-portfolio-next/app/components/ListDisplay.tsx
import React from 'react';
import { urlFor } from '@/sanityClient'; // Ensure you have this function to get image URLs

interface Project {
  _id: string;
  title: string;
  description: string;
  githubLink: string;
  liveLink: string;
  images?: { asset: { url: string } }[]; // Make images optional
}

interface ListDisplayProps {
  title: string;
  items: Project[];
}

const ListDisplay: React.FC<ListDisplayProps> = ({ title, items }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id} className="mb-4">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p>{item.description}</p>
            <div className="flex space-x-2">
              {item.images && item.images.length > 0 ? ( // Check if images exist and have length
                item.images.map((image, index) => (
                  <img
                    key={index}
                    src={urlFor(image).url()} // Use the urlFor function to get the image URL
                    alt={item.title}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                ))
              ) : (
                <p>No images available</p> // Fallback if no images
              )}
            </div>
            <div className="mt-2">
              <a href={item.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">GitHub</a>
              <a href={item.liveLink} target="_blank" rel="noopener noreferrer" className="ml-4 text-blue-500">Live Demo</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListDisplay;