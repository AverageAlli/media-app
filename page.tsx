"use client";

import { useState, useEffect } from "react";
import './globals.css';

type MediaItem = {
  title: string;
  artist: string;
  year: number;
};

export default function HomePage() {
  const [mediaData, setMediaData] = useState<MediaItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setMediaData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Classic Rock Songs</h1>
      <ul className="list-disc pl-5">
        {mediaData.map((item, index) => (
          <li 
            key={index} 
            onClick={() => setSelectedMedia(item)} 
            className="cursor-pointer hover:text-blue-500 transition-colors"
          >
            {item.title}
          </li>
        ))}
      </ul>

      {selectedMedia && (
        <div className="mt-4 p-4 border rounded shadow bg-gray-50">
          <h2 className="text-2xl font-semibold">{selectedMedia.title}</h2>
          <p className="mt-1">Artist: {selectedMedia.artist}</p>
          <p>Year: {selectedMedia.year}</p>
        </div>
      )}
    </div>
  );
}