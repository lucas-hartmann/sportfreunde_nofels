import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AwsImage } from "@/lib/images";
import { Dialog } from "@headlessui/react";
import SharedModal from "./SharedModal";

export default function Modal({
  images,
  index,
  onClose,
}: {
  images: AwsImage[];
  index: number;
  onClose?: () => void;
}) {
  let overlayRef = useRef(undefined);

  const [direction, setDirection] = useState(0);
  const [curIndex, setCurIndex] = useState(index);

  function handleClose() {
    onClose();
  }

  function changePhotoId(newVal: number) {
    setDirection(newVal > curIndex ? 1 : -1);
    setCurIndex(newVal);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight" && index + 1 < images.length) {
        changePhotoId(curIndex + 1);
      } else if (event.key === "ArrowLeft" && index > 0) {
        changePhotoId(curIndex - 1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [index, images.length, changePhotoId]);

  /*  useKeypress("ArrowRight", () => {
    if (index + 1 < images.length) {
      changePhotoId(index + 1);
    }
  });

  useKeypress("ArrowLeft", () => {
    if (index > 0) {
      changePhotoId(index - 1);
    }
  });*/

  return (
    <Dialog
      static
      open={true}
      onClose={handleClose}
      initialFocus={overlayRef}
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      <motion.div
        ref={overlayRef}
        key="backdrop"
        className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <SharedModal
        index={curIndex}
        direction={direction}
        images={images}
        changePhotoId={changePhotoId}
        closeModal={handleClose}
        navigation={true}
      />
    </Dialog>
  );
}
