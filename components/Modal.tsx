import React from "react";

type ModalProps = {
  content: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ content }) => {
  return (
    <article className="absolute left-[25%] top-[25%] w-[50%] h-[50%] flex justify-center items-center bg-black">      
      <div className="bg-white dark:bg-stone-900 rounded-xl h-max w-max">
        {content}
      </div>
    </article>
  )
}

export default Modal;
