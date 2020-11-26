import React from 'react';

import classes from  './Card.module.css';

const ErrorModal = React.memo(props => {
  return (
    <React.Fragment>
      <div className={classes.backdrop} />
      <div className={classes.error_modal}>
        <h2>Alert!</h2>
        <p>{props.children}</p>
        <div className={classes.error_modal__actions}>
          <button className={classes.cardButton} type="button" onClick={props.onClose}>
            Okay
          </button>
        </div>
      </div>
    </React.Fragment>
  );
});

export default ErrorModal;
