import React, { ReactNode, CSSProperties, useEffect } from "react";
import { useCss, k, a } from "kremling";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ModalContext } from "./modal-context";

export type ModalProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  show?: boolean;
  onClose?: () => void;
  allowBackdropClose?: boolean;
  onCloseAnimateComplete?: () => void;
};

const transition = {
  duration: 0.2,
  ease: "easeInOut",
};

export function Modal(props: ModalProps) {
  const {
    className,
    style,
    show,
    onClose,
    onCloseAnimateComplete,
    allowBackdropClose = true,
    children,
  } = props;
  const scope = useCss(css);

  return createPortal(
    <ModalContext.Provider value={{ onClose }}>
      <AnimatePresence onExitComplete={onCloseAnimateComplete}>
        {show && (
          <div
            {...scope}
            className={a("modal-container", className)}
            style={style}
          >
            <motion.div
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              onClick={() => {
                if (allowBackdropClose) {
                  onClose();
                }
              }}
            />
            <motion.div
              className="modal"
              transition={transition}
              initial={{ translateY: 40, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              exit={{ translateY: 40, opacity: 0 }}
            >
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>,
    document.body
  );
}

const css = k`
  @include generateThemeVariables((
    modal-backdrop-bg: (
      light: rgba($raisin-500, .5),
      dark: rgba($raisin-500, .8),
    ),
  ));
  
  .modal-container {
    position: fixed;
    top: 5.6rem;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 100rem;
  }
  
  .modal-backdrop {
    position: absolute;
    background-color: var(--modal-backdrop-bg);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }
  
  .modal {
    position: relative;
    background-color: var(--app-background);
    width: 40rem;
    min-height: 10rem;
    border-radius: $round-lg;
    z-index: 1;
    margin: 0 auto;
    transform: rotateX(40deg);
    transform-style: preserve-3d;
    box-shadow: $shadow-lg;
    max-height: calc(100vh - 12rem);
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
`;
