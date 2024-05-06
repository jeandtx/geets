import React, {useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
interface ModalProps {
  onSelectProject: (projectId: string) => void; // Ajout de cette ligne
}

const Modal: React.FC<ModalProps> = ({ onSelectProject }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const modal = useRef<HTMLDivElement>(null);

  // Fermer le modal en cliquant à l'extérieur
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!modal.current) return;
      if (
        !modalOpen ||
        modal.current.contains(target as Node) ||
        (trigger.current && trigger.current.contains(target as Node))
      )
        return;
      setModalOpen(false);
      console.log("modal is closing because of click outside");
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [modalOpen]);

  // Fermer le modal avec la touche Esc
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!modalOpen || keyCode !== 27) return;
      console.log("modal is closing because of", keyCode);
      setModalOpen(false);
    };

    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [modalOpen]);
  const handleSelectItem = (itemId:string) => {
    console.log("Selected item ID:", itemId);
    onSelectProject(itemId); // Mise à jour de l'état avec l'ID sélectionné

    setModalOpen(false); // Ferme la modal
  };

  return (
    <>
      <button
        type="button"
        ref={trigger}
        onClick={() => setModalOpen(true)}
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-white"
        style={{ height: "40px" }}
      >
        + Projet
      </button>


        <div
          className={`fixed left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-50 px-4 py-5 ${
            modalOpen ? "block" : "hidden"
          }`}
        >
          <div
            ref={modal}
            onFocus={() => setModalOpen(true)}
            // onBlur={() => setModalOpen(false)}
            className="w-full max-w-[570px] rounded-[20px] bg-white px-8 py-12 text-center dark:bg-dark-2 md:px-[70px] md:py-[60px]"
          >
            <h3 className="pb-[18px] text-xl font-semibold text-dark dark:text-white sm:text-2xl">
              Choisi ton projet !
            </h3>
            <div className="flex justify-center pb-5 ">
            <Carousel className="w-full max-w-sm">
              <CarouselContent className="-ml-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3 hover:cursor-pointer" onClick={() => handleSelectItem(index.toString())}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-2xl font-semibold">{index + 1}</span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            </div>

            
          
            <div className="-mx-3 flex flex-wrap">
              <div className="w-1/2 px-3">
                <button
                type="button"
                  onClick={() => setModalOpen(false)}
                  className="block w-full rounded-md border border-stroke p-3 text-center text-base font-medium text-dark transition hover:border-red-600 hover:bg-red-600 hover:text-white dark:text-white"
                >
                  Cancel
                </button>
              </div>
              <div className="w-1/2 px-3">
                <button type="button" className="block w-full rounded-md border border-primary bg-primary p-3 text-center text-base font-medium text-white transition hover:bg-blue-dark">
                  <a href="#/"> View Details </a>
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Modal;
