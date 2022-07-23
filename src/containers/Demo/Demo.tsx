import React, { useState } from 'react';
import styles from './style.less';
import Like from '$src/assets/svgs/like.svg';
function Demo() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div className={styles['app-container']}>
        <p className={styles.red}>red1</p>
        <p className={styles.green}>green2</p>
        <Like className={styles.small} />
      </div>
      <span data-testid="count">{count}</span>
      <button onClick={() => setCount((prev) => prev + 1)}>increase</button>
      <button onClick={() => setCount((prev) => prev - 1)}>decrease</button>
    </div>
  );
}

export default Demo;
