import React, { useEffect, useState } from 'react';
import styles from './style.less';
import Like from '$src/assets/svgs/like.svg';
import { Button } from 'antd';
import { getApiDocList } from '$src/apis/doc';

function Demo() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getApiDocList().then(console.log);
  }, []);

  return (
    <div>
      <h1>demo</h1>
      <div className={styles['blue-background']}>
        <p className={styles.red}>red1</p>
        <p className={styles.green}>green2</p>
        <Like className={styles.small} />
      </div>
      <span data-testid="count">{count}</span>
      <Button onClick={() => setCount((prev) => prev + 1)}>increase</Button>
      <Button onClick={() => setCount((prev) => prev - 1)}>decrease</Button>
    </div>
  );
}

export default Demo;
