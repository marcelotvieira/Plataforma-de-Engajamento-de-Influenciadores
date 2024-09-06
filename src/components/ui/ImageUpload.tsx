"use client"

import React, { useState } from 'react';
import { Label } from './label';
import { Input } from './input';
import { Button } from './button';

export function ImageUpload() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <Label htmlFor="image">
        Foto
      </Label>
      <div className="flex flex-col items-center gap-4">
        <div className="w-52 h-40 bg-gray-200 flex items-center justify-center">
          <img
            src={imagePreview || '/assets/avatar-placeholder.png'}
            alt="Profile Preview"
            className="w-full h-full object-cover"
          />
        </div>
        <Input
          type="file"
          id="image"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <Button
          type="button"
          size="sm"
          className="bg-primary text-primary-foreground rounded-full px-8"
          onClick={() => document.getElementById('image')?.click()}
        >
          Selecionar
        </Button>
      </div>
    </div>
  );
}
