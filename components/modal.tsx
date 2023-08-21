import { useOn } from "@/hooks/useOn";
import classNames from "classnames";
import { HTMLAttributes, MouseEvent, MutableRefObject, useRef } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";

export const modalRootRef: MutableRefObject<HTMLDivElement | null> = {
  current: null,
};

export function ModalHeader(p: {
  title?: string;
  titleClassName?: string;
  containerClassName?: string;
  onClose?: Function;
}) {
  const { title, onClose, titleClassName, containerClassName } = p;
  return (
    <div
      className={classNames(
        "flex items-center justify-between pb-6 mb-6 text-xl font-bold border-b mt-2.5 mx-5",
        containerClassName
      )}
    >
      <span className={classNames("max-w-[70%] overflow-hidden text-ellipsis whitespace-nowrap", titleClassName)}>
        {title}
      </span>
      <FiX
        onClick={(e: Event) => {
          e.stopPropagation();
          onClose && onClose();
        }}
        className="text-2xl cursor-pointer"
      />
    </div>
  );
}

export function ModalFooter(p: {}) {
  return <div></div>;
}

export type ModalProps = {
  title?: string;
  onClose?: Function;
  outClose?: boolean;
  titleClassName?: string;
  containerClassName?: string;
  modalClassName?: string;
} & HTMLAttributes<HTMLDivElement>;

export function Modal(p: ModalProps) {
  const {
    className,
    title,
    onClose,
    outClose = false,
    titleClassName,
    containerClassName,
    modalClassName,
    children,
    ...other
  } = p;
  const ref = useRef<HTMLDivElement>(null);
  const onClickOut = useOn((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const isChild = ref.current && ref.current !== e.target && ref.current.contains(e.target as any);
    !isChild && outClose && onClose && onClose();
  });
  if (!modalRootRef.current) return null;
  return createPortal(
    <div
      {...other}
      ref={ref}
      className={classNames(
        "fixed left-0  top-0 w-full h-full overflow-auto z-50 bg-black/25 flex justify-center items-center",
        className
      )}
      onClick={onClickOut}
    >
      <div id="mo" ref={ref} className={classNames("bg-white rounded p-5 min-w-[20rem] min-h-[150] ", modalClassName)}>
        <ModalHeader
          title={title}
          containerClassName={containerClassName}
          titleClassName={titleClassName}
          onClose={onClose}
        />
        {children}
      </div>
    </div>,
    modalRootRef.current
  );
}
