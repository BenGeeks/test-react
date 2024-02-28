import { createPortal } from 'react-dom';

import styles from './modal.module.css';

const Modal = ({ open, close, children }) => {
  if (!open) return null;

  return createPortal(
    <>
      <div className={styles.modal_overlay} onClick={close}></div>
      <div className={styles.modal_wide}>
        <div className={styles.modal_box}>{children}</div>
      </div>
    </>,
    document.getElementById('modal')
  );
};

export default Modal;
