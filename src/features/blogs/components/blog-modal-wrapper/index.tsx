"use client";
import { useState } from "react";
import Modal from "../modal";
import { VIDEO_URL } from "../../constants/env";

interface Props {
  youtubeId: string;
}

const BlogModalWrapper = ({ youtubeId }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    if (youtubeId) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        onClick={handleOpenModal}
        className="absolute inset-0 cursor-pointer"
      ></div>

      {isModalOpen && youtubeId && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="flex w-full aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={VIDEO_URL.replace("youtubeId", youtubeId)}
              title="YouTube Video Player"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
              loading="lazy"
            ></iframe>
          </div>
        </Modal>
      )}
    </>
  );
};

export default BlogModalWrapper;
