"use client";

import { useState } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ImageCropDialogProps {
  open: boolean;
  src: string;
  onCropComplete: (blob: Blob) => void;
  onCancel: () => void;
}

export function ImageCropDialog({
  open,
  src,
  onCropComplete,
  onCancel,
}: ImageCropDialogProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const handleCropComplete = (
    _croppedArea: unknown,
    croppedAreaPixels: { x: number; y: number; width: number; height: number }
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    const { getCroppedImg } = await import("@/lib/crop-image");
    const blob = await getCroppedImg(src, croppedAreaPixels);
    onCropComplete(blob);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crop your avatar</DialogTitle>
        </DialogHeader>

        <div className="relative h-80 w-full rounded-lg bg-muted">
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>

        <div className="flex flex-col gap-2 px-1">
          <label className="text-sm text-muted-foreground">Zoom</label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
