import React from "react";

type ModalProps = {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <article className="absolute w-[100vw] h-[100vh] flex justify-center items-center bg-black opacity-90">
      <div className="bg-white dark:bg-stone-900 rounded-xl h-max w-max">
        {children}
      </div>
    </article>
  )
}

export default Modal;
