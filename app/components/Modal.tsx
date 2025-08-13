import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { AwsImage } from "@/lib/images";
import { Dialog } from "@headlessui/react";
import SharedModal from "./SharedModal";

export default function Modal({
  images,
  onClose,
}: {
  images: AwsImage[];
  onClose?: () => void;
}) {
  let overlayRef = useRef(undefined);
  const router = useRouter();
  const searchParams = useSearchParams();
  const photoId = searchParams.get("photoId");

  let index = Number(photoId);

  const [direction, setDirection] = useState(0);
  const [curIndex, setCurIndex] = useState(index);

  function handleClose() {
    router.push("/", undefined);
    onClose();
  }

  function changePhotoId(newVal: number) {
    if (newVal > index) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurIndex(newVal);
    /*router.push(
      {
        query: { photoId: newVal },
      },
      `/p/${newVal}`,
    );*/
  }

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
