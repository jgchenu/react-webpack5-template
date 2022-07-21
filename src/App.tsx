import React from 'react';
import styles from './style.less';
import Like from '$src/assets/svgs/like.svg';
import likeUrl from '$src/assets/svgs/like.svg?url';

function App() {
  return (
    <div className={styles['app-container']}>
      <p className={styles.red}>red1</p>
      <p className={styles.green}>green2</p>
      <Like className={styles.small} />
      <img src={likeUrl} alt="" className={styles.small} />
    </div>
  );
}

export default App;
