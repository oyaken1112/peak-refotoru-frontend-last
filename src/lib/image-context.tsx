'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ImageContextType = {
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
  categoryImage: string | null;
  setCategoryImage: (image: string | null) => void;
  materialImage: string | null;
  setMaterialImage: (image: string | null) => void;
  selectedArea: { x: number, y: number, width: number, height: number } | null;
  setSelectedArea: (area: { x: number, y: number, width: number, height: number } | null) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedMaterial: string | null;
  setSelectedMaterial: (material: string | null) => void;
  processedImage: string | null;
  setProcessedImage: (image: string | null) => void;
};

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export function ImageProvider({ children }: { children: ReactNode }) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [categoryImage, setCategoryImage] = useState<string | null>(null);
  const [materialImage, setMaterialImage] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<{ x: number, y: number, width: number, height: number } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  return (
    <ImageContext.Provider
      value={{
        uploadedImage,
        setUploadedImage,
        categoryImage,
        setCategoryImage,
        materialImage,
        setMaterialImage,
        selectedArea,
        setSelectedArea,
        selectedCategory,
        setSelectedCategory,
        selectedMaterial,
        setSelectedMaterial,
        processedImage,
        setProcessedImage,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}

export function useImageContext() {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error('useImageContext must be used within a ImageProvider');
  }
  return context;
}